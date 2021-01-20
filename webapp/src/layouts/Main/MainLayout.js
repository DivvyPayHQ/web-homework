import React from 'react'
import { PropTypes } from 'prop-types'
import { NavBar } from './NavBar'

export function MainLayout (props) {
  return (
    <div>
      <NavBar style={{ width: 50 }} />
      <div style={{ 'margin-left': 50, width: 'calc(100% - 50px)' }}>
        {props.children}
      </div>
    </div>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired
}
