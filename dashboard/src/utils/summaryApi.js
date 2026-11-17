import { API_URL } from './api'; // URL base de la API

// Pide una lista completa a la API (ej: "products") y devuelve el array
async function getList(resource) {
  const res = await fetch(`${API_URL}/${resource}`);
  if (!res.ok) throw new Error(`Error ${res.status} al pedir /${resource}`);
  return res.json();
}

// Totales para la pantalla de Home.
// Se cuentan los elementos de las listas públicas porque /api/stats requiere token (aún no hay login)
export async function getSummary() {
  // Las dos consultas se hacen en paralelo
  const [products, categories] = await Promise.all([
    getList('products'),
    getList('categories'),
  ]);
  return {
    totalProducts: products.length,
    totalCategories: categories.length,
  };
}
