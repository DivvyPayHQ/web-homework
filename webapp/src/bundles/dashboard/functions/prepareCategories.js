
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
  const combined = transactions.reduce((merged, { category, amount }) => {
    merged[category] = merged[category] || []
    merged[category].push(amount)
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
