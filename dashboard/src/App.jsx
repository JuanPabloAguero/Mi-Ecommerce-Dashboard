import { Routes, Route } from 'react-router'; // Routes agrupa las rutas; Route mapea una URL a un componente
import './App.css'; // estilos de la app principal
import Home from './pages/Home/Home'; // página de inicio

// Estructura general de la UI (Sidebar + Main Area)
import MainLayout from './components/templates/MainLayout/MainLayout';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound';

// Páginas de productos
import ProductsList from './pages/Products/ProductsList/ProductsList';
import ProductView from './pages/Products/ProductView/ProductView';
import ProductForm from './pages/Products/ProductForm/ProductForm';

// Páginas de categorías
import CategoriesList from './pages/Categories/CategoriesList/CategoriesList';
import CategoryView from './pages/Categories/CategoryView/CategoryView';
import CategoryForm from './pages/Categories/CategoryForm/CategoryForm';

// Páginas de usuarios
import UsersList from './pages/Users/UsersList/UsersList';
import UserView from './pages/Users/UserView/UserView';
import UserForm from './pages/Users/UserForm/UserForm';

// Componente principal: define las rutas; todas se muestran dentro del
// Main Area de MainLayout, junto al Sidebar
function App() {
  return (
    <Routes>
      {/* Ruta "layout": sin path, envuelve a todas las demás con MainLayout (renderizan en su <Outlet />) */}
      <Route element={<MainLayout />}>
        {/* Inicio */}
        <Route path="/" element={<Home />} />

        {/* Productos: React Router prioriza "/products/new" sobre "/products/:id" sin importar el orden */}
        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/new" element={<ProductForm />} />
        <Route path="/products/:id" element={<ProductView />} />
        <Route path="/products/:id/edit" element={<ProductForm />} /> {/* mismo formulario para modificar */}

        {/* Categorías */}
        <Route path="/categories" element={<CategoriesList />} />
        <Route path="/categories/new" element={<CategoryForm />} />
        <Route path="/categories/:id" element={<CategoryView />} />
        <Route path="/categories/:id/edit" element={<CategoryForm />} />

        {/* Usuarios */}
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/new" element={<UserForm />} />
        <Route path="/users/:id" element={<UserView />} />
        <Route path="/users/:id/edit" element={<UserForm />} />

        {/* Perfil del usuario actual */}
        <Route path="/profile" element={<Profile />} />

        {/* Ruta por defecto: "*" captura cualquier URL inexistente o aún no implementada (Error 404);
            queda dentro del layout para que el Sidebar siga visible */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
