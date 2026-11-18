import { apiGet } from './api'; // GET genérico a la API

// Lista completa de productos: GET /api/products
export function getProducts() {
  return apiGet('/products');
}
