const EVENT = 'open-cv-viewer'

/** Opens the in-page CV reader (rendered once in App). */
export function openCvViewer(): void {
  window.dispatchEvent(new Event(EVENT))
}

export function onOpenCvViewer(handler: () => void): () => void {
  window.addEventListener(EVENT, handler)
  return () => window.removeEventListener(EVENT, handler)
}
