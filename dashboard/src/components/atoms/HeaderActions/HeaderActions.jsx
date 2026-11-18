import { createPortal } from 'react-dom'; // renderiza un elemento en otro lugar del DOM
import { useOutletContext } from 'react-router'; // lee lo que MainLayout pasó a través de <Outlet context>

// Muestra sus hijos dentro del espacio de acciones del Header, aunque se declaren dentro de una página.
// Uso: <HeaderActions> ...botones... </HeaderActions>
function HeaderActions({ children }) {
  const { headerSlot } = useOutletContext(); // elemento del Header definido en MainLayout
  return headerSlot ? createPortal(children, headerSlot) : null; // hasta que el Header exista no se muestra nada
}

export default HeaderActions; // se exporta para usarlo desde las páginas
