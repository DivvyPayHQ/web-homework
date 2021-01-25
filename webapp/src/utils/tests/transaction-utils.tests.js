import { getTotal } from '../transaction-utils'

describe('transaction utilility tests', () => {
  it('gets the total of a list of rows', () => {
    const rows = [
      { amount: 5 },
      { amount: 32.5 },
      { amount: 456.1 }
    ]
    const total = getTotal(rows)
    expect(total).toEqual(493.6)
  })
})
