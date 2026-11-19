import { matchPath } from 'react-router'; // compara una URL con un patrón de ruta (ej: "/products/:id")

// Título del Header para cada ruta.
// El orden importa: se usa la primera que coincide, por eso "/products/new" va antes que "/products/:id"
const routeTitles = [
  { path: '/', title: 'Inicio' },
  { path: '/home', title: (user) => `¡Hola ${user.name}!` }, // saludo personalizado: el título es una función que recibe el usuario actual
  { path: '/products', title: 'Productos' },
  { path: '/products/new', title: 'Agregar producto' },
  { path: '/products/:id', title: (user, params) => `Productos > #${params.id}` }, // código del producto tomado de la URL
  { path: '/products/:id/edit', title: 'Editar producto' },

  { path: '/categories', title: 'Categorías' },
  { path: '/categories/new', title: 'Agregar categoría' },
  { path: '/categories/:id', title: 'Detalle de categoría' },
  { path: '/categories/:id/edit', title: 'Editar categoría' },

  { path: '/users', title: 'Usuarios' },
  { path: '/users/new', title: 'Agregar usuario' },
  { path: '/users/:id', title: 'Detalle de usuario' },
  { path: '/users/:id/edit', title: 'Editar usuario' },

  { path: '/profile', title: 'Perfil' },
];

// Devuelve el título para una URL; si no coincide con ninguna ruta es un 404
export function getRouteTitle(pathname, user) {
  for (const route of routeTitles) {
    const match = matchPath(route.path, pathname); // null si no coincide; si coincide trae los parámetros (ej: { id: '7' })
    if (match) {
      // Algunos títulos dependen del usuario o de la URL (son funciones); el resto son texto fijo
      return typeof route.title === 'function' ? route.title(user, match.params) : route.title;
    }
  }
  return 'Página no encontrada';
}
