export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function truncate(str: string, length: number = 100): string {
  return str.length > length ? str.substring(0, length) + '...' : str;
}