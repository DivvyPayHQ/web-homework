export const romanNumeralConverter = (num) => {
  let numberFound = false
  let numberArray = ''
  let buildNumber = ''

  if (typeof num === 'boolean') {
    return num
  }
  if (typeof num === 'number') {
    buildNumber = ConvertNumber(Math.round(num))
  } else if (typeof num === 'string') {
    for (var i = 0; i < num.length; i++) {
      if (parseInt(num[i]) || num[i] === '0') {
        numberFound = true
        numberArray += num[i]
        if (i === num.length - 1) {
          buildNumber += ConvertNumber(numberArray)
        }
      } else {
        if (numberFound) {
          numberFound = false
          buildNumber += ConvertNumber(numberArray)
          numberArray = ''
        }
        if (!parseInt(num[i])) {
          buildNumber += num[i]
        }
      }
    }
  }

  return buildNumber

  function ConvertNumber (number) {
    const values = { m: 1000000, d: 500000, c: 100000, l: 50000, x: 10000, M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 }
    let [roman, finalNumber] = ['', '']
    let intNumberArray = parseInt(number)
    for (let j in values) {
      while (intNumberArray >= values[j]) {
        roman += j
        intNumberArray -= values[j]
      }
    }
    finalNumber += roman
    return finalNumber
  }
}
