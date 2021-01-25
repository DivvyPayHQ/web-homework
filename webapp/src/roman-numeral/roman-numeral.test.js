import {convertToRoman} from './roman-numeral'

const data = [
  [1, 'I'],
  [2, 'II'],
  [3, 'III'],
  [4, 'IV'],
  [5, 'V'],
  [6, 'VI'],
  [11, 'XI'],
  [12, 'XII'],
  [14, 'XIV'],
  [103, 'CIII'],
  [9, 'IX'],
  [115, 'CXV'],
  [19, 'XIX'],
  [36, 'XXXVI'],
  [40, 'XL'],
  [49, 'XLIX'],
  [90, 'XC'],
  [93, 'XCIII'],
  [99, 'XCIX'],
  [3724, 'MMMDCCXXIV'],
  [2864, 'MMDCCCLXIV'],
  [492, 'CDXCII'],
];

test.each(data)('roman numeral: %i to %s', (a, b) => {
  expect(convertToRoman(a)).toBe(b);
})