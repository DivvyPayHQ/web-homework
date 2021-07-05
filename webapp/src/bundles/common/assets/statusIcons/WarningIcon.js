import React from 'react'
import { string } from 'prop-types'
import SVGIcon from 'Components/SVGIcon'
import * as COLORS from 'Config/colors'

export default function WarningIcon (props) {
  const { viewBox, height, width, color } = props
  return (
    <SVGIcon style={{ height, width, stroke: color }} viewBox={viewBox} {...props}>
      <g fill='none' fillRule='evenodd' id='Design' stroke='inherit' strokeWidth='1' xmlns='http://www.w3.org/2000/svg'>
        <g id='Inventory/Management' stroke='inherit' transform='translate(-613.000000, -610.000000)'>
          <g id='Inventory' transform='translate(229.000000, 389.000000)'>
            <g id='Items' transform='translate(18.000000, 77.000000)'>
              <g id='Item' transform='translate(0.000000, 133.000000)'>
                <g id='Price' transform='translate(368.000000, 13.000000)'>
                  <g id='status/warning'>
                    <g id='Icon'>
                      <circle cx='8.5' cy='8.5' id='Oval' r='8.5' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2.4' />
                      <circle cx='8.5' cy='12.547619' fill='#FFC25E' id='Oval' r='1' strokeWidth='0.8' />
                      <path d='M8.5,4.04761905 L8.5,9.30952381' id='Line' strokeLinecap='round' strokeWidth='2.4' />
                    </g>
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

WarningIcon.defaultProps = {
  viewBox: '0 0 20 20',
  height: '100%',
  width: '100%',
  color: COLORS.YELLOW
}

WarningIcon.propTypes = {
  viewBox: string,
  height: string,
  width: string,
  color: string
}
