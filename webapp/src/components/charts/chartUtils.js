export const aggregateData = (transactions) => {
  const dataMap = {}

  transactions.forEach(tx => {
    const { description, amount } = tx
    const dataKey = description.toLowerCase()
    if (dataMap[dataKey]) {
      dataMap[dataKey] += amount
    } else {
      dataMap[dataKey] = amount
    }
  })

  const dataList = []

  for (const key in dataMap) {
    dataList.push({ name: key, value: dataMap[key] })
  }

  return dataList.sort((a, b) => b.value - a.value)
}
