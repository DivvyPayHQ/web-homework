import React from 'react'
import { string } from 'prop-types'
import SVGIcon from '../components/SVGIcon'
import * as COLORS from '../config/colors'

export default function XIcon (props) {
  const { viewBox, width, fill } = props
  return (
    <SVGIcon style={{ width }} viewBox={viewBox}>
      <g fill='none' fillRule='evenodd' id='Latest' stroke='none' strokeWidth='1' xmlns='http://www.w3.org/2000/svg'>
        <g id='Inventory/Management' transform='translate(-760.000000, -329.000000)'>
          <g id='Modal' transform='translate(404.000000, 254.000000)'>
            <g id='Product' transform='translate(207.000000, 55.000000)'>
              <g id='Images'>
                <g id='Big-Image' transform='translate(0.000000, 20.000000)'>
                  <g id='Plus-Icon' transform='translate(149.000000, 0.000000)'>
                    <circle cx='9' cy='9' fill={fill} id='Oval' r='9' />
                    <path d='M9,9 L4,9 L9,9 L9,4 L9,9 Z M9,9 L14,9 L9,9 L9,14 L9,9 Z' id='Icon' stroke='#FFFFFF' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.96' />
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

XIcon.defaultProps = {
  viewBox: '0 0 21 21',
  width: '100%',
  fill: COLORS.GRAY_LIGHT
}

XIcon.propTypes = {
  viewBox: string,
  width: string,
  fill: string
}
