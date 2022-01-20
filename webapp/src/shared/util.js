export const formatAmountFromFloat = a => {
  if (isNaN(a)) a = 0
  a = a.toFixed(2)

  return `$${a.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}

export const formatAmountFromInt = a => {
  if (isNaN(a)) a = 0
  a /= 100
  var amountString = a
    .toFixed(2)
    .toString()
    .split('.')
  var dollar = amountString[0]
  var cents = amountString[1]
  return `$${dollar}${cents !== '00' ? `.${cents}` : ``}`
}

export const formatDate = d => {
  let date = new Date(d)

  return (
    (date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) +
    '/' +
    (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) +
    '/' +
    date.getFullYear()
  )
}
