export const gibberishConverter = (string, enabled) => {
  let gibberish = ''
  let koreanAlphabet = ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ', 'ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ']
  if (!enabled) {
    return string
  }
  if (typeof string === 'boolean') {
    return string
  }
  if (typeof string === 'string') {
    for (var i = 0; i < string.length; i++) {
      if (parseInt(string[i]) || string[i] === '0') {
        gibberish += string[i]
      } else {
        gibberish += koreanAlphabet[Math.floor(Math.random() * koreanAlphabet.length)]
      }
    }
  }
  if (typeof string === 'number') {
    return string
  }
  return gibberish
}
