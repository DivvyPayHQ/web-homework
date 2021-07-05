export function cleanEnum (value) {
  if (value) {
    return value.toString().split('_').join(' ').toLowerCase()
  }
  return ''
}
