/* eslint-disable */
import _ from 'underscore'

export default function aggregator (type, data = []) {
  const groups = _(data).groupBy(function (d) {
    return type === 'date' ? d[type] : d[type].name
  })

  return _(groups).map((g, type) => {
    return {
      x: type,
      y: _(g).reduce((m, x) => {
        return m + x.amount
      }, 0)
    }
  })
}
