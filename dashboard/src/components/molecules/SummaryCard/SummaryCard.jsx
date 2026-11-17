import './SummaryCard.css'; // estilos propios del componente

// Bloque de resumen (molécula del modelo atómico): ícono + cantidad + etiqueta + acciones.
// "count" es null mientras carga o si falló la consulta; "children" son los botones de acción
function SummaryCard({ icon, count, label, children }) {
  return (
    <article className="summary-card">
      <div className="summary-card__info">
        <span className="summary-card__icon" aria-hidden="true">{icon}</span> {/* ícono decorativo */}
        <p className="summary-card__text">
          {/* Si todavía no hay dato se muestra un guion en lugar de un número */}
          <strong>{count ?? '–'}</strong> {label}
        </p>
      </div>

      <div className="summary-card__actions">{children}</div>
    </article>
  );
}

export default SummaryCard; // se exporta para usarlo en Home
