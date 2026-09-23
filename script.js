// ================================================================
// CONFIGURACIÓN EMAILJS
// Claves para el envío de notificaciones por correo electrónico.
// Reemplazar con credenciales reales cuando esté disponible el servicio.
// ================================================================

const EMAILJS_PUBLIC_KEY = "TU_PUBLIC_KEY_AQUI";
const EMAILJS_SERVICE_ID = "TU_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "TU_TEMPLATE_ID";
const EMAIL_DESTINATARIO = "admin@clinicadecuyo.com";
const ADMIN_PASSWORD = "admin123";

// Inicializa EmailJS si la librería está cargada (CDN)
(function() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }
})();

// ================================================================
// SERVICIOS / SECTORES DE LA CLÍNICA
// Listado oficial de servicios para el desplegable de registro.
// Solo se pueden registrar sectores que existan en este listado,
// evitando que se generen servicios que no existen.
// ================================================================

const SECTOR_SERVICES = [
  'ATENCION CONSULTORIOS',
  'DIAGNOSTICO POR IMÁGENES',
  'ADMINISTRACION',
  'COMPRAS',
  'GERENCIA',
  'DIRECCION',
  'ASESORIA LEGAL',
  'HIGIENE Y SEGURIDAD - MEDICINA LABORAL',
  'RECURSOS HUMANOS',
  'ENFERMERIA',
  'MEDICINA INTERNA',
  'INFECTOLOGIA',
  'MEDICINA AREAS CRITICAS NEO',
  'LABORATORIO',
  'QUIRÓFANOS',
  'AUDITORIA DE DEBITOS',
  'COMITÉ CALIDAD Y SEGURIDAD',
  'DIRECCION MEDICA',
  'MEDICINA AREAS CRITICAS',
  'COMUNICACIÓN',
  'PROCESOS',
  'SISTEMAS',
  'BIOINGIENERIA',
  'ARQUITECTURA Y OBRAS',
  'AUDITORIA DE FARMACIA',
  'FACTURACION',
  'ADMISION',
  'BUFFET',
  'GUARDIA MEDICA',
  'ESTERILIZACION',
  'FARMACIA',
  'HOUSEKEEPING',
  'MANTENIMIENTO',
  'NUTRICION',
  'CONTAC CENTER'
];

// Llena el desplegable de sectores con el listado oficial de servicios.
const sectorSelect = document.getElementById('sector');
if (sectorSelect) {
  sectorSelect.innerHTML = '<option value="" selected disabled>Seleccione un servicio...</option>' +
    SECTOR_SERVICES.map(s => `<option value="${s}">${s}</option>`).join('');
}

// ================================================================
// CONFIGURACIÓN DE CAPACITACIONES
// Módulo real "Precauciones Estándar": 3 capacitaciones (una por video).
// Cada una tiene: id, title, desc, icon, fileId (Google Drive) y
// questions (4 preguntas reales por video con opciones y respuesta correcta).
// ================================================================

const DRIVE_VIDEO_URL = fileId =>
  `/api/video/${fileId}`;

const TRAININGS = [
  {
    id: 1,
    title: 'Precauciones Estándar - EPP',
    desc: 'Infecciones asociadas al cuidado de la salud y uso correcto del equipo de protección personal',
    icon: '🛡️',
    fileId: '1XnMG_afrfTv7CQQpVqteCNyXOPs7SOIC',
    questions: [
      {
        text: '¿Qué se considera una infección asociada al cuidado de la salud?',
        options: [
          { label: 'Cualquier infección que tenga el paciente', value: 'a' },
          { label: 'La que aparece después de 48 horas de atención y no estaba presente ni incubándose al ingreso', value: 'b' },
          { label: 'Solo las que aparecen luego del alta', value: 'c' }
        ],
        correct: 'b'
      },
      {
        text: 'Respecto al uso de guantes, ¿cuál afirmación es correcta?',
        options: [
          { label: 'Reemplazan la higiene de manos', value: 'a' },
          { label: 'Nunca reemplazan la higiene de manos y no se recomienda el doble guante', value: 'b' },
          { label: 'Siempre deben usarse dobles para mayor protección', value: 'c' }
        ],
        correct: 'b'
      },
      {
        text: '¿Cómo debe colocarse correctamente el blusón/camisolón?',
        options: [
          { label: 'Suelto, sin atar', value: 'a' },
          { label: 'Atado en cuello y cintura, cubriendo brazos y frente del cuerpo', value: 'b' },
          { label: 'Cubriendo solo la espalda', value: 'c' }
        ],
        correct: 'b'
      },
      {
        text: 'En la secuencia de RETIRO del equipo de protección personal, ¿qué se retira primero?',
        options: [
          { label: 'El barbijo', value: 'a' },
          { label: 'Los guantes', value: 'b' },
          { label: 'Las antiparras', value: 'c' }
        ],
        correct: 'b'
      }
    ]
  },
  {
    id: 2,
    title: 'Higiene Respiratoria',
    desc: 'Etiqueta al toser, distancia de seguridad y uso del barbijo quirúrgico',
    icon: '😷',
    fileId: '1El0wia2EmYvuqJm_ll3e8Bb2zfDHQ6yT',
    questions: [
      {
        text: '¿Qué es la higiene respiratoria?',
        options: [
          { label: 'Lavarse los dientes con frecuencia', value: 'a' },
          { label: 'La "etiqueta al toser": medidas para disminuir la transmisión de microorganismos por secreciones respiratorias', value: 'b' },
          { label: 'Usar barbijo solo cuando hay diagnóstico confirmado', value: 'c' }
        ],
        correct: 'b'
      },
      {
        text: '¿Qué distancia mínima se recomienda mantener con una persona con síntomas respiratorios, siempre que sea posible?',
        options: [
          { label: '30 centímetros', value: 'a' },
          { label: '1 metro', value: 'b' },
          { label: '5 metros', value: 'c' }
        ],
        correct: 'b'
      },
      {
        text: '¿A quiénes se aplican las medidas de higiene respiratoria?',
        options: [
          { label: 'Solo a pacientes con diagnóstico confirmado', value: 'a' },
          { label: 'A toda persona con síntomas respiratorios, tenga o no diagnóstico confirmado', value: 'b' },
          { label: 'Únicamente al personal de salud', value: 'c' }
        ],
        correct: 'b'
      },
      {
        text: '¿Cuándo debe cambiarse un barbijo quirúrgico descartable?',
        options: [
          { label: 'Recién al final de la semana', value: 'a' },
          { label: 'Si está húmedo, dañado o visiblemente sucio', value: 'b' },
          { label: 'Solo si el paciente lo solicita', value: 'c' }
        ],
        correct: 'b'
      }
    ]
  },
  {
    id: 3,
    title: 'Manejo de Residuos',
    desc: 'Clasificación, segregación y descarte seguro de residuos hospitalarios',
    icon: '🗑️',
    fileId: '1BgkCEXwdpNiMs4p1TbA7pch-I2FA28sa',
    questions: [
      {
        text: 'Según la OMS, ¿qué porcentaje de los residuos generados en salud son comunes (no peligrosos)?',
        options: [
          { label: '50%', value: 'a' },
          { label: '85%', value: 'b' },
          { label: '15%', value: 'c' }
        ],
        correct: 'b'
      },
      {
        text: '¿Dónde y por quién debe realizarse la segregación de residuos?',
        options: [
          { label: 'En un área centralizada, por personal de limpieza', value: 'a' },
          { label: 'En el lugar donde se genera el residuo, por la misma persona que lo produce', value: 'b' },
          { label: 'Al final del turno, reclasificando lo que haga falta', value: 'c' }
        ],
        correct: 'b'
      },
      {
        text: '¿Dónde se descartan residuos comunes como papeles, bandejas descartables o envoltorios?',
        options: [
          { label: 'Bolsa roja', value: 'a' },
          { label: 'Bolsa negra dentro de un recipiente rígido', value: 'b' },
          { label: 'Descartador rígido para punzocortantes', value: 'c' }
        ],
        correct: 'b'
      },
      {
        text: '¿Cuál de estas prácticas se debe EVITAR con elementos punzocortantes?',
        options: [
          { label: 'Descartarlos inmediatamente después de su uso', value: 'a' },
          { label: 'Reencapuchar la aguja después de usarla', value: 'b' },
          { label: 'Usar el descartador rígido más cercano al procedimiento', value: 'c' }
        ],
        correct: 'b'
      }
    ]
  }
];

