import {
  calculateTotalValue,
  validateUploadedData
} from './utilities'

describe('calculateTotalValue function', () => {
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

describe('validateUploadedData function', () => {
  it('Handles when nothing is passed into it', () => {
    expect(validateUploadedData()).toEqual(false)
  })

  it('Iterates the data and returns true if valid', () => {
    const data = [{
      credit: true,
      debit: false,
      amount: 20,
      category: 'income',
      description: 'paycheck',
      merchant_id: 123,
      user_id: 321
    }]
    expect(validateUploadedData(data)).toEqual(true)
  })

  it('Iterates the data and returns false if any of the values are null or empty', () => {
    const data = [{
      credit: true,
      debit: null,
      amount: 20,
      category: null,
      description: 'paycheck',
      merchant_id: 123,
      user_id: 321
    }]
    expect(validateUploadedData(data)).toEqual(false)
  })
})
