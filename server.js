// ================================================================
// SERVIDOR EXPRESS - Plataforma de Capacitación
// Sirve archivos estáticos (HTML, CSS, JS) y expone una API REST
// para persistir datos en archivos JSON.
// ================================================================

const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const https = require('https');

const app = express();
const PORT = 3000;                          // Puerto del servidor
const DATA_DIR = path.join(__dirname, 'data'); // Carpeta donde se guardan los datos

// Crear la carpeta 'data/' si no existe
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// ================================================================
// ENCRIPTACIÓN AES-256-GCM DE LOS ARCHIVOS DE DATOS
// Los archivos de data/ se guardan cifrados y se descifran al leer.
// La clave se toma de la variable de entorno DATA_KEY, o se genera
// una única vez y se guarda en <proyecto>/.data-key (fuera de data/).
// Si se pierde la clave, los datos NO se pueden recuperar.
// ================================================================

const KEY_FILE = path.join(__dirname, '.data-key');

// Obtiene (o genera la primera vez) la clave de 32 bytes en formato hex.
function getEncryptionKey() {
  if (process.env.DATA_KEY) {
    const fromEnv = Buffer.from(process.env.DATA_KEY.trim(), 'hex');
    if (fromEnv.length === 32) return fromEnv;
    console.error('[data] ADVERTENCIA: DATA_KEY inválida, se usará el archivo .data-key');
  }
  if (fs.existsSync(KEY_FILE)) {
    return Buffer.from(fs.readFileSync(KEY_FILE, 'utf8').trim(), 'hex');
  }
  const key = crypto.randomBytes(32).toString('hex');
  fs.writeFileSync(KEY_FILE, key);
  console.log('[data] Clave de encriptación generada en ' + KEY_FILE);
  console.log('[data] IMPORTANTE: respalde este archivo. Sin la clave, los datos no se pueden recuperar.');
  return Buffer.from(key, 'hex');
}

const ENC_KEY = getEncryptionKey();

// Serializa y cifra un objeto/array a formato de sobre AES-256-GCM.
function encryptJSON(data) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', ENC_KEY, iv);
  const plain = JSON.stringify(data);
  const enc = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return JSON.stringify({
    v: 1,
    iv: iv.toString('base64'),
    tag: tag.toString('base64'),
    data: enc.toString('base64')
  });
}

// Detecta si un objeto parseado es un sobre encriptado.
function isEncryptedEnvelope(obj) {
  return obj && typeof obj === 'object' && !Array.isArray(obj) &&
    typeof obj.iv === 'string' && typeof obj.tag === 'string' && typeof obj.data === 'string';
}

// Descifra el contenido de un archivo. Si el contenido es JSON plano
// (formato legado), lo devuelve tal cual.
function decryptJSON(content) {
  const parsed = JSON.parse(content);
  if (!isEncryptedEnvelope(parsed)) {
    return parsed;
  }
  const iv = Buffer.from(parsed.iv, 'base64');
  const tag = Buffer.from(parsed.tag, 'base64');
  const data = Buffer.from(parsed.data, 'base64');
  const decipher = crypto.createDecipheriv('aes-256-gcm', ENC_KEY, iv);
  decipher.setAuthTag(tag);
  const plain = Buffer.concat([decipher.update(data), decipher.final()]);
  return JSON.parse(plain.toString('utf8'));
}

// Middleware: parsear JSON en las peticiones y servir archivos estáticos
app.use(express.json());

// Deshabilitar la caché de los archivos estáticos (HTML, CSS, JS) para que
// los cambios en el código se vean siempre al actualizar el navegador.
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});

app.use(express.static(__dirname));          // Sirve index.html, styles.css, script.js

// ================================================================
// FUNCIONES AUXILIARES DE LECTURA/ESCRITURA JSON
// ================================================================

// Lee un archivo JSON de la carpeta data/. Retorna null si no existe
// o si no se puede descifrar (archivo manipulado o clave incorrecta).
function readJSON(file) {
  const fp = path.join(DATA_DIR, file);
  if (!fs.existsSync(fp)) return null;
  try {
    return decryptJSON(fs.readFileSync(fp, 'utf8'));
  } catch (e) {
    console.error(`[data] No se pudo leer/descifrar ${file}: ${e.message}`);
    return null;
  }
}

// Escribe un objeto/array en un archivo JSON cifrado dentro de data/.
function writeJSON(file, data) {
  fs.writeFileSync(path.join(DATA_DIR, file), encryptJSON(data));
}

// Migración al arrancar: si un archivo de datos todavía está en texto
// plano (formato previo a la encriptación), lo vuelve a escribir cifrado.
['users.json', 'records.json'].forEach(file => {
  const fp = path.join(DATA_DIR, file);
  if (!fs.existsSync(fp)) return;
  try {
    const parsed = JSON.parse(fs.readFileSync(fp, 'utf8'));
    if (!isEncryptedEnvelope(parsed)) {
      writeJSON(file, parsed);
      console.log(`[data] ${file} migrado a formato encriptado (AES-256-GCM)`);
    }
  } catch (e) {
    console.error(`[data] No se pudo migrar ${file}: ${e.message}`);
  }
});

// ================================================================
// API REST
// ================================================================

