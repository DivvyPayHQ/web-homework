export const sortRows = ({ sortField, sortAsc = true, sortType, rows }) => {
  const sortMultiplier = sortAsc ? 1 : -1
  return [...rows].sort((a, b) => {
    let aValue = a[sortField]
    let bValue = b[sortField]

    // strings
    if (sortType === 'string') {
      if (aValue.toLowerCase() > bValue.toLowerCase()) {
        return sortMultiplier
      } else if (aValue.toLowerCase() < bValue.toLowerCase()) {
        return -sortMultiplier
      } else {
        return 0
      }
    }

    // Dates
    if (sortType === 'date') {
      aValue = new Date(aValue).getTime()
      bValue = new Date(bValue).getTime()
    }

    if (aValue > bValue) {
      return sortMultiplier
    } else if (aValue < bValue) {
      return -sortMultiplier
    } else {
      return 0
    }
  })
}
