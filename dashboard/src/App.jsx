import { Routes, Route } from 'react-router'; // Routes agrupa las rutas; Route mapea una URL a un componente
import './App.css'; // estilos de la app principal
import Home from './pages/Home/Home'; // página de inicio

// Navegación y páginas nuevas de esta User Story
import Navbar from './components/organisms/Navbar/Navbar';
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

// Componente principal: muestra la barra de navegación y, debajo,
// la página que corresponde a la URL actual (el ruteo se define acá)
function App() {
  return (
    <>
      <Navbar /> {/* visible en todas las páginas */}

      <Routes>
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

        {/* Ruta por defecto: "*" captura cualquier URL inexistente o aún no implementada (Error 404) */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
