import React from 'react'
import { arrayOf, number, shape, string } from 'prop-types'
import { VictoryContainer, VictoryPie } from 'victory'

export default function PieGraph ({ data }) {
  if (data.length === 0) data.push({ x: 'No Data', y: 1 })
  return (
    <VictoryPie
      colorScale='cool'
      containerComponent={<VictoryContainer responsive />}
      data={data}
    />
  )
}

PieGraph.propTypes = {
  data: arrayOf(shape({
    x: string.isRequired,
    y: number.isRequired
  }))
}
