export const getIsActive = (currentUrl, urlPattern) => {
  const removeQuery = urlPattern.split('?')[0]
  if (currentUrl === removeQuery) {
    return true
  }
  return false
}
