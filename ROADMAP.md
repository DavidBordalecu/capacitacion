# Roadmap

## ✅ Completado

### Core
- [x] Registro de empleados (nombre, apellido, legajo, sector)
- [x] Dashboard con tarjetas de capacitación
- [x] Evaluación tipo multiple choice (100% para aprobar)
- [x] Certificado PDF descargable por capacitación

### Reproductor de video
- [x] Reproductor play/pause (sin seeking) sobre API de YouTube
- [x] Reproductor HTML5 para videos de Google Drive (reemplaza la API de YouTube)
- [x] Protección anti-adelantamiento (watchdog 250ms)

### Capacitaciones reales
- [x] Primer módulo real: **Precauciones Estándar** con 3 videos propios (Google Drive)
- [x] Evaluaciones reales (12 preguntas, 4 por video) con respuestas correctas oficiales
- [x] Eliminadas las 4 capacitaciones placeholder de ejemplo

### Persistencia
- [x] Servidor Node.js + Express
- [x] Datos centralizados en JSON por legajo
- [x] Acceso desde cualquier PC de la red
- [x] Certificados disponibles siempre (re-descarga)

### Administración
- [x] Panel Admin con contraseña
- [x] Estadísticas (totales, aprobados, tasa, empleados)
- [x] Desglose por capacitación con barras de progreso
- [x] Tabla detallada de intentos
- [x] Exportación a Excel (.xlsx)
- [x] Gestión de usuarios (modificar/eliminar puntual/todos)

### UX
- [x] Sesión persistente por legajo (sessionStorage)
- [x] Advertencia si el legajo existe pero el nombre no coincide
- [x] Botón "editar legajo" desde el dashboard

## 🔜 Próximos pasos sugeridos

### Capacitaciones
- [ ] Agregar más módulos reales (reutilizando el patrón: video + preguntas por video)
- [ ] Editor de preguntas desde el panel admin

### Base de datos (reemplazar JSON)
- [ ] Migrar a SQLite (evita corrupción con escrituras simultáneas)
- [ ] Mejor rendimiento con múltiples usuarios concurrentes

### Despliegue
- [ ] Servicio systemd en Ubuntu (auto-inicio al reiniciar)
- [ ] Documentación de instalación para el servidor

### Notificaciones
- [ ] Configurar EmailJS con credenciales reales
- [ ] Email al empleado al aprobar con certificado adjunto

### Reportes
- [ ] Filtrar registros por fecha, capacitación, sector
- [ ] Gráficos visuales (aprobación por sector, por mes)