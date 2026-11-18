import { useState, useEffect, useRef } from 'react'; // estado de expansión, foco automático y referencia al input
import './SearchBox.css'; // estilos propios del componente

// Campo de búsqueda (molécula del modelo atómico).
// En pantallas chicas se muestra como un botón con lupa; al tocarlo se expande y ocupa todo el Header
function SearchBox({ value, onChange, placeholder = 'Buscar' }) {
  const [expanded, setExpanded] = useState(false); // solo tiene efecto visual en pantallas chicas
  const inputRef = useRef(null); // acceso al input para darle el foco

  // Al expandir la búsqueda, el cursor queda listo para escribir
  useEffect(() => {
    if (expanded) inputRef.current?.focus();
  }, [expanded]);

  return (
    <div className={`search-box ${expanded ? 'search-box--expanded' : ''}`}>
      {/* Botón lupa: solo visible en pantallas chicas con la búsqueda cerrada */}
      <button
        type="button"
        className="search-box__toggle"
        aria-label="Abrir búsqueda"
        onClick={() => setExpanded(true)}
      >
        🔍
      </button>

      {/* Campo de búsqueda: siempre visible en pantallas grandes; en chicas solo expandido */}
      <div className="search-box__field">
        {/* Botón para cerrar la búsqueda expandida (solo pantallas chicas) */}
        <button
          type="button"
          className="search-box__close"
          aria-label="Cerrar búsqueda"
          onClick={() => setExpanded(false)}
        >
          ✕
        </button>

        <div className="search-box__input-wrap">
          <input
            ref={inputRef}
            className="search-box__input"
            type="search"
            placeholder={placeholder}
            aria-label={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)} // avisa a la página lo que se escribió
            onKeyDown={(e) => e.key === 'Escape' && setExpanded(false)} // Escape cierra la búsqueda expandida
          />
          <span className="search-box__icon" aria-hidden="true">🔍</span>
        </div>
      </div>
    </div>
  );
}

export default SearchBox; // se exporta para usarlo en las páginas de listado
