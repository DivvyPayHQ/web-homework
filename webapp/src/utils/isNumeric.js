export const isNumeric = (string) => {
  return !isNaN(string) && !isNaN(parseFloat(string))
}
