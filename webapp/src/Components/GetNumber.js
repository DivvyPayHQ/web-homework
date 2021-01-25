const ToRomanNumerals = inputNumber => {
  const numToRoman = {
    1: 'I',
    4: 'IV',
    5: 'V',
    9: 'IX',
    10: 'X',
    40: 'XL',
    50: 'L',
    90: 'XC',
    100: 'C',
    400: 'CD',
    500: 'D',
    900: 'CM',
    1000: 'M'
  }

  const numberOrder = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]

  let romanNumeral = ''
  numberOrder.map(num => {
    if (inputNumber !== 0) {
      let numberOfTimesToPrint = Math.floor(inputNumber / num)

      if (numberOfTimesToPrint !== 0) {
        for (let i = 0; i < numberOfTimesToPrint; i++) {
          romanNumeral += numToRoman[num]
        }
      }
      inputNumber = inputNumber % num
    }
  })
  return romanNumeral
}

const GetNumber = (numberType, number) => {
  var convertedNumber = numberType === 'RN' ? ToRomanNumerals(number) : number
  return convertedNumber
}

export default GetNumber
