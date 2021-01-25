const romanDictionary = {
  1: 'I',
  5: 'V',
  10: 'X',
  50: 'L',
  100: 'C',
  500: 'D',
  1000: 'M'
};

function isInt(value) {
  return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}

export const convertToRoman = int => {
  if (!isInt(int)) throw new Error('Non integer provided as argument to "convertToRoman"');
  if (int > 3999) throw new Error('There is no valid Roman numeral to represent numbers greater than 3999')
  const parsed = parseInt(int) // parseInt here takes '03' (from say 103) to 3
  const numbers = Object.keys(romanDictionary);
  let nextHighest, nextLowest
  numbers.some((num, index) => {
    if (num >= parsed) {
      nextHighest = num;
      nextLowest = numbers[index - 1];
      return true;
    }
  })
  if (!nextHighest) { // over 1000
    nextLowest = '1000'
  }
  // the equality operator is used here (rather than identity) because the nextHighest/nextLowest are strings from object.keys()
  if (nextHighest == parsed) return romanDictionary[nextHighest]; // 1 is 1
  const sub = `${parsed}`.substring('1');
  return `${repeatQuantity(parsed, nextLowest, nextHighest)}${parseInt(sub) ? convertToRoman(sub) : ''}`; // sub might be 0 (e.g., 40)
};

const repeatQuantity = (int, low, high) => {
  const one = low.includes('1')
  const quantity = one
    ? Math.floor(int / low) // 42/10 -> 4
    : `${int}`[0] - low[0]; // 6-5
  if (quantity < 4) { // 3
    return one
      ? romanDictionary[low].repeat(quantity) // III
      : `${romanDictionary[low]}${romanDictionary[low.replace('5', '1')].repeat(quantity)}` // VII
  } else { // 40 is a good example
    const countFromHigher = one
      ? high[0] - `${int}`[0] // 50 - 40 gives us 1
      : 10 - `${int}`[0] // 10 - 9 gives us 1
    return one
      ? `${romanDictionary[low].repeat(countFromHigher)}${romanDictionary[high]}` // IV
      : `${romanDictionary[low.replace('5', '1')].repeat(countFromHigher)}${romanDictionary[high]}` // IX
  }
}