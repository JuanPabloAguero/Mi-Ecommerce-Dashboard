import './NumberStepper.css'; // estilos propios del componente

// Input numérico con botones para restar y sumar una unidad (molécula del modelo atómico).
// "value" es un texto (puede estar vacío mientras se escribe); "onChange" recibe el nuevo texto
function NumberStepper({ id, value, onChange, min = 0 }) {
  const parsed = Number.parseInt(value, 10);
  const current = Number.isNaN(parsed) ? 0 : parsed; // un valor vacío o inválido cuenta como 0

  return (
    <div className="number-stepper">
      {/* ➖ resta una unidad, sin bajar del mínimo */}
      <button
        type="button"
        aria-label="Disminuir"
        disabled={current <= min}
        onClick={() => onChange(String(Math.max(min, current - 1)))}
      >
        −
      </button>

      {/* También se puede escribir el valor directamente */}
      <input
        id={id}
        type="number"
        min={min}
        step="1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {/* ➕ suma una unidad */}
      <button 
        type="button" 
        aria-label="Aumentar" 
        onClick={() => onChange(String(current + 1))}>
        +
      </button>
    </div>
  );
}

export default NumberStepper; // se exporta para usarlo en los formularios
