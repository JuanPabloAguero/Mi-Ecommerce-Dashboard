import { apiGet } from './api'; // GET a la API

// Lista de categorías ({ id, name }): GET /api/categories
export function getCategories() {
  return apiGet('/categories');
}
