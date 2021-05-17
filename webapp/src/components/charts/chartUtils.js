const txTotal = (acc, tx) => acc + tx.amount

export const aggregateData = (transactions) => {
  const dataMap = {}
  let total = transactions.reduce(txTotal, 0)

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
  const other = []

  for (const key in dataMap) {
    const percent = dataMap[key] / total
    if (percent > 0.02) {
      dataList.push({
        name: key,
        value: dataMap[key],
        percent: dataMap[key] / total
      })
    } else {
      other.push({
        name: key,
        value: dataMap[key],
        percent: dataMap[key] / total
      })
    }
  }

  const otherTotal = other.reduce((acc, tx) => acc + tx.value, 0)

  dataList.sort((a, b) => b.value - a.value)

  if (otherTotal > 0) {
    dataList.push({
      name: 'Other',
      value: otherTotal,
      percent: otherTotal / total
    })
  }

  return { data: dataList, other, otherTotal, total }
}
