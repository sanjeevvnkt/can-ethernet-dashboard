export function formatUptime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600)
    .toString()
    .padStart(2, '0')
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, '0')
  const seconds = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}

export function formatClock(timestamp) {
  return new Date(timestamp).toLocaleTimeString('en-GB', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    fractionalSecondDigits: 3,
  })
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export function toHexByte(value) {
  return value.toString(16).toUpperCase().padStart(2, '0')
}

export function encodeLittleU16(value) {
  const n = Math.max(0, Math.round(value)) & 0xffff
  return [n & 0xff, (n >> 8) & 0xff]
}

export function formatNumber(value, digits = 0) {
  return Number(value).toLocaleString('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
}
