// This is where all the utlity or helper functions go so they can easily be tested
export function calculateTotalValue (data) {
  if (!data) {
    return null
  }

  let total = 0
  let creditTotal = 0
  let debitTotal = 0
  data.forEach(t => {
    if (t.credit) {
      creditTotal += t.amount
    } else if (t.debit) {
      debitTotal -= t.amount
    }
  })

  total = creditTotal + debitTotal

  return {
    totalValue: total,
    creditTotal,
    debitTotal
  }
}

export function validateUploadedData (data) {
  let isValid = true
  if (!data || !data.length) {
    isValid = false
    return isValid
  }

  data.forEach(t => {
    // if any required fields on upload are null, return false
    if (
      t.amount === null ||
      t.category === null ||
      t.credit === null ||
      t.debit === null ||
      t.description === null ||
      t.merchant_id === null ||
      t.user_id === null
    ) {
      isValid = false
    }
  })

  return isValid
}

export function buildDataForChart (data) {
  if (!data || !data.length) {
    return null
  }

  const buildDataForChart = []
  const lookUpObj = {}
  data.forEach(({ amount, category, debit }) => {
    if (debit) {
      (lookUpObj[category] || (lookUpObj[category] = buildDataForChart[buildDataForChart.length] = { category, amount: 0 })).amount += +amount
    }
  }, [])

  return buildDataForChart
}
