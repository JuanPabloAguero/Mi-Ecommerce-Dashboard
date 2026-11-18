// URL base de la API REST de Express
// Se lee de .env para no dejarla fija en el código; si no existe, usa la local.
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Origen del servidor (sin "/api"): desde ahí Express sirve las imágenes estáticas (/images/...)
export const API_ORIGIN = API_URL.replace(/\/api\/?$/, '');

// GET genérico a la API: devuelve el JSON o lanza un error si la respuesta no es exitosa
export async function apiGet(path) {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`Error ${res.status} al pedir ${path}`);
  return res.json();
}

// Convierte el campo "image" de un producto en una URL que el dashboard pueda cargar
// (el dashboard corre en otro puerto, así que las rutas relativas necesitan el origen del servidor)
export function getImageUrl(image) {
  const value = (image || '').trim();
  if (value === '') return `${API_ORIGIN}/images/default-product.png`; // sin imagen: la de por defecto del servidor
  if (/^(https?:)?\/\//.test(value) || value.startsWith('data:')) return value; // ya es una URL completa
  return `${API_ORIGIN}${value.startsWith('/') ? '' : '/'}${value}`; // ruta relativa del servidor
}
