import React from 'react'
import { formInputStyle } from './form-input-styles.js'
import { func, string } from 'prop-types'

const FormInput = ({ handleChange, label, width, ...otherProps }) => (
  <div css={formInputStyle(width)} >
    <div className='group'>
      <input autoComplete='off' className={`form-input ${otherProps.name}`} onChange={handleChange} {...otherProps} />
      {label ? (
        <label
          className={`${
            otherProps.value.length ? 'shrink' : ''
          } form-input-label `}
        >
          {label}
        </label>
      ) : null}
    </div>
  </div>
)

FormInput.propTypes = {
  handleChange: func,
  label: string,
  width: string
}

export default FormInput
