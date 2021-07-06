const numerals = [
  {
    character: 'M',
    value: 1000
  },
  {
    character: 'CM',
    value: 900
  },
  {
    character: 'D',
    value: 500
  },
  {
    character: 'CD',
    value: 400
  },
  {
    character: 'C',
    value: 100
  },
  {
    character: 'XC',
    value: 90
  },
  {
    character: 'L',
    value: 50
  },
  {
    character: 'XL',
    value: 40
  },
  {
    character: 'X',
    value: 10
  },
  {
    character: 'IX',
    value: 9
  },
  {
    character: 'V',
    value: 5
  },
  {
    character: 'IV',
    value: 4
  },
  {
    character: 'I',
    value: 1
  }
]

export function toRoman (number) {
  let result = ''
  for (let i = 0; i < numerals.length; i += 1) {
    const roman = numerals[i]
    let multiple = Math.floor(number / roman.value)
    number -= multiple * roman.value
    result += roman.character.repeat(multiple)
  }
  return result
}
