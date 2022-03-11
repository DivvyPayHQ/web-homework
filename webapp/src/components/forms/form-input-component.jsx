import React, { useEffect, useRef, useState } from 'react'
import { formInputStyle } from './form-input-styles.js'
import { func, string } from 'prop-types'

export function FormInput ({ handleChange, label, ...otherProps }) {
  const ref = useRef(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    setWidth(ref.current.offsetWidth)
  }, [])

  return (
    <div css={formInputStyle(width)} >
      <div className='group'>
        <input autoComplete='off' className={`form-input ${otherProps.name}`} onChange={handleChange} {...otherProps} />
        {label ? (
          <label
            className={`${
              otherProps.value.length ? 'shrink' : ''
            } form-input-label `}
            ref={ref}
          >
            {label}
          </label>
        ) : null}
      </div>
    </div>
  )
}

FormInput.propTypes = {
  handleChange: func,
  label: string,
  width: string
}
