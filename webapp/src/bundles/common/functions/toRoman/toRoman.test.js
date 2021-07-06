import { toRoman } from './toRoman'

describe('toRoman Function', () => {
  it('9 Should return IX ', () => {
    expect(toRoman(9)).toBe('IX')
  })

  it('7 Should return XII ', () => {
    expect(toRoman(7)).toBe('VII')
  })

  it('2340 Should return MMCCCXL', () => {
    expect(toRoman(2340)).toBe('MMCCCXL')
  })
})
