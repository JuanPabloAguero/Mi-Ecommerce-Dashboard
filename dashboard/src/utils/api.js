// URL base de la API REST de Express
// Se lee de .env para no dejarla fija en el código; si no existe, usa la local.
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
