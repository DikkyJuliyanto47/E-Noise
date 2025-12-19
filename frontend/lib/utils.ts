export function formatTime(iso: string) {
  try {
    return new Date(iso).toLocaleTimeString();
  } catch {
    return "-";
  }
}

export function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return "-";
  }
}

export function pct(n: number) {
  return `${Math.round(n * 100)}%`;
}