// ================================================================
// ESTADO DE LA APLICACIÓN
// Objeto global que mantiene los datos en memoria durante la sesión.
// Se sincroniza con el servidor mediante las funciones loadState/saveState.
// ================================================================

let state = {
  user: { nombre: '', apellido: '', legajo: '', sector: '' },  // Datos del empleado logueado
  currentTrainingId: null,      // ID de la capacitación que está cursando ahora
  completedTrainings: [],       // Array de objetos { id, completedAt } por cada capacitación aprobada
  currentQuestions: [],         // Preguntas mezcladas de la evaluación actual
  maxTimeViewed: 0,             // Tiempo máximo continuo visto del video (para evitar saltos)
  playerReady: false,           // Indica si el reproductor de video ya está listo
  player: null,                 // Instancia del elemento <video> (Google Drive)
  seekingInterval: null,        // Interval ID del watchdog anti-seeking
  records: [],                  // Datos de intentos para el panel admin (se carga bajo demanda)
  users: [],                    // Lista de usuarios/legajos para el panel admin (se carga bajo demanda)
  usersPage: 1,                 // Página actual de la tabla de usuarios
  usersSearch: ''               // Texto del buscador de usuarios
};
// ================================================================
// PERSISTENCIA - COMUNICACIÓN CON EL SERVIDOR
// ================================================================

