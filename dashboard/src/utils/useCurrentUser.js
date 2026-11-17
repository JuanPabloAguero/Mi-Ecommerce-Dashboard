// Usuario por defecto mientras no haya sesiones
const guestUser = { name: 'Usuario' };

// Devuelve el usuario actual de la app.
// Todavía no hay login en este sprint, por eso devuelve un usuario de ejemplo.
// Cuando se implementen las sesiones solo hay que cambiar este hook (por ejemplo,
// leyendo un contexto de autenticación): Header y Sidebar ya lo usan.
export function useCurrentUser() {
  return guestUser;
}
