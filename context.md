# Contexto del Proyecto

## ¿Qué es?
Plataforma web de capacitación institucional para **Clínica de Cuyo**. Los empleados se registran, ven videos instructivos (YouTube), responden evaluaciones, y al aprobar descargan un certificado PDF. Un panel de administración centraliza todos los resultados.

## Stack técnico
- **Frontend**: HTML + CSS + JavaScript vanilla
- **Backend**: Node.js + Express (servidor propio)
- **Persistencia**: Archivos JSON en `data/` (users.json, records.json)
- **Librerías CDN**: EmailJS, SheetJS (xlsx), jsPDF
- **Video**: `<video>` HTML5 con videos de Google Drive (play/pause solo, sin seeking)

## Estructura de archivos
```
capacitacion/
├── server.js          # Servidor Express + API REST
├── package.json       # Dependencias (express)
├── index.html         # Interfaz completa (7 steps)
├── styles.css         # Estilos con paleta de la clínica
├── script.js          # Toda la lógica del cliente
├── data/              # Creado al iniciar el servidor
│   ├── users.json     # Estado por legajo
│   └── records.json   # Todos los intentos
├── CHANGELOG.md
├── ROADMAP.md
└── context.md
```

## Flujo del usuario
1. **Registro** → nombre, apellido, legajo, sector
2. **Dashboard** → elige capacitación (módulo Precauciones Estándar, 3 disponibles)
3. **Video** → solo play/pause, no puede adelantar
4. **Evaluación** → 4 preguntas, 100% requerido, si falla se reordena y reinicia
5. **Éxito** → descarga certificado PDF, vuelve al dashboard
6. **Certificados** → siempre disponibles desde el dashboard

## API REST (server.js, puerto 3000)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/login` | Valida contraseña admin |
| GET | `/api/state/:legajo` | Obtiene datos + completadas del usuario |
| POST | `/api/state` | Guarda datos + completadas del usuario |
| POST | `/api/record` | Guarda un intento de evaluación |
| GET | `/api/records` | Lista todos los intentos |
| DELETE | `/api/records` | Limpia todos los intentos |

## Estado (state.js)
```js
state = {
  user: { nombre, apellido, legajo, sector },
  currentTrainingId: null,
  completedTrainings: [{ id, completedAt }],   // objeto con fecha
  currentQuestions: [],
  maxTimeViewed: 0,
  playerReady: false,
  player: null,
  seekingInterval: null,
  records: []     // solo en memoria para admin
}
```

## Configuración importante
- **Admin password**: `admin123` (hardcodeada en server.js y como constante en script.js)
- **EmailJS**: claves placeholder (`TU_PUBLIC_KEY_AQUI`, etc.) — reemplazar para envío real
- **Videos**: 3 capacitaciones reales del módulo "Precauciones Estándar" con videos en Google Drive
  - Video 01 (EPP): `1XnMG_afrfTv7CQQpVqteCNyXOPs7SOIC`
  - Video 02 (Higiene Respiratoria): `1El0wia2EmYvuqJm_ll3e8Bb2zfDHQ6yT`
  - Video 03 (Manejo de Residuos): `1BgkCEXwdpNiMs4p1TbA7pch-I2FA28sa`
  - URL de streaming: el cliente usa el proxy del servidor `GET /api/video/:fileId` (en server.js), que reenvía la petición a `https://drive.usercontent.google.com/download?id={FILE_ID}&export=download&confirm=t` con soporte de byte-range.
- **Sesión**: se guarda el legajo en `sessionStorage` (se pierde al cerrar el navegador)

## Admin
- Ingreso con contraseña `admin123`
- Dashboard con stats (totales, aprobados, tasa, empleados)
- Desglose por capacitación con barras de progreso
- Tabla detallada con exportación a Excel (.xlsx)
- Limpiar registros

## Reglas de negocio
- La evaluación requiere **100% de aciertos** para aprobar
- Si falla, las preguntas se **reordenan aleatoriamente** y se vuelve a intentar (sin repetir el video)
- Un empleado puede **re-descargar** sus certificados desde el dashboard
- Si un legajo ya existe pero el nombre ingresado no coincide, se **advierte** al usuario

## Próximas mejoras planificadas
- Agregar más módulos reales de capacitación (mismo patrón: 1 video + preguntas)
- Migrar de JSON a SQLite (evita corrupción con escrituras concurrentes)
- Servicio systemd para auto-inicio en Ubuntu
- Editor de preguntas desde admin
- EmailJS con credenciales reales
- Filtros en reportes admin
