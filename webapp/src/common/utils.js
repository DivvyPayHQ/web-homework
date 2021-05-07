const $ = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })

export const formatCurrency = amount => $.format(amount)

export const initialCaps = str => str[0].toUpperCase() + str.slice(1)

const romanNumbers = [{ s: 'M', n: 1000 }, { s: 'D', n: 500 }, { s: 'C', n: 100 }, { s: 'L', n: 50 }, { s: 'X', n: 10 }, { s: 'IX', n: 9 }, { s: 'V', n: 5 }, { s: 'IV', n: 4 }, { s: 'I', n: 1 }]
export const convertToRomanNumeral = (num) => {
  const output = romanNumbers.reduce((acc, romanNumber) => {
    const count = Math.floor(acc.num / romanNumber.n)
    return { str: acc.str + (romanNumber.s).repeat(count), num: (acc.num - (count * romanNumber.n)) }
  }, { str: '', num })
  return output.str
}
