// Traduce un error de la API (o de red) en un mensaje para la persona usuaria
export function describeError(error) {
  if (error instanceof TypeError) return 'No se pudo conectar con el servidor.'; // fetch falló (servidor apagado)
  if (error.status === 401) return 'No autorizado: falta el token o venció. Revisa VITE_API_TOKEN en dashboard/.env.';
  if (error.status === 403) return 'Acceso denegado: se requieren permisos de administrador.';
  if (error.details?.length) return `${error.message}: ${error.details.join('. ')}`; // ej: validaciones de la API
  return error.message || 'Ocurrió un error inesperado.';
}
