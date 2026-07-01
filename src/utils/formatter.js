export function formatNumber(value, digits = 2) {
  return Number(value || 0).toFixed(digits);
}

export function formatDateTime(date = new Date()) {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}
