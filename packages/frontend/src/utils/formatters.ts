/**
 * Format a number as Malaysian Ringgit currency
 */
export function formatCurrency(value: number): string {
  return `RM ${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}

/**
 * Format a number with thousand separators
 */
export function formatNumber(value: number, decimals = 0): string {
  return value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * Format a percentage value
 */
export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}

/**
 * Parse a currency string back to number
 */
export function parseCurrency(value: string): number {
  return parseFloat(value.replace(/[^0-9.-]/g, '')) || 0
}

/**
 * Linear interpolation helper
 */
export function interpolate(x: number, x0: number, y0: number, x1: number, y1: number): number {
  if (x1 === x0) return y0
  return y0 + ((x - x0) * (y1 - y0)) / (x1 - x0)
}