// loadState(legajo) - Obtiene desde el servidor los datos + completadas de un usuario.
// Si el servidor devuelve completadas en formato viejo (solo números), las convierte.
async function loadState(legajo) {
  if (!legajo) return;
  try {
    const res = await fetch(`/api/state/${encodeURIComponent(legajo)}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.user) {
        state.user = data.user;
        state.completedTrainings = (data.completedTrainings || []).map(c => typeof c === 'number' ? { id: c, completedAt: null } : c);
      }
    }
  } catch (e) {
    console.error('Error cargando estado:', e);
  }
}

// saveState() - Envía al servidor el estado actual (user + completedTrainings).
async function saveState() {
  if (!state.user || !state.user.legajo) return;
  try {
    await fetch('/api/state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ legajo: state.user.legajo, state: { user: state.user, completedTrainings: state.completedTrainings } })
    });
  } catch (e) {
    console.error('Error guardando estado:', e);
  }
}

// ================================================================
// REFERENCIAS A ELEMENTOS DEL DOM
// Se obtienen una vez al inicio para no estar consultando el DOM continuamente.
// ================================================================

const userForm = document.getElementById('user-form');
const quizForm = document.getElementById('quiz-form');
const dashboardGrid = document.getElementById('dashboard-grid');
const questionsContainer = document.getElementById('questions-container');
const quizFeedback = document.getElementById('quiz-feedback');
const userInfoBar = document.getElementById('user-info-bar');
const videoTitle = document.getElementById('video-title');
const playerContainer = document.getElementById('player-container');
const playOverlay = document.getElementById('play-overlay');
const playBtnBig = document.getElementById('play-btn-big');
const customControls = document.getElementById('custom-controls');
const ctrlPlay = document.getElementById('ctrl-play');
const ctrlTime = document.getElementById('ctrl-time');
const btnBackDashVideo = document.getElementById('btn-back-dash-video');
const btnBackDashQuiz = document.getElementById('btn-back-dash-quiz');
const btnDashboardAfterSuccess = document.getElementById('btn-dashboard-after-success');
const btnResetAll = document.getElementById('btn-reset-all');
const successMessage = document.getElementById('success-message');

// ================================================================
// NAVEGACIÓN ENTRE PANTALLAS
// ================================================================

// showSection(id) - Muestra la sección cuyo id se pasa y oculta las demás.
// El CSS controla la visibilidad con la clase .active.
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('active');
}

// ================================================================
// REGISTRO DE USUARIO (Paso 1)
// ================================================================

// prefillForm() - Precarga los campos del formulario con los datos del usuario
// cuando vuelve a la pantalla de registro (ej. al editar legajo).
function prefillForm() {
  if (state.user.nombre) {
    document.getElementById('nombre').value = state.user.nombre;
    document.getElementById('apellido').value = state.user.apellido;
    document.getElementById('legajo').value = state.user.legajo;
    const svc = state.user.sector || '';
    // Si el sector guardado no está en el listado oficial (datos previos),
    // se agrega como opción para que pueda verse al editar.
    if (svc && !SECTOR_SERVICES.includes(svc) && !sectorSelect.querySelector('option[value="' + svc + '"]')) {
      sectorSelect.insertAdjacentHTML('beforeend', `<option value="${svc}">${svc}</option>`);
    }
    sectorSelect.value = svc;
  }
}

// El campo de legajo solo admite números: se eliminan caracteres no numéricos al escribir.
const legajoInput = document.getElementById('legajo');
if (legajoInput) {
  legajoInput.addEventListener('input', () => {
    legajoInput.value = legajoInput.value.replace(/\D/g, '');
  });
}

// submit del formulario de registro.
// Primero consulta al servidor si el legajo ya existe:
//   - Si existe y los nombres coinciden -> carga sus datos.
//   - Si existe pero el nombre es diferente -> advierte con confirm() y carga los datos correctos.
//   - Si no existe -> muestra un modal de confirmación para corroborar los datos
//     antes de crear el usuario nuevo en la base.
userForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const newLegajo = document.getElementById('legajo').value.trim();
  if (!/^\d+$/.test(newLegajo)) {
    alert('El legajo debe contener solo números.');
    return;
  }
  const newNombre = document.getElementById('nombre').value.trim();
  const newApellido = document.getElementById('apellido').value.trim();
  const newSector = document.getElementById('sector').value.trim();
  const serverState = await fetch(`/api/state/${encodeURIComponent(newLegajo)}`).then(r => r.ok ? r.json() : null).catch(() => null);
  if (serverState && serverState.user) {
    const sv = serverState.user;
    // Si el nombre/apellido no coinciden, BLOQUEA el ingreso: no permite continuar hasta corregir
    if (sv.nombre !== newNombre || sv.apellido !== newApellido) {
      alert(`El legajo ${newLegajo} ya está registrado con:\n\n  Nombre: "${sv.nombre} ${sv.apellido}"\n  Sector: "${sv.sector || '-'}"\n\nUsted ingresó:\n  "${newNombre} ${newApellido}"\n\nCorrija el nombre y apellido con los datos registrados para continuar.`);
      return;  // Bloqueado: vuelve al formulario para corregir
    }
    state.user = sv;
    state.completedTrainings = (serverState.completedTrainings || []).map(c => typeof c === 'number' ? { id: c, completedAt: null } : c);
    finishRegistration();
  } else {
    // Nuevo usuario: pedir confirmación de los datos antes de crear el registro
    showConfirmNewUser({ newLegajo, newNombre, newApellido, newSector });
  }
});

// finishRegistration() - Completa el registro: guarda el legajo en la sesión,
// persiste el estado en el servidor y muestra el dashboard.
async function finishRegistration() {
  sessionStorage.setItem('capacitacion_legajo', state.user.legajo);  // Persiste el legajo en la sesión
  await saveState();
  renderDashboard();
  showSection('step-dashboard');
}

// ================================================================
// MODAL DE CONFIRMACIÓN DE NUEVO LEGAJO
// Muestra los datos ingresados para que el usuario los corrobore
// antes de crear el registro en la base. Método de control.
// ================================================================

let pendingNewUser = null;  // Datos del nuevo usuario pendientes de confirmar

const modalConfirm = document.getElementById('modal-confirm');
const confirmData = document.getElementById('confirm-data');
const btnModalCancel = document.getElementById('modal-cancel');
const btnModalAccept = document.getElementById('modal-accept');

// showConfirmNewUser(data) - Abre el modal con los datos ingresados y espera confirmación.
function showConfirmNewUser(data) {
  pendingNewUser = data;
  document.getElementById('confirm-legajo').textContent = data.newLegajo;
  confirmData.innerHTML = `
    <div class="confirm-row"><span>Nombre:</span><strong>${data.newNombre}</strong></div>
    <div class="confirm-row"><span>Apellido:</span><strong>${data.newApellido}</strong></div>
    <div class="confirm-row"><span>Legajo:</span><strong>${data.newLegajo}</strong></div>
    <div class="confirm-row"><span>Sector / Área:</span><strong>${data.newSector || '-'}</strong></div>
  `;
  modalConfirm.style.display = 'flex';
}

// hideConfirmNewUser() - Cierra el modal sin crear el usuario.
function hideConfirmNewUser() {
  modalConfirm.style.display = 'none';
  pendingNewUser = null;
}

// Botón "Cancelar": cierra el modal y vuelve al formulario para corregir.
btnModalCancel.addEventListener('click', hideConfirmNewUser);

// Botón "Aceptar": crea el usuario nuevo con los datos corroborados.
btnModalAccept.addEventListener('click', () => {
  if (!pendingNewUser) return;
  const { newLegajo, newNombre, newApellido, newSector } = pendingNewUser;
  state.user.nombre = newNombre;
  state.user.apellido = newApellido;
  state.user.legajo = newLegajo;
  state.user.sector = newSector;
  state.completedTrainings = [];
  hideConfirmNewUser();
  finishRegistration();
});

// ================================================================
// DASHBOARD (Paso 2)
// Muestra las tarjetas de capacitación con su estado (pendiente/completado).
// ================================================================

function renderDashboard() {
  // Barra superior con datos del usuario
  const allCompleted = TRAININGS.every(t => state.completedTrainings.some(c => c.id === t.id));
  userInfoBar.innerHTML = `
    <span class="user-data">
      <span class="user-name">${state.user.nombre} ${state.user.apellido}</span>
      <span class="user-legajo-wrapper">
        Legajo: <strong class="user-legajo">${state.user.legajo}</strong>
        ${state.user.sector ? `| Sector: <strong>${state.user.sector}</strong>` : ''}
      </span>
      <button id="btn-logout" class="btn-logout" title="Cerrar sesión">Cerrar sesión</button>
      ${allCompleted ? '<button id="btn-reset-all-bar" class="btn-logout" title="Reiniciar el progreso de todos los cursos">Reiniciar</button>' : ''}
    </span>
  `;

  const resetBarBtn = document.getElementById('btn-reset-all-bar');
  if (resetBarBtn) {
    resetBarBtn.addEventListener('click', async () => {
      state.completedTrainings = [];
      await saveState();
      renderDashboard();
    });
  }

  dashboardGrid.innerHTML = '';
  TRAININGS.forEach(t => {
    const done = state.completedTrainings.some(c => c.id === t.id);
    const card = document.createElement('div');
    card.className = 'dashboard-card';
    card.innerHTML = `
      <div class="card-icon">${t.icon}</div>
      <h3>${t.title}</h3>
      <p>${t.desc}</p>
      <span class="card-badge ${done ? 'badge-completed' : 'badge-pending'}">
        ${done ? '✓ Completado' : 'Pendiente'}
      </span>
      ${done ? '<button class="btn-download-cert-dash" data-id="' + t.id + '">⬇ Certificado</button>' : ''}
    `;
    card.addEventListener('click', () => startTraining(t.id));
    dashboardGrid.appendChild(card);
  });

  // Asigna los eventos a los botones de descarga de certificado en cada tarjeta completada
  document.querySelectorAll('.btn-download-cert-dash').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      const comp = state.completedTrainings.find(c => c.id === id);
      btn.textContent = '⏳';
      await downloadCertificate(id, comp ? comp.completedAt : null);
      btn.textContent = '⬇ Certificado';
    });
  });
}

// startTraining(id) - Inicia el flujo de una capacitación: muestra el video.
function startTraining(id) {
  state.currentTrainingId = id;
  state.maxTimeViewed = 0;
  const training = TRAININGS.find(t => t.id === id);
  if (!training) return;
  videoTitle.textContent = training.title;
  showSection('step-video');
  initPlayer(training.fileId);
}

// ================================================================
// REPRODUCTOR DE VIDEO (Paso 3)
// Reproduce videos de Google Drive con el elemento nativo <video>.
// Controles personalizados: solo play/pause, sin barra de búsqueda.
// ================================================================

// initPlayer(fileId) - Crea el elemento <video> apuntando al MP4 en Drive.
function initPlayer(fileId) {
  playerContainer.innerHTML = '';
  playOverlay.classList.remove('hidden');
  customControls.classList.remove('show');
  ctrlPlay.textContent = '▶';
  ctrlTime.textContent = '0:00 / 0:00';
  state.playerReady = false;
  state.maxTimeViewed = 0;

  const video = document.createElement('video');
  video.id = 'cap-video';
  video.src = DRIVE_VIDEO_URL(fileId);
  video.preload = 'metadata';
  video.playsInline = true;
  video.setAttribute('playsinline', '');
  video.setAttribute('controlslist', 'nodownload noremoteplayback');
  video.disablePictureInPicture = true;
  video.controls = false;

  // Bloquea el menú contextual del video (evita acceder a los controles nativos)
  video.addEventListener('contextmenu', e => e.preventDefault());

  // Eventos del reproductor nativo
  video.addEventListener('loadedmetadata', onVideoReady);
  video.addEventListener('play', onVideoPlay);
  video.addEventListener('pause', onVideoPause);
  video.addEventListener('ended', onVideoEnded);
  video.addEventListener('timeupdate', updateTimeDisplay);
  video.addEventListener('error', () => {
    console.error('Error al cargar el video:', video.error);
    state.playerReady = false;
  });

  state.player = video;
  playerContainer.appendChild(video);
}

// onVideoReady() - Se ejecuta cuando se cargó la metadata (duración disponible).
function onVideoReady() {
  state.playerReady = true;
  updateTimeDisplay();
}

// onVideoPlay() - Al empezar a reproducir actualiza los controles y activa el watchdog.
function onVideoPlay() {
  ctrlPlay.textContent = '⏸';
  playOverlay.classList.add('hidden');
  customControls.classList.add('show');
  startSeekingWatch();        // Activa el watchdog anti-seeking
}

// onVideoPause() - Al pausar detiene el watchdog anti-seeking.
function onVideoPause() {
  ctrlPlay.textContent = '▶';
  stopSeekingWatch();
}

// onVideoEnded() - Al terminar el video pasa a la evaluación.
function onVideoEnded() {
  ctrlPlay.textContent = '▶';
  stopSeekingWatch();
  alert('Ha completado la visualización del video. A continuación realice la evaluación.');
  loadQuiz(state.currentTrainingId);
  showSection('step-quiz');
}

// destroyPlayer() - Detiene y elimina el reproductor actual (video nativo o YouTube).
function destroyPlayer() {
  stopSeekingWatch();
  if (state.player) {
    try {
      if (typeof state.player.destroy === 'function') {
        state.player.destroy();
      } else if (typeof state.player.pause === 'function') {
        state.player.pause();
        state.player.removeAttribute('src');
        state.player.load();
      }
    } catch (e) {}
    state.player = null;
  }
  state.playerReady = false;
}

// startSeekingWatch() - Inicia un intervalo que cada 250ms verifica que el usuario
// no esté adelantando el video. Si detecta un salto > 1.5s, lo devuelve al punto máximo visto.
function startSeekingWatch() {
  stopSeekingWatch();
  state.seekingInterval = setInterval(() => {
    if (!state.player || !state.playerReady) return;
    try {
      const currentTime = state.player.currentTime;
      if (currentTime > state.maxTimeViewed + 1.5) {
        state.player.currentTime = state.maxTimeViewed;  // Rebobina al punto válido
      } else {
        state.maxTimeViewed = Math.max(currentTime, state.maxTimeViewed);
      }
      updateTimeDisplay();
    } catch (e) {}
  }, 250);
}

function stopSeekingWatch() {
  if (state.seekingInterval) {
    clearInterval(state.seekingInterval);
    state.seekingInterval = null;
  }
}

// Actualiza el display de tiempo transcurrido / duración total.
function updateTimeDisplay() {
  if (!state.player || !state.playerReady) return;
  try {
    const current = state.player.currentTime || 0;
    const total = state.player.duration || 0;
    ctrlTime.textContent = `${formatTime(current)} / ${formatTime(total)}`;
  } catch (e) {}
}

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

// ================================================================
// CONTROLES DE VIDEO (Play / Pause)
// ================================================================

// togglePlay() - Alterna entre reproducir y pausar el video.
function togglePlay() {
  if (!state.player) return;
  try {
    if (state.player.error) {
      alert('No se pudo cargar el video. Verifique la conexión con el servidor e intente nuevamente.');
      return;
    }
    if (state.player.paused) {
      state.player.play().catch(() => {
        alert('No se pudo reproducir el video. Verifique la conexión con internet e intente nuevamente.');
      });
    } else {
      state.player.pause();
    }
  } catch (e) {}
}

// Eventos: click en overlay, botón grande, o botón de la barra de control.
playOverlay.addEventListener('click', togglePlay);
playBtnBig.addEventListener('click', (e) => { e.stopPropagation(); togglePlay(); });
ctrlPlay.addEventListener('click', togglePlay);

// ================================================================
// CUESTIONARIO (Paso 4)
// Evaluación multiple choice: 3 preguntas, se requiere 100% para aprobar.
// ================================================================

// loadQuiz(trainingId) - Prepara las preguntas de la capacitación en orden aleatorio.
function loadQuiz(trainingId) {
  const training = TRAININGS.find(t => t.id === trainingId);
  if (!training) return;

  state.currentQuestions = shuffleArray([...training.questions]);
  renderQuestions();
}

// shuffleArray(arr) - Algoritmo Fisher-Yates para mezclar aleatoriamente un array.
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// renderQuestions() - Dibuja las tarjetas de preguntas con sus opciones mezcladas.
function renderQuestions() {
  quizForm.reset();
  quizFeedback.innerHTML = '';
  questionsContainer.innerHTML = '';

  state.currentQuestions.forEach((q, idx) => {
    const shuffledOptions = shuffleArray([...q.options]);  // Opciones en orden aleatorio
    const card = document.createElement('div');
    card.className = 'question-card';
    card.innerHTML = `
      <p class="question-title">${idx + 1}. ${q.text}</p>
      <div class="options">
        ${shuffledOptions.map(o => `
          <label>
            <input type="radio" name="q${idx}" value="${o.value}" required>
            ${o.label}
          </label>
        `).join('')}
      </div>
    `;
    questionsContainer.appendChild(card);
  });
}

// submit del formulario de evaluación - Calcula la nota.
// Si es 100% -> envía email y completa la capacitación.
// Si falla -> registra el intento, muestra feedback y reinicia el quiz con preguntas reordenadas.
quizForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(quizForm);
  let correctCount = 0;
  const total = state.currentQuestions.length;

  state.currentQuestions.forEach((q, idx) => {
    const answer = formData.get(`q${idx}`);
    if (answer === q.correct) {
      correctCount++;
    }
  });

  const grade = Math.round((correctCount / total) * 100);

  if (grade === 100) {
    sendEmailReport(grade);
  } else {
    showFailure(grade);
  }
});

// ================================================================
// EMAIL / RESULTADOS
// ================================================================

// sendEmailReport(grade) - Envía un correo notificando la aprobación.
// Si EmailJS no está configurado (claves placeholder), simula el envío.
function sendEmailReport(grade) {
  quizFeedback.innerHTML = `
    <div class="alert" style="background:#e2e3e5;color:#383d41;">
      Procesando y enviando reporte a administración...
    </div>
  `;

  const training = TRAININGS.find(t => t.id === state.currentTrainingId);

  const templateParams = {
    to_email: EMAIL_DESTINATARIO,
    nombre: state.user.nombre,
    apellido: state.user.apellido,
    legajo: state.user.legajo,
    capacitacion: training ? training.title : 'N/A',
    nota: `${grade}%`,
    fecha: new Date().toLocaleString('es-AR')
  };

  if (EMAILJS_PUBLIC_KEY === "TU_PUBLIC_KEY_AQUI") {
    console.log('EmailJS no configurado. Simulando envío...', templateParams);
    setTimeout(() => {
      completeTraining();
    }, 1000);
    return;
  }

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(() => {
      completeTraining();
    })
    .catch((error) => {
      console.error('Error al enviar mail:', error);
      alert('Error al enviar el correo. Verifique la conexión e intente nuevamente.');
    });
}

// saveRecord(aprobado) - Guarda un intento de evaluación en el servidor.
// Se llama tanto al aprobar (true) como al fallar (false).
async function saveRecord(aprobado) {
  const training = TRAININGS.find(t => t.id === state.currentTrainingId);
  const record = {
    nombre: state.user.nombre,
    apellido: state.user.apellido,
    legajo: state.user.legajo,
    sector: state.user.sector || '',
    capacitacion: training ? training.title : 'N/A',
    aprobado: aprobado,
    fecha: new Date().toLocaleString('es-AR')
  };
  try {
    await fetch('/api/record', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record)
    });
  } catch (e) {
    console.error('Error guardando registro:', e);
  }
}

// completeTraining() - Marca la capacitación como completada en el estado local y en el servidor.
async function completeTraining() {
  const alreadyDone = state.currentTrainingId && state.completedTrainings.some(c => c.id === state.currentTrainingId);
  if (!alreadyDone) {
    await saveRecord(true);
    state.completedTrainings.push({ id: state.currentTrainingId, completedAt: new Date().toISOString() });
    await saveState();
  }
  const training = TRAININGS.find(t => t.id === state.currentTrainingId);
  successMessage.textContent = alreadyDone
    ? `Ya tenías aprobada "${training ? training.title : 'la capacitación'}". Podés volver a descargar tu certificado desde el dashboard.`
    : `Ha aprobado "${training ? training.title : 'la capacitación'}". Los datos se han enviado a la administración.`;
  showSection('step-success');
}

// showFailure(grade) - Muestra mensaje de error y reinicia el quiz con preguntas reordenadas.
function showFailure(grade) {
  const alreadyDone = state.currentTrainingId && state.completedTrainings.some(c => c.id === state.currentTrainingId);
  if (!alreadyDone) saveRecord(false);
  quizFeedback.innerHTML = `
    <div class="alert alert-error">
      <p><strong>Evaluación No Aprobada (${grade}%)</strong></p>
      <p>Debe obtener el 100% de respuestas correctas.</p>
      
    </div>
  `;
  setTimeout(() => {
    loadQuiz(state.currentTrainingId);  // Nuevo orden, mismo video visto
  }, 3000);
}

// ================================================================
// BOTONES DE NAVEGACIÓN
// ================================================================

// goToDashboard() - Destruye el reproductor y vuelve al dashboard.
function goToDashboard() {
  destroyPlayer();
  state.currentTrainingId = null;
  showSection('step-dashboard');
  renderDashboard();
}

btnBackDashVideo.addEventListener('click', goToDashboard);
btnBackDashQuiz.addEventListener('click', goToDashboard);
btnDashboardAfterSuccess.addEventListener('click', goToDashboard);

// Botón de descarga de certificado en la pantalla de éxito (Paso 5)
document.getElementById('btn-download-cert').addEventListener('click', async (e) => {
  e.target.textContent = '⬇ Generando PDF...';
  await downloadCertificate();
  e.target.textContent = '⬇ Descargar Certificado PDF';
});

// ================================================================
// GENERACIÓN DE CERTIFICADO PDF
// Utiliza la librería jsPDF para crear un certificado en formato apaisado (landscape A4).
// ================================================================

// loadImage(src) - Carga una imagen en el navegador y retorna un HTMLImageElement.
// Útil para insertar imágenes en el PDF mediante addImage.
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// downloadCertificate(trainingId, completedAt) - Genera y descarga el PDF.
// Si se pasa completedAt, usa esa fecha; si no, usa la fecha actual.
async function downloadCertificate(trainingId, completedAt) {
  const training = TRAININGS.find(t => t.id === (trainingId || state.currentTrainingId));
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();

  // Colores institucionales
  const blue = [0, 51, 160];
  const green = [122, 154, 1];

  // Barras decorativas superior e inferior
  doc.setFillColor(...blue);
  doc.rect(0, 0, pageW, 12, 'F');
  doc.setFillColor(...green);
  doc.rect(0, pageH - 8, pageW, 8, 'F');

  // Logo institucional en el banner superior izquierdo (no afecta el centrado del texto)
  try {
    const logoImg = await loadImage('img/LOGO Clinica de Cuyo_2.png');
    const logoW = 50;
    const logoH = logoImg.naturalHeight * (logoW / logoImg.naturalWidth);
    doc.addImage(logoImg, 'PNG', 10, 2, logoW, logoH);
  } catch (e) {
    console.warn('Logo no disponible para el PDF:', e);
  }

  // Encabezado
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...blue);
  doc.text('CLÍNICA DE CUYO', pageW / 2, 28, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13);
  doc.setTextColor(80, 80, 80);
  doc.text('SISTEMA DE CAPACITACIÓN INSTITUCIONAL', pageW / 2, 36, { align: 'center' });

  // Línea separadora
  doc.setDrawColor(...green);
  doc.setLineWidth(0.5);
  doc.line(40, 44, pageW - 40, 44);

  // Título del certificado
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(...blue);
  doc.text('CERTIFICADO DE CAPACITACIÓN', pageW / 2, 62, { align: 'center' });

  // Cuerpo
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);
  doc.setTextColor(50, 50, 50);
  doc.text('SE CERTIFICA QUE', pageW / 2, 80, { align: 'center' });

  // Nombre completo del empleado (destacado en verde)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(...green);
  const fullName = `${state.user.nombre.toUpperCase()} ${state.user.apellido.toUpperCase()}`;
  doc.text(fullName, pageW / 2, 98, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);
  doc.setTextColor(50, 50, 50);
  const courseText = `HA COMPLETADO SATISFACTORIAMENTE LA CAPACITACIÓN:`;
  doc.text(courseText, pageW / 2, 114, { align: 'center' });

  // Título del curso
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(...blue);
  doc.text((training ? training.title : 'CAPACITACIÓN').toUpperCase(), pageW / 2, 130, { align: 'center' });

  const dateObj = completedAt ? new Date(completedAt) : new Date();
  const dateStr = dateObj.toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(80, 80, 80);
  doc.text(`EXPEDIDO EL ${dateStr.toUpperCase()}`, pageW / 2, 154, { align: 'center' });

  // Pie de página
  doc.setFontSize(10);
  doc.setTextColor(120, 120, 120);
  doc.text('Documento emitido electrónicamente por el Sistema de Capacitación.', pageW / 2, pageH - 16, { align: 'center' });

  // Genera el nombre del archivo y lo descarga
  doc.save(`certificado_${state.user.nombre}_${state.user.apellido}_${training ? training.title.replace(/\s+/g, '_') : 'capacitacion'}.pdf`.toLowerCase());
}

// ================================================================
// SESIÓN - CIERRE DE SESIÓN E INACTIVIDAD
// ================================================================

const INACTIVITY_TIMEOUT = 10 * 60 * 1000;  // 10 minutos de inactividad
let inactivityTimer = null;

// resetInactivityTimer() - Reinicia el contador de inactividad ante cualquier actividad del usuario.
function resetInactivityTimer() {
  if (inactivityTimer) clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    logoutUser();
  }, INACTIVITY_TIMEOUT);
}

// logoutUser() - Cierra la sesión: limpia sessionStorage, reinicia el estado y vuelve al login.
function logoutUser() {
  destroyPlayer();
  sessionStorage.removeItem('capacitacion_legajo');
  state.user = { nombre: '', apellido: '', legajo: '', sector: '' };
  state.completedTrainings = [];
  state.currentTrainingId = null;
  state.maxTimeViewed = 0;
  prefillForm();
  showSection('step-register');
}

// Delegación de evento para los botones "Cerrar sesión" (dashboard) y
// "Cerrar" (panel admin), que se manejan a nivel de document para garantizar
// que el clic siempre sea capturado.
document.addEventListener('click', (e) => {
  if (e.target.id === 'btn-logout') {
    logoutUser();
  }
  if (e.target.id === 'btn-admin-close') {
    closeAdmin();
  }
});

// Eventos de actividad del usuario que reinician el temporizador de inactividad
['click', 'keydown', 'mousemove', 'scroll', 'touchstart'].forEach(evt => {
  window.addEventListener(evt, resetInactivityTimer, { passive: true });
});

// Inicia el temporizador de inactividad al cargar la aplicación
resetInactivityTimer();

// Botón "Reiniciar" en la pantalla de todas las capacitaciones completadas
btnResetAll.addEventListener('click', async () => {
  state.completedTrainings = [];
  await saveState();
  renderDashboard();
  showSection('step-dashboard');
});

// ================================================================
// ADMINISTRACIÓN (Paso 7)
// Panel protegido con contraseña. Muestra estadísticas y registros.
// ================================================================

// Referencias a elementos del DOM del panel admin
const btnAdmin = document.getElementById('btn-admin');
const btnAdminClose = document.getElementById('btn-admin-close');
const adminForm = document.getElementById('admin-form');
const adminLogin = document.getElementById('admin-login');
const adminPanel = document.getElementById('admin-panel');
const adminError = document.getElementById('admin-error');
const adminPassword = document.getElementById('admin-password');
const adminTableWrapper = document.getElementById('admin-table-wrapper');
const btnAdminExport = document.getElementById('btn-admin-export');
const btnAdminClear = document.getElementById('btn-admin-clear');

// Botón "Admin" en el header: abre la pantalla de login
btnAdmin.addEventListener('click', () => {
  adminLogin.style.display = 'block';
  adminPanel.style.display = 'none';
  adminError.style.display = 'none';
  adminPassword.value = '';
  showSection('step-admin');
});

// closeAdmin() - Cierra la sesión del administrador: vuelve a la pantalla
// de inicio. Primero navega (esto SIEMPRE ocurre) y después limpia el player.
function closeAdmin() {
  adminLogin.style.display = 'block';
  adminPanel.style.display = 'none';
  adminError.style.display = 'none';
  adminPassword.value = '';
  sessionStorage.removeItem('capacitacion_legajo');
  state.user = { nombre: '', apellido: '', legajo: '', sector: '' };
  state.completedTrainings = [];
  state.currentTrainingId = null;
  prefillForm();
  showSection('step-register');
  try {
    destroyPlayer();
  } catch (e) {
    console.error('Error en limpieza al cerrar sesión admin:', e);
  }
}

// Submit del formulario de login admin - valida contra el servidor
adminForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: adminPassword.value })
    });
    if (res.ok) {
      adminError.style.display = 'none';
      adminLogin.style.display = 'none';
      adminPanel.style.display = 'block';
      await renderAdminDashboard();
    } else {
      adminError.style.display = 'block';
    }
  } catch (err) {
    adminError.textContent = 'Error de conexión con el servidor.';
    adminError.style.display = 'block';
  }
});

// fetchRecords() - Obtiene todos los registros de intentos desde el servidor
async function fetchRecords() {
  try {
    const res = await fetch('/api/records');
    if (res.ok) {
      state.records = await res.json();
    }
  } catch (e) {
    console.error('Error cargando registros:', e);
    state.records = [];
  }
}

// renderAdminDashboard() - Carga los registros y renderiza stats, breakdown y tabla.
async function renderAdminDashboard() {
  await fetchRecords();
  renderAdminStats();
  renderAdminBreakdown();
  renderAdminTable();
}

// renderAdminStats() - Calcula y muestra las 5 tarjetas de estadísticas.
function renderAdminStats() {
  const stats = document.getElementById('admin-stats');
  const total = state.records.length;
  const aprobados = state.records.filter(r => r.aprobado).length;
  const reprobados = total - aprobados;
  const tasa = total > 0 ? Math.round((aprobados / total) * 100) : 0;
  const empleadosUnicos = new Set(state.records.map(r => `${r.nombre}|${r.apellido}|${r.legajo}`)).size;

  stats.innerHTML = `
    <div class="stat-card stat-blue"><div class="stat-number">${total}</div><div class="stat-label">Intentos Totales</div></div>
    <div class="stat-card stat-green"><div class="stat-number">${aprobados}</div><div class="stat-label">Aprobados</div></div>
    <div class="stat-card stat-red"><div class="stat-number">${reprobados}</div><div class="stat-label">No Aprobados</div></div>
    <div class="stat-card stat-purple"><div class="stat-number">${tasa}%</div><div class="stat-label">Tasa de Aprobación</div></div>
    <div class="stat-card stat-orange"><div class="stat-number">${empleadosUnicos}</div><div class="stat-label">Empleados</div></div>
  `;
}

// renderAdminBreakdown() - Desglose de aprobados por capacitación con barra de progreso.
function renderAdminBreakdown() {
  const container = document.getElementById('admin-breakdown');
  const breakdown = {};
  state.records.forEach(r => {
    if (!breakdown[r.capacitacion]) {
      breakdown[r.capacitacion] = { total: 0, aprobados: 0 };
    }
    breakdown[r.capacitacion].total++;
    if (r.aprobado) breakdown[r.capacitacion].aprobados++;
  });

  const trainings = Object.keys(breakdown);
  if (trainings.length === 0) {
    container.innerHTML = '';
    return;
  }

  let html = '<h3 style="color:var(--primary);margin:20px 0 10px;font-size:16px;">Resultados por Capacitación</h3><div class="breakdown-grid">';
  trainings.forEach(t => {
    const b = breakdown[t];
    const pct = Math.round((b.aprobados / b.total) * 100);
    html += `
      <div class="breakdown-card">
        <div class="breakdown-title">${t}</div>
        <div class="breakdown-bar"><div class="breakdown-fill" style="width:${pct}%"></div></div>
        <div class="breakdown-info">${b.aprobados}/${b.total} aprobados (${pct}%)</div>
      </div>
    `;
  });
  html += '</div>';
  container.innerHTML = html;
}

// renderAdminTable() - Genera la tabla HTML con todos los intentos (más reciente primero).
function renderAdminTable() {
  if (state.records.length === 0) {
    adminTableWrapper.innerHTML = '<p style="text-align:center;padding:30px;color:var(--text-muted);">No hay registros aún.</p>';
    return;
  }
  let html = '<table class="admin-table"><thead><tr><th>#</th><th>Nombre</th><th>Apellido</th><th>Legajo</th><th>Sector</th><th>Capacitación</th><th>Resultado</th><th>Fecha</th></tr></thead><tbody>';
  [...state.records].reverse().forEach((r, i) => {
    const statusClass = r.aprobado ? 'status-pass' : 'status-fail';
    const statusText = r.aprobado ? '✓ Aprobado' : '✗ No Aprobado';
    html += `<tr>
      <td>${state.records.length - i}</td>
      <td>${r.nombre}</td>
      <td>${r.apellido}</td>
      <td><strong>${r.legajo}</strong></td>
      <td>${r.sector || '-'}</td>
      <td>${r.capacitacion}</td>
      <td class="${statusClass}">${statusText}</td>
      <td>${r.fecha}</td>
    </tr>`;
  });
  html += '</tbody></table>';
  adminTableWrapper.innerHTML = html;
}

// Botón "Actualizar" del panel admin - recarga los datos desde el servidor
const btnAdminRefresh = document.getElementById('btn-admin-refresh');
btnAdminRefresh.addEventListener('click', renderAdminDashboard);

// exportRecords() - Genera un archivo Excel (.xlsx) con todos los registros usando SheetJS.
// Se usa desde el botón "Exportar" del panel y desde el modal de eliminación.
function exportRecords() {
  if (state.records.length === 0) {
    alert('No hay registros para exportar.');
    return;
  }
  const data = state.records.map(r => ({
    Nombre: r.nombre,
    Apellido: r.apellido,
    Legajo: r.legajo,
    Sector: r.sector || '',
    Capacitación: r.capacitacion,
    Resultado: r.aprobado ? 'Aprobado' : 'No Aprobado',
    Fecha: r.fecha
  }));
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Registros');
  XLSX.writeFile(wb, `registros_capacitacion_${new Date().toISOString().slice(0,10)}.xlsx`);
}

btnAdminExport.addEventListener('click', exportRecords);

// ================================================================
// GESTIÓN DE USUARIOS (legajos registrados)
// Permite ver los usuarios, modificar uno, eliminar uno puntual o
// eliminar todos. Cada acción requiere doble verificación: primero
// la contraseña admin y luego la confirmación final.
// ================================================================

const btnAdminUsers = document.getElementById('btn-admin-users');
const adminUsersSection = document.getElementById('admin-users');
const adminUsersTableWrapper = document.getElementById('admin-users-table-wrapper');
const btnAdminUsersClear = document.getElementById('btn-admin-users-clear');

const modalUser = document.getElementById('modal-user');
const userModalTitle = document.getElementById('user-modal-title');
const userPhasePassword = document.getElementById('user-phase-password');
const userPhaseEdit = document.getElementById('user-phase-edit');
const userPhaseDelete = document.getElementById('user-phase-delete');
const userPassword = document.getElementById('user-password');
const userPasswordError = document.getElementById('user-password-error');
const btnUserCancelPassword = document.getElementById('user-cancel-password');
const btnUserContinue = document.getElementById('user-continue');
const userEditLegajo = document.getElementById('user-edit-legajo');
const userEditNombre = document.getElementById('user-edit-nombre');
const userEditApellido = document.getElementById('user-edit-apellido');
const userEditSector = document.getElementById('user-edit-sector');
const btnUserEditBack = document.getElementById('user-edit-back');
const btnUserEditSave = document.getElementById('user-edit-save');
const btnUserDeleteBack = document.getElementById('user-delete-back');
const btnUserDeleteConfirm = document.getElementById('user-delete-confirm');
const userDeleteWarning = document.getElementById('user-delete-warning');

// Acción pendiente: { type: 'edit'|'delete'|'deleteAll', legajo }
let pendingUserAction = null;

// fetchUsers() - Obtiene la lista de usuarios desde el servidor
async function fetchUsers() {
  try {
    const res = await fetch('/api/users');
    if (res.ok) {
      state.users = await res.json();
    } else {
      state.users = [];
    }
  } catch (e) {
    console.error('Error cargando usuarios:', e);
    state.users = [];
  }
}

// cuentaCapacitaciones(user) - Total de capacitaciones completadas por un usuario,
// soportando tanto el formato { id, completedAt } como el formato viejo (solo números).
function cuentaCapacitaciones(entry) {
  const list = entry && entry.completedTrainings ? entry.completedTrainings : [];
  return list.filter(t => {
    if (typeof t === 'number') return true;
    return t && t.id !== undefined;
  }).length;
}

// Cantidad máxima de legajos por página en la tabla de usuarios
const USERS_PER_PAGE = 20;

// renderUsersTable() - Genera la tabla HTML con los usuarios registrados,
// aplicando el buscador de legajo y la paginación (máx. USERS_PER_PAGE).
function renderUsersTable() {
  const usersPagination = document.getElementById('admin-users-pagination');
  const usersPageInfo = document.getElementById('admin-users-page-info');
  const btnUsersPrev = document.getElementById('admin-users-prev');
  const btnUsersNext = document.getElementById('admin-users-next');

  // Filtrado por el buscador
  const term = state.usersSearch.trim().toLowerCase();
  let filtered = state.users || [];
  if (term) {
    filtered = filtered.filter(u => String(u.legajo || '').toLowerCase().includes(term));
  }

  if (filtered.length === 0) {
    adminUsersTableWrapper.innerHTML = '<p style="text-align:center;padding:30px;color:var(--text-muted);">' +
      (term ? 'No hay usuarios que coincidan con la búsqueda.' : 'No hay usuarios registrados.') + '</p>';
    usersPagination.style.display = 'none';
    return;
  }

  // Paginación
  const totalPages = Math.max(1, Math.ceil(filtered.length / USERS_PER_PAGE));
  if (state.usersPage > totalPages) state.usersPage = totalPages;
  const start = (state.usersPage - 1) * USERS_PER_PAGE;
  const pageUsers = filtered.slice(start, start + USERS_PER_PAGE);

  let html = '<table class="admin-table"><thead><tr><th>Legajo</th><th>Nombre</th><th>Apellido</th><th>Sector</th><th>Completadas</th><th>Acciones</th></tr></thead><tbody>';
  pageUsers.forEach(u => {
    const legajo = u.legajo;
    const nombre = (u.user && u.user.nombre) || '-';
    const apellido = (u.user && u.user.apellido) || '-';
    const sector = (u.user && u.user.sector) || '-';
    const completadas = cuentaCapacitaciones(u);
    html += `<tr>
      <td><strong>${legajo}</strong></td>
      <td>${nombre}</td>
      <td>${apellido}</td>
      <td>${sector}</td>
      <td>${completadas}</td>
      <td class="admin-users-actions">
        <button class="btn btn-secondary btn-xs" data-user-action="edit" data-legajo="${legajo}">✏️ Modificar</button>
        <button class="btn btn-danger btn-xs" data-user-action="delete" data-legajo="${legajo}">🗑 Eliminar</button>
      </td>
    </tr>`;
  });
  html += '</tbody></table>';
  adminUsersTableWrapper.innerHTML = html;

  // Controles de paginación
  usersPageInfo.textContent = `Página ${state.usersPage} de ${totalPages} (${filtered.length} legajos)`;
  btnUsersPrev.disabled = state.usersPage <= 1;
  btnUsersNext.disabled = state.usersPage >= totalPages;
  usersPagination.style.display = totalPages > 1 ? 'flex' : 'none';
}

// Buscador de legajo: filtra al escribir y vuelve a la primera página
const userSearch = document.getElementById('user-search');
if (userSearch) {
  userSearch.addEventListener('input', () => {
    state.usersSearch = userSearch.value;
    state.usersPage = 1;
    renderUsersTable();
  });
}

// Paginación: Anterior / Siguiente
const btnUsersPrev = document.getElementById('admin-users-prev');
const btnUsersNext = document.getElementById('admin-users-next');
if (btnUsersPrev) {
  btnUsersPrev.addEventListener('click', () => {
    if (state.usersPage > 1) {
      state.usersPage--;
      renderUsersTable();
    }
  });
}
if (btnUsersNext) {
  btnUsersNext.addEventListener('click', () => {
    const totalPages = Math.max(1, Math.ceil((state.users || []).length / USERS_PER_PAGE));
    if (state.usersPage < totalPages) {
      state.usersPage++;
      renderUsersTable();
    }
  });
}

// Botón "Gestionar Usuarios": muestra/oculta la sección y carga los usuarios
btnAdminUsers.addEventListener('click', async () => {
  if (adminUsersSection.style.display === 'none') {
    adminUsersSection.style.display = 'block';
    await fetchUsers();
    renderUsersTable();
  } else {
    adminUsersSection.style.display = 'none';
  }
});

// Delegación de eventos para los botones de la tabla de usuarios
adminUsersTableWrapper.addEventListener('click', (e) => {
  const btn = e.target.closest('button[data-user-action]');
  if (!btn) return;
  const legajo = btn.getAttribute('data-legajo');
  const action = btn.getAttribute('data-user-action');
  pendingUserAction = { type: action, legajo };
  userPassword.value = '';
  userPasswordError.style.display = 'none';
  userPhasePassword.style.display = 'block';
  userPhaseEdit.style.display = 'none';
  userPhaseDelete.style.display = 'none';
  modalUser.style.display = 'flex';
  setTimeout(() => userPassword.focus(), 50);
});

// Botón "Eliminar Todos" de la sección de usuarios
btnAdminUsersClear.addEventListener('click', () => {
  pendingUserAction = { type: 'deleteAll', legajo: null };
  userPassword.value = '';
  userPasswordError.style.display = 'none';
  userPhasePassword.style.display = 'block';
  userPhaseEdit.style.display = 'none';
  userPhaseDelete.style.display = 'none';
  modalUser.style.display = 'flex';
  setTimeout(() => userPassword.focus(), 50);
});

// Cerrar el modal sin hacer nada
btnUserCancelPassword.addEventListener('click', () => {
  modalUser.style.display = 'none';
  pendingUserAction = null;
});

// Fase 1: valida la contraseña contra el servidor
btnUserContinue.addEventListener('click', async () => {
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: userPassword.value })
    });
    if (res.ok) {
      userPasswordError.style.display = 'none';
      userPhasePassword.style.display = 'none';
      if (pendingUserAction.type === 'edit') {
        const u = state.users.find(x => x.legajo === pendingUserAction.legajo);
        if (!u) {
          alert('Usuario no encontrado.');
          modalUser.style.display = 'none';
          pendingUserAction = null;
          return;
        }
        userModalTitle.textContent = `Modificar Usuario - Legajo ${u.legajo}`;
        userEditLegajo.value = u.legajo;
        userEditNombre.value = (u.user && u.user.nombre) || '';
        userEditApellido.value = (u.user && u.user.apellido) || '';
        const sector = (u.user && u.user.sector) || '';
        userEditSector.innerHTML = '<option value="" selected disabled>Seleccione un servicio...</option>' +
          SECTOR_SERVICES.map(s => `<option value="${s}">${s}</option>`).join('');
        if (sector && !SECTOR_SERVICES.includes(sector) &&
            !userEditSector.querySelector('option[value="' + sector + '"]')) {
          userEditSector.insertAdjacentHTML('beforeend', `<option value="${sector}">${sector}</option>`);
        }
        userEditSector.value = sector;
        userPhaseEdit.style.display = 'block';
      } else if (pendingUserAction.type === 'delete') {
        userModalTitle.textContent = 'Eliminar Usuario';
        userDeleteWarning.innerHTML = `<p><strong>⚠️ Esta acción es DEFINITIVA.</strong></p>
          <p>El usuario <strong>legajo ${pendingUserAction.legajo}</strong> y todos sus intentos de
          capacitación serán eliminados y <strong>NO se podrán recuperar</strong>.</p>`;
        userPhaseDelete.style.display = 'block';
      } else {
        userModalTitle.textContent = 'Eliminar Todos los Usuarios';
        userDeleteWarning.innerHTML = `<p><strong>⚠️ Esta acción es DEFINITIVA.</strong></p>
          <p>Todos los <strong>usuarios registrados</strong> y todos sus <strong>intentos</strong>
          serán eliminados y <strong>NO se podrán recuperar</strong>.</p>
          <p>Se recomienda exportar los registros antes de continuar.</p>`;
        userPhaseDelete.style.display = 'block';
      }
    } else {
      userPasswordError.textContent = 'Contraseña incorrecta.';
      userPasswordError.style.display = 'block';
    }
  } catch (err) {
    userPasswordError.textContent = 'Error de conexión con el servidor.';
    userPasswordError.style.display = 'block';
  }
});

// Volver desde la edición: regresa a la fase de contraseña
btnUserEditBack.addEventListener('click', () => {
  userPassword.value = '';
  userPasswordError.style.display = 'none';
  userPhasePassword.style.display = 'block';
  userPhaseEdit.style.display = 'none';
});

// Volver desde la confirmación de borrado
btnUserDeleteBack.addEventListener('click', () => {
  userPassword.value = '';
  userPasswordError.style.display = 'none';
  userPhasePassword.style.display = 'block';
  userPhaseDelete.style.display = 'none';
});

// Permitir confirmar la contraseña con Enter
userPassword.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    btnUserContinue.click();
  }
});

// Guardar cambios de la edición
btnUserEditSave.addEventListener('click', async () => {
  if (!userEditNombre.value.trim() || !userEditApellido.value.trim()) {
    alert('Complete nombre y apellido.');
    return;
  }
  if (!userEditSector.value) {
    alert('Seleccione un sector.');
    return;
  }
  try {
    const res = await fetch('/api/users/' + encodeURIComponent(userEditLegajo.value), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: {
          nombre: userEditNombre.value.trim(),
          apellido: userEditApellido.value.trim(),
          sector: userEditSector.value
        }
      })
    });
    if (res.ok) {
      modalUser.style.display = 'none';
      pendingUserAction = null;
      await fetchUsers();
      renderUsersTable();
    } else {
      alert('No se pudo guardar el usuario. Intente nuevamente.');
    }
  } catch (e) {
    console.error('Error guardando usuario:', e);
    alert('Error al guardar el usuario.');
  }
});

// Confirmación final: elimina un usuario puntual
btnUserDeleteConfirm.addEventListener('click', async () => {
  try {
    if (pendingUserAction.type === 'deleteAll') {
      await fetch('/api/users', { method: 'DELETE' });
      state.users = [];
      state.records = [];
      renderAdminDashboard();
    } else {
      await fetch('/api/users/' + encodeURIComponent(pendingUserAction.legajo), { method: 'DELETE' });
      state.users = state.users.filter(u => u.legajo !== pendingUserAction.legajo);
      renderUsersTable();
    }
    modalUser.style.display = 'none';
    pendingUserAction = null;
  } catch (e) {
    console.error('Error eliminando usuario(s):', e);
    alert('Error al eliminar. Intente nuevamente.');
  }
});

// ================================================================
// MODAL DE ELIMINACIÓN DE REGISTROS
// Doble validación: pide la contraseña admin nuevamente y luego
// confirma una eliminación definitiva e irreversible.
// ================================================================

const modalClear = document.getElementById('modal-clear');
const clearPhasePassword = document.getElementById('clear-phase-password');
const clearPhaseConfirm = document.getElementById('clear-phase-confirm');
const clearPassword = document.getElementById('clear-password');
const clearError = document.getElementById('clear-error');
const btnClearCancel = document.getElementById('clear-cancel');
const btnClearContinue = document.getElementById('clear-continue');
const btnClearBack = document.getElementById('clear-back');
const btnClearExport = document.getElementById('clear-export');
const btnClearDelete = document.getElementById('clear-delete');

// Botón "Limpiar Registros": abre el modal en la fase de contraseña
btnAdminClear.addEventListener('click', () => {
  clearPassword.value = '';
  clearError.style.display = 'none';
  clearPhasePassword.style.display = 'block';
  clearPhaseConfirm.style.display = 'none';
  modalClear.style.display = 'flex';
});

// Cerrar el modal (sin eliminar nada)
btnClearCancel.addEventListener('click', () => {
  modalClear.style.display = 'none';
});

// Fase 1: valida la contraseña contra el servidor
btnClearContinue.addEventListener('click', async () => {
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: clearPassword.value })
    });
    if (res.ok) {
      clearError.style.display = 'none';
      clearPhasePassword.style.display = 'none';
      clearPhaseConfirm.style.display = 'block';
    } else {
      clearError.textContent = 'Contraseña incorrecta.';
      clearError.style.display = 'block';
    }
  } catch (err) {
    clearError.textContent = 'Error de conexión con el servidor.';
    clearError.style.display = 'block';
  }
});

// "Volver" desde la confirmación: regresa a la fase de contraseña
btnClearBack.addEventListener('click', () => {
  clearPassword.value = '';
  clearError.style.display = 'none';
  clearPhasePassword.style.display = 'block';
  clearPhaseConfirm.style.display = 'none';
});

// Permitir confirmar la contraseña con Enter
clearPassword.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    btnClearContinue.click();
  }
});

// "Exportar antes de eliminar": genera el Excel con los registros actuales
btnClearExport.addEventListener('click', exportRecords);

// Fase 2: eliminación definitiva (solo se llega con contraseña validada)
btnClearDelete.addEventListener('click', async () => {
  try {
    await fetch('/api/records', { method: 'DELETE' });
    state.records = [];
    modalClear.style.display = 'none';
    renderAdminDashboard();
  } catch (e) {
    console.error('Error limpiando registros:', e);
    alert('Error al limpiar los registros. Intente nuevamente.');
  }
});

// ================================================================
// INICIALIZACIÓN
// Se ejecuta al cargar la página. Si hay un legajo guardado en sessionStorage,
// carga su estado del servidor y va directo al dashboard.
// Si no, muestra el formulario de registro.
// ================================================================

async function initApp() {
  const savedLegajo = sessionStorage.getItem('capacitacion_legajo');
  if (savedLegajo) {
    await loadState(savedLegajo);
    if (state.user && state.user.legajo) {
      prefillForm();
      renderDashboard();
      showSection('step-dashboard');
      return;
    }
  }
  prefillForm();
  showSection('step-register');
}

// Ejecuta initApp cuando el DOM esté listo (o inmediatamente si ya lo está)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
