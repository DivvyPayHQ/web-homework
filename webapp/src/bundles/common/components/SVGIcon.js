import React from 'react'
import { string, node } from 'prop-types'

export default function SVGIcon (props) {
  const { children, viewBox, ...other } = props
  return (
    <svg {...other} viewBox={viewBox}>
      {children}
    </svg>
  )
}

SVGIcon.defaultProps = {
  viewBox: '0 0 24 24'
}

SVGIcon.propTypes = {
  children: node.isRequired,
  viewBox: string
}
