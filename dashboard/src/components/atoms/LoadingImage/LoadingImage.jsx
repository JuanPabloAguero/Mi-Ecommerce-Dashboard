import { useState } from 'react'; // estado de carga de la imagen
import './LoadingImage.css'; // estilos propios del componente

// Imagen con aviso mientras se descarga (átomo del modelo atómico).
// Para que el aviso se reinicie si cambia la imagen, quien lo use debe pasarle una "key" distinta a cada "src"
function LoadingImage({ src, alt = '', size }) { {/* "size" (px) es opcional; sin ella mide 64px */}
  const [status, setStatus] = useState('loading'); // 'loading' | 'loaded' | 'error'

  return (
      <div className="loading-image" style={size ? { width: size, height: size } : undefined}>
      {/* Fondo gris con el aviso, visible hasta que la imagen carga */}
      {status === 'loading' && <span className="loading-image__notice">Cargando…</span>}
      {status === 'error' && <span className="loading-image__notice">Sin imagen</span>}

      {/* La imagen siempre está en el DOM (transparente hasta que carga) para que el navegador la descargue */}
      <img
        className={`loading-image__img ${status === 'loaded' ? 'loading-image__img--loaded' : ''}`}
        src={src}
        alt={alt}
        loading="lazy" // en listas largas solo descarga las imágenes cercanas a la pantalla
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
      />
    </div>
  );
}

export default LoadingImage; // se exporta para usarlo en otros componentes
