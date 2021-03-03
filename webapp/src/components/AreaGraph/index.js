import React from 'react'
import { arrayOf, number, shape, string } from 'prop-types'
import { VictoryArea, VictoryContainer, VictoryChart, VictoryTheme } from 'victory'
import _ from 'underscore'

export default function AreaGraph ({ data }) {
  if (data.length === 1) data.splice(0, 0, { x: '-', y: 0 })
  else if (data.length === 0) data.push({ x: 'No Data', y: 1 })
  const sorted = _.sortBy(data, (obj) => obj.x)
  return (
    <VictoryChart theme={VictoryTheme.material} width={1000}>
      <VictoryArea
        containerComponent={<VictoryContainer responsive />}
        data={sorted}
        style={{ data: { fill: '#3f51b5' } }}
      />
    </VictoryChart>
  )
}

AreaGraph.propTypes = {
  data: arrayOf(shape({
    x: string.isRequired,
    y: number.isRequired
  }))
}
