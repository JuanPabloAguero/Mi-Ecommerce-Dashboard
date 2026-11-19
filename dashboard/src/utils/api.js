// URL base de la API REST de Express
// Se lee de .env para no dejarla fija en el código; si no existe, usa la local.
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Origen del servidor (sin "/api"): desde ahí Express sirve las imágenes estáticas (/images/...)
export const API_ORIGIN = API_URL.replace(/\/api\/?$/, '');

// Token de acceso (JWT) para las rutas protegidas de la API.
// PROVISORIO: sin login en este sprint se toma de .env; cuando haya sesiones vendrá del usuario autenticado
const API_TOKEN = import.meta.env.VITE_API_TOKEN || '';

// Petición genérica a la API (GET por defecto). Devuelve el JSON de la respuesta.
// Si la API responde con error, lanza un Error con el mensaje de la API,
// el código HTTP en "status" y la lista de problemas en "details"
export async function apiRequest(path, { method = 'GET', body } = {}) {
  const headers = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json'; // solo cuando se envía un body
  if (API_TOKEN) headers.Authorization = `Bearer ${API_TOKEN}`; // formato que espera verifyToken

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  // Las respuestas de error de la API tienen la forma { error, details }
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const error = new Error(data?.error || `Error ${res.status}`);
    error.status = res.status;
    error.details = data?.details || [];
    throw error;
  }
  return data;
}

// GET a la API: devuelve el JSON o lanza un error si la respuesta no es exitosa
export function apiGet(path) {
  return apiRequest(path);
}

// Convierte el campo "image" de un producto en una URL que el dashboard pueda cargar
// (el dashboard corre en otro puerto, así que las rutas relativas necesitan el origen del servidor)
export function getImageUrl(image) {
  const value = (image || '').trim();
  if (value === '') return `${API_ORIGIN}/images/default-product.png`; // sin imagen: la de por defecto del servidor
  if (/^(https?:)?\/\//.test(value) || value.startsWith('data:')) return value; // ya es una URL completa
  return `${API_ORIGIN}${value.startsWith('/') ? '' : '/'}${value}`; // ruta relativa del servidor
}
