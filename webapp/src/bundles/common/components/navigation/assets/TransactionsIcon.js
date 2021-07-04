import React from 'react'
import { string } from 'prop-types'
import SVGIcon from '../../SVGIcon'
import * as COLORS from '../../../config/colors'

export default function TrafficIcon (props) {
  const { viewBox, width, color } = props
  return (
    <SVGIcon style={{ width }} viewBox={viewBox}>
      <g fill='none' fillRule='evenodd' id='Design' stroke='none' strokeWidth='1' xmlns='http://www.w3.org/2000/svg'>
        <g fill={color} id='Dashboard/Light' transform='translate(-16.000000, -335.000000)'>
          <g id='Navigation'>
            <g id='Traffic' transform='translate(16.000000, 335.605133)'>
              <path d='M22.9583333,19.2840762 C20.8195833,19.2840762 18.9527083,20.3989369 17.8785,22.0706253 L11.407875,18.3825457 C11.8259583,17.5629724 12.0833333,16.6493893 12.0833333,15.6683119 C12.0833333,15.0620688 11.966125,14.4883675 11.799375,13.9363608 L18.531,10.1000349 C19.6342083,11.2932371 21.202625,12.0525476 22.9583333,12.0525476 C26.29575,12.0525476 29,9.35518749 29,6.02627382 C29,2.69736016 26.29575,0 22.9583333,0 C19.6209167,0 16.9166667,2.69736016 16.9166667,6.02627382 C16.9166667,6.63251697 17.033875,7.20621824 17.200625,7.75943018 L10.469,11.5945508 C9.36579167,10.4025539 7.797375,9.64203812 6.04166667,9.64203812 C2.70425,9.64203812 0,12.3393983 0,15.6683119 C0,18.9972256 2.70425,21.6945858 6.04166667,21.6945858 C7.41916667,21.6945858 8.674625,21.2173049 9.69083333,20.4435313 L16.983125,24.6595125 C16.9589583,24.8764583 16.9166667,25.0861727 16.9166667,25.3103501 C16.9166667,28.6392637 19.6209167,31.3366239 22.9583333,31.3366239 C26.29575,31.3366239 29,28.6392637 29,25.3103501 C29,21.9814364 26.29575,19.2840762 22.9583333,19.2840762' id='Traffic-Icon' />
            </g>
          </g>
        </g>
      </g>
    </SVGIcon>
  )
}

TrafficIcon.defaultProps = {
  viewBox: '0 0 29 32',
  width: '100%',
  color: COLORS.WHITE
}

TrafficIcon.propTypes = {
  viewBox: string,
  width: string,
  color: string
}
