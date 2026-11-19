import { apiGet, apiRequest } from './api'; // peticiones a la API

// Lista completa de productos: GET /api/products
export function getProducts() {
  return apiGet('/products');
}

// Un producto: GET /api/products/:id
export function getProduct(id) {
  return apiGet(`/products/${id}`);
}

// Modifica un producto: PUT /api/products/:id (se envían todos sus atributos). Requiere token de administrador
export function updateProduct(id, product) {
  return apiRequest(`/products/${id}`, { method: 'PUT', body: product });
}

// Elimina un producto: DELETE /api/products/:id. Requiere token de administrador
export function deleteProduct(id) {
  return apiRequest(`/products/${id}`, { method: 'DELETE' });
}

// Crea un producto: POST /api/products (se envían todos sus atributos). Requiere token de administrador.
// La API responde 201 con el producto creado, que incluye su id
export function createProduct(product) {
  return apiRequest('/products', { method: 'POST', body: product });
}
