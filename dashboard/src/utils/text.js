// Prepara un texto para compararlo sin distinguir mayúsculas ni tildes:
// "Café" y "cafe" quedan iguales. Acepta null/undefined (ej: un producto sin descripción)
export function normalizeText(text) {
  return String(text ?? '')
    .normalize('NFD')                // separa las letras de sus tildes ("é" pasa a "e" + tilde)
    .replace(/[\u0300-\u036f]/g, '') // elimina las tildes
    .toLowerCase();
}
