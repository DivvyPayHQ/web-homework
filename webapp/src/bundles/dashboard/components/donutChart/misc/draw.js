import * as d3 from 'd3'

export const draw = (meta, content, initial = false) => {
  const { identifier, margin } = meta
  const { data } = content

  const container = d3.select(`.${identifier}`)
  container.select('svg').remove()

  const pie = d3.pie().value((datum) => { return datum.value })
  const preparedData = pie(data)

  const width = document.getElementsByClassName(identifier)[0].clientWidth - margin.left - margin.right
  const height = document.getElementsByClassName(identifier)[0].clientHeight - margin.top - margin.bottom

  const smallest = Math.min(height, width)
  const outerRadius = smallest / 2
  const innerRadius = smallest / 4

  const arc = d3.arc()
    .outerRadius(outerRadius)
    .innerRadius(innerRadius)

  const svg = d3.select(`.${identifier}`)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('class', 'shadow')
    .append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`)

  function centerLabel (data) {
    const centerValueText = d3.select('.centerValue')

    if (data) {
      centerValueText.html(`$${data.value}`)
        .style('display', 'block')
        .style('position', 'absolute')
        .style('color', data.color)

      const textHeight = document.getElementsByClassName('centerValue')[0].clientHeight
      const textWidth = document.getElementsByClassName('centerValue')[0].clientWidth

      centerValueText
        .style('top', `${(height / 2) - (textHeight / 2)}px`)
        .style('left', `${(width / 2) - (textWidth / 2)}px`)
    } else {
      centerValueText.html('')
    }
  }

  function onMouseEnterHandler (d, i) {
    centerLabel(i.data)
  }

  function onMouseLeaveHandler (d, i) {
    centerLabel(null)
  }

  const dataPath = svg.selectAll('path')
    .data(preparedData)
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', (d) => { return d.data.color })
    .on('mouseout', onMouseLeaveHandler)
    .on('mouseenter', onMouseEnterHandler)

  dataPath.transition()
    .duration(1000)
    .attrTween('d', (d) => {
      const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d)
      return (t) => { return arc(interpolate(t)) }
    })
}
