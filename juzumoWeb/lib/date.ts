export function formatDateEs(iso: string) {
    // estable entre SSR y cliente si fijas timeZone
    return new Intl.DateTimeFormat('es-ES', { timeZone: 'Europe/Madrid', dateStyle: 'medium' })
      .format(new Date(iso));
  }
  