export const prepareCategories = (transactions, colors) => {
  const combined = combine(transactions)
  return mapColors(combined, colors)
}

const mapColors = (combined, colors) => {
  return combined.map((category) => {
    category['color'] = colors[category.label]
    return category
  })
}

const combine = (transactions) => {
  const combined = transactions.reduce((merged, { label, value }) => {
    merged[label] = merged[label] || []
    merged[label].push(value)
    return merged
  }, {})

  const result = []
  Object.keys(combined).forEach((key) => {
    const total = combined[key].reduce((total, current) => {
      return total + current
    }, 0)
    result.push({
      label: key,
      value: total
    })
  })
  return result

}
