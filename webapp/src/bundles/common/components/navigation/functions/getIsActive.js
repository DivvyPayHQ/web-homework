export const getIsActive = (currentUrl, urlPattern) => {
  const removeQuery = urlPattern.split('?')[0]
  const removeSlash = removeQuery.replace('/', '')
  const parts = currentUrl.split('/')
  if (parts.includes(removeSlash)) {
    return true
  }
  return false
}