// POST /api/login - Valida la contraseña del administrador
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  if (password === 'admin123') {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

// GET /api/state/:legajo - Obtiene el estado del usuario (datos personales + capacitaciones completadas)
app.get('/api/state/:legajo', (req, res) => {
  const users = readJSON('users.json') || {};         // { legajo: { user, completedTrainings }, ... }
  res.json(users[req.params.legajo] || null);         // Retorna null si el legajo no existe
});

// GET /api/video/:fileId - Proxy de streaming de videos de Google Drive.
// Reenvía la petición (con soporte de byte-range) para que el navegador lo
// reciba como mismo origen y no lo bloquee por protección cross-origin (ORB).
// Nota: se usa el módulo https con rejectUnauthorized:false porque algunos
// servidores de la red corporativa usan certificados TLS intermediarios.
app.get('/api/video/:fileId', (req, res) => {
  const fileId = req.params.fileId;
  const upHeaders = {
    'User-Agent': 'Mozilla/5.0',
    'Accept': '*/*',
    'Range': req.headers.range || 'bytes=0-'
  };
  // confirm=t evita la advertencia de escaneo de víctimas y devuelve el MP4 con byte-range
  const upstream = `https://drive.usercontent.google.com/download?id=${encodeURIComponent(fileId)}&export=download&confirm=t`;
  streamUpstream(upstream, upHeaders, 0, req, res);
});

// streamUpstream(url, headers, redirects, req, res) - Descarga desde Google
// Drive siguiendo redirecciones y transmite el MP4 al cliente.
function streamUpstream(url, headers, redirects, req, res) {
  const up = https.get(url, { rejectUnauthorized: false, headers }, (upRes) => {
    const ctype = upRes.headers['content-type'] || '';

    // Seguir redirecciones (máx. 5 saltos)
    if (upRes.statusCode >= 300 && upRes.statusCode < 400 && upRes.headers.location && redirects < 5) {
      upRes.resume();
      return streamUpstream(new URL(upRes.headers.location, url).toString(), headers, redirects + 1, req, res);
    }

    if (upRes.statusCode >= 400) {
      upRes.resume();
      return res.status(upRes.statusCode).send('No se pudo obtener el video desde Google Drive.');
    }
    if (ctype.startsWith('text/')) {
      upRes.resume();
      return res.status(502).send('Google Drive devolvió una página en lugar del video (revise el permiso "Cualquier persona con el enlace").');
    }

    res.status(upRes.statusCode);
    res.setHeader('Content-Type', ctype || 'video/mp4');
    res.setHeader('Accept-Ranges', upRes.headers['accept-ranges'] || 'bytes');
    if (upRes.headers['content-range']) res.setHeader('Content-Range', upRes.headers['content-range']);
    if (upRes.headers['content-length']) res.setHeader('Content-Length', upRes.headers['content-length']);
    res.setHeader('Cache-Control', 'private, max-age=3600');

    res.on('close', () => up.destroy());  // Si el cliente corta, se corta la descarga
    upRes.on('error', (e) => {
      console.error('[video] Error de stream:', e.message);
      res.destroy();
    });
    upRes.pipe(res);
  });

  up.on('error', (e) => {
    console.error('[video] Error en proxy de video:', e.message);
    if (!res.headersSent) res.status(502).send('Error al obtener el video desde Google Drive.');
    else res.destroy();
  });
}

// POST /api/state - Guarda o actualiza el estado de un usuario
app.post('/api/state', (req, res) => {
  const { legajo, state } = req.body;                  // state = { user, completedTrainings }
  const users = readJSON('users.json') || {};
  users[legajo] = state;
  writeJSON('users.json', users);
  res.json({ success: true });
});

// POST /api/record - Guarda un nuevo intento de capacitación (aprobado o no)
app.post('/api/record', (req, res) => {
  const records = readJSON('records.json') || [];     // Array de intentos
  records.push(req.body);
  writeJSON('records.json', records);
  res.json({ success: true });
});

// GET /api/records - Devuelve todos los intentos registrados (para el panel admin)
app.get('/api/records', (req, res) => {
  const records = readJSON('records.json') || [];
  res.json(records);
});

// DELETE /api/records - Elimina todos los registros de intentos
app.delete('/api/records', (req, res) => {
  writeJSON('records.json', []);
  res.json({ success: true });
});

// GET /api/users - Devuelve todos los usuarios (legajos) registrados
app.get('/api/users', (req, res) => {
  const users = readJSON('users.json') || {};
  const list = Object.keys(users).map(legajo => ({
    legajo,
    user: users[legajo].user || null,
    completedTrainings: users[legajo].completedTrainings || []
  }));
  res.json(list);
});

// PUT /api/users/:legajo - Modifica los datos personales de un usuario
app.put('/api/users/:legajo', (req, res) => {
  const users = readJSON('users.json') || {};
  const legajo = String(req.params.legajo);
  if (!users[legajo]) {
    return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
  }
  const { user } = req.body;
  if (!user || typeof user !== 'object') {
    return res.status(400).json({ success: false, error: 'Datos inválidos' });
  }
  users[legajo].user = {
    ...users[legajo].user,
    ...user,
    legajo: users[legajo].user.legajo || legajo
  };
  writeJSON('users.json', users);
  res.json({ success: true });
});

// DELETE /api/users/:legajo - Elimina un usuario puntual y sus intentos
app.delete('/api/users/:legajo', (req, res) => {
  const users = readJSON('users.json') || {};
  const legajo = String(req.params.legajo);
  if (!users[legajo]) {
    return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
  }
  delete users[legajo];
  writeJSON('users.json', users);
  const records = readJSON('records.json') || [];
  const filtered = records.filter(r => String(r.legajo) !== legajo);
  if (filtered.length !== records.length) {
    writeJSON('records.json', filtered);
  }
  res.json({ success: true });
});

// DELETE /api/users - Elimina todos los usuarios y todos los intentos
app.delete('/api/users', (req, res) => {
  writeJSON('users.json', {});
  writeJSON('records.json', []);
  res.json({ success: true });
});

// ================================================================
// INICIO DEL SERVIDOR
// ================================================================
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});
