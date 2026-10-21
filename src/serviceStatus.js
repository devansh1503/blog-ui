let unavailable = false
const listeners = new Set()

export function markServiceUnavailable() {
  if (unavailable) return
  unavailable = true
  listeners.forEach((listener) => listener())
}

export function subscribeToServiceStatus(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function isServiceUnavailable() {
  return unavailable
}
