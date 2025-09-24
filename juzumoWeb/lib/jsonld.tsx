export function jsonLd(obj: object) {
    return { __html: JSON.stringify(obj) };
  }
  