import { calculateTotalValue } from './utilities'

describe('calculateTotalValue', () => {
  it('Handles when nothing is passed into it', () => {
    expect(calculateTotalValue()).toEqual(null)
  })

  it('Calculates the data and returns an object', () => {
    const data = [{
      credit: true,
      debit: false,
      amount: 20
    },
    {
      credit: false,
      debit: true,
      amount: 10
    },
    {
      credit: true,
      debit: false,
      amount: 300
    },
    {
      credit: false,
      debit: true,
      amount: 30
    }]
    expect(calculateTotalValue(data)).toEqual({
      creditTotal: 320,
      debitTotal: -40,
      totalValue: 280
    })
  })
})
