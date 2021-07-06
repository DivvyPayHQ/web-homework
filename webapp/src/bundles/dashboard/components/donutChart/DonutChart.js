import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { draw } from './misc/draw'


export default class DonutChart extends PureComponent {
  constructor (props) {
    super(props)
    const { top, right, bottom, left } = this.props
    this.identifier = 'donutChart'
    this.margin = {
      top,
      right,
      bottom,
      left
    }
  }

  componentDidMount () {
    this.draw()
  }

  draw = () => {
    const { data, theme, onHover, centerValue } = this.props
    draw({
      identifier: this.identifier,
      margin: this.margin,
      theme
    }, {
      data,
      onHover,
      centerValue
    })
  };

  render () {
    return (
      <div style={{ position: 'relative', height: '100%', width: '100%' }}>
        <div className='centerValue' />
        <div className={this.identifier} style={{ height: '100%', width: '100%' }} />
      </div>
    )
  }
}

DonutChart.defaultProps = {
  data: [],
  top: 0,
  right: 0,
  left: 0,
  bottom: 0,
  onHover: undefined,
  centerValue: undefined
}

DonutChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()),
  theme: PropTypes.shape().isRequired,
  top: PropTypes.number,
  right: PropTypes.number,
  left: PropTypes.number,
  bottom: PropTypes.number,
  onHover: PropTypes.func,
  centerValue: PropTypes.string
}
