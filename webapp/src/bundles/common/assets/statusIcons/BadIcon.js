import React from 'react'
import { string } from 'prop-types'
import SVGIcon from 'Components/SVGIcon'
import * as COLORS from 'Config/colors'

export default function BadIcon (props) {
  const { viewBox, width, color } = props
  return (
    <SVGIcon style={{ width, stroke: color }} viewBox={viewBox}>
      <g fill='none' fillRule='evenodd' id='Design' stroke='inherit' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1'>
        <g id='Inventory/Management' stroke='inherit' strokeWidth='2' transform='translate(-713.000000, -610.000000)'>
          <g id='Inventory' transform='translate(229.000000, 389.000000)'>
            <g id='Items' transform='translate(18.000000, 77.000000)'>
              <g id='Item' transform='translate(0.000000, 133.000000)'>
                <g id='Available' transform='translate(467.000000, 12.000000)'>
                  <g id='status/bad' transform='translate(0.690909, 0.000000)'>
                    <path d='M8.5,17 C13.1944204,17 17,13.1944204 17,8.5 C17,3.80557963 13.1944204,0 8.5,0 C3.80557963,0 0,3.80557963 0,8.5 C0,13.1944204 3.80557963,17 8.5,17 Z M8.5,8.5 L11.7784042,5.22159583 L8.5,8.5 L5.22159583,5.22159583 L8.5,8.5 Z M8.5,8.5 L5.22159583,11.7784042 L8.5,8.5 L11.7784042,11.7784042 L8.5,8.5 Z' id='Icon' />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </SVGIcon>
  )
}

BadIcon.defaultProps = {
  viewBox: '0 0 20 20',
  width: '100%',
  color: COLORS.RED
}

BadIcon.propTypes = {
  viewBox: string,
  width: string,
  color: string
}
