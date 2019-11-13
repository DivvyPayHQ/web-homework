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
