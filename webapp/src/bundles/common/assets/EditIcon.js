import React from 'react'
import { string } from 'prop-types'
import SVGIcon from 'Components/SVGIcon'
import * as styles from 'Config/colors'

export default function EditIcon (props) {
  const { viewBox, height, width, color } = props
  return (
    <SVGIcon height={height} viewBox={viewBox} width={width} {...props}>
      <g fill='none' fillRule='evenodd' id='Design' stroke='none' strokeWidth='1' xmlns='http://www.w3.org/2000/svg'>
        <g fill={color} id='Inventory/Upload' transform='translate(-1245.000000, -773.000000)'>
          <g id='Product-Detail' transform='translate(838.000000, 389.000000)'>
            <g id='Right-Column' transform='translate(290.000000, 54.000000)'>
              <g id='Price' transform='translate(0.000000, 329.000000)'>
                <g id='EditIcon/Blue' transform='translate(115.000000, 0.000000)'>
                  <path d='M12.6,4.81652631 L8.4,4.81652631 L8.4,2.06422556 C8.3783,1.38440728 8.4147,1.35413197 9.1,1.37615038 L11.9,1.37615038 C12.586,1.3809669 12.6028,1.35344389 12.6,2.06422556 L12.6,4.81652631 L12.6,4.81652631 Z M12.6,15.1376541 C11.1622,15.1369661 8.8074,15.1376541 8.4,15.1376541 L8.4,6.19267669 L12.6,6.19267669 L12.6,15.1376541 L12.6,15.1376541 Z M10.5,20.1310158 L8.4,16.5138045 L12.6,16.5138045 L10.5,20.1310158 L10.5,20.1310158 Z M12.6,0 L8.4,0 C7.553,0 7,0.536010571 7,1.37615038 L7,16.6603645 L9.8,21.5195515 C10.2228,22.1601495 10.7772,22.1601495 11.2,21.5195515 L14,16.6603645 L14,1.37615038 C14,0.536010571 13.447,0.000688075188 12.6,0 L12.6,0 Z' id='Edit-Icon' transform='translate(10.500000, 11.000000) rotate(45.000000) translate(-10.500000, -11.000000) ' />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </SVGIcon>
  )
}

EditIcon.defaultProps = {
  viewBox: '0 0 19 18',
  height: '100%',
  width: '100%',
  color: styles.WHITE
}

EditIcon.propTypes = {
  viewBox: string,
  height: string,
  width: string,
  color: string
}
