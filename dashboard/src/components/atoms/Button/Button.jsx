import './Button.css'; // estilos propios del componente

// Botón de acción (átomo del modelo atómico). Para navegar a otra ruta se usa LinkButton.
// type="button" por defecto, así un botón dentro de un <form> no lo envía sin querer
function Button({ type = 'button', variant = 'primary', ...props }) {
  return <button type={type} className={`button button--${variant}`} {...props} />;
}

export default Button; // se exporta para usarlo desde otros componentes
