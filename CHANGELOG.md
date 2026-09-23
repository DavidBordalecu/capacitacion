# Changelog

## v1.5 (actual)
- Primer módulo real: **Precauciones Estándar** (3 capacitaciones)
- Eliminadas las 4 capacitaciones placeholder de ejemplo
- Videos reales desde Google Drive (Capacitacion_01/02/03.mp4) vía elemento `<video>` HTML5 y URL de streaming directo
- Reproductor HTML5 con controles play/pause propios y protección anti-adelantamiento (sin API de YouTube)
- Preguntas reales del cuestionario: 12 preguntas (4 por video) con las respuestas correctas del documento oficial
- Datos de prueba eliminados (users.json y records.json vacíos)

## v1.4
- Advertencia al empleado si el legajo existe pero el nombre no coincide
- Al cambiar de legajo se cargan los datos correctos del servidor

## v1.3
- Certificado PDF descargable al aprobar
- Certificados persistentes por legajo (disponibles desde el dashboard)
- Fecha de aprobación guardada en el servidor

## v1.2
- Campo "Sector / Área" en el formulario de registro
- Columna Sector en tabla de administración y exportación Excel

## v1.1
- Migración a servidor Node.js + Express
- Datos centralizados en JSON (data/users.json, data/records.json)
- Fin del almacenamiento en localStorage del navegador

## v1.0
- Admin Dashboard con tarjetas de estadísticas y desglose por capacitación
- Botón Actualizar en panel admin
- Tabla de registros ordenada del más reciente al más antiguo

## v0.9
- Enlace Admin en el header (visible en todas las páginas)
- Pantalla de administración con protección por contraseña
- Exportación de registros a CSV
- Limpieza de registros

## v0.8
- Reproductor YouTube con solo play/pause (sin adelantar)
- Evaluación con preguntas mezcladas, 100% para aprobar
- Envío de email por EmailJS (simulado si no configurado)
- Pantalla de éxito con resumen

## v0.7
- Registro de usuario (nombre, apellido, legajo)
- Dashboard con tarjetas de capacitaciones (pendiente/completado)
- 4 capacitaciones placeholder con preguntas de ejemplo
- Persistencia en localStorage del navegador
