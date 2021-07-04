import React from 'react'
import PropTypes from 'prop-types'
import PlusIcon from '../../assets/XIcon'
import * as COLORS from '../../config/colors'
import { css } from '@emotion/core'
import { baseButton } from '../../styles/button'

export default function NewButton (props) {
  const { onClick, text, color } = props
  return (
    <button css={container} onClick={onClick} style={{ background: color }} type='button'>
      <p className='text'>{text}</p>
      <div className='icon-wrapper'>
        <PlusIcon fill='transparent' />
      </div>
    </button>
  )
}

const container = css`
  ${baseButton};
  
  .text {
    position: relative;
    bottom: 1px;
  }
  
  .icon-wrapper {
    position: relative;
    left: 5px;
    width: 21px;
    height: 21px;
  }
`

NewButton.defaultProps = {
  text: 'new',
  color: COLORS.GREEN
}

NewButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string,
  color: PropTypes.string
}
