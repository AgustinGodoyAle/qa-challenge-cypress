// "$29.99" -> 29.99
export const parsePrice = (text) => Number(text.replace('$', '').trim());
