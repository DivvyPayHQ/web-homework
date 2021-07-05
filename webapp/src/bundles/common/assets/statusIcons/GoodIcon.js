import React from 'react'
import { string } from 'prop-types'
import SVGIcon from 'Components/SVGIcon'
import * as COLORS from 'Config/colors'

export default function GoodIcon (props) {
  const { viewBox, height, width, color } = props
  return (
    <SVGIcon style={{ height, width, stroke: color }} viewBox={viewBox} {...props}>
      <g fill='none' fillRule='evenodd' id='Design' stroke='inherit' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1'>
        <g id='Inventory/Management' stroke='inherit' strokeWidth='2' transform='translate(-714.000000, -654.000000)'>
          <g id='Inventory' transform='translate(229.000000, 389.000000)'>
            <g id='Items' transform='translate(18.000000, 77.000000)'>
              <g id='Item' transform='translate(0.000000, 176.000000)'>
                <g id='Available' transform='translate(468.000000, 13.000000)'>
                  <path d='M8.5,17 C13.1944204,17 17,13.1944204 17,8.5 C17,3.80557963 13.1944204,0 8.5,0 C3.80557963,0 0,3.80557963 0,8.5 C0,13.1944204 3.80557963,17 8.5,17 Z M4.25,8.37189634 L7.4954544,11.5909091 L12.1318188,5.87272757' id='Icon' />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </SVGIcon>
  )
}

GoodIcon.defaultProps = {
  viewBox: '0 0 20 20',
  height: '100%',
  width: '100%',
  color: COLORS.GREEN
}

GoodIcon.propTypes = {
  viewBox: string,
  height: string,
  width: string,
  color: string
}
