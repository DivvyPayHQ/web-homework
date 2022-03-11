/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react'
import { CutomButtonStyles } from './custom-buttons-styles'
import { func } from 'prop-types'

export function Button ({ onClickfunction }) {
  const [isActive, setActive] = useState(false)
  const active = isActive ? 'active' : null
  const classes = `button3 button ${active}`

  function toggleClass () {
    onClickfunction()
    setActive(true)
  }

  return (
    <div css={CutomButtonStyles} onAnimationEnd={() => setActive(false)} onClick={toggleClass} >
      <div className='button button1'>
        <div className='button button2'>
          <div className={classes}>
            <div className='symbol'>+</div>
          </div>
        </div>
      </div>
    </div>
  )
}

Button.propTypes = {
  onClickfunction: func
}
