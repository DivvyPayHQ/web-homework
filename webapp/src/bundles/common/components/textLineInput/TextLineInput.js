import React from 'react'
import PropTypes from 'prop-types'
import * as COLORS from 'Config/colors'
import { css } from '@emotion/core'
import { baseInput } from 'Styles/input'
import { baseLabel } from 'Styles/text'

export default function TextLineInput (props) {
  const { label, value, name, onChange, error, theme, placeHolder, type, max } = props
  return (
    <div css={containerStyles}>
      {
        label && (
          <div css={headerStyles} style={{ background: theme.secondary }}>
            <p style={{ color: error ? COLORS.RED : theme.color }}>{label}</p>
            {
              error && error !== true && (
                <p style={{ color: COLORS.RED, marginLeft: '10px' }}>{`(${error})`}</p>
              )
            }
          </div>
        )
      }
      <input
        css={error ? inputErrorStyles : baseInput}
        maxLength={max}
        name={name}
        onChange={onChange}
        placeholder={placeHolder}
        style={{ color: theme.color, background: theme.background }}
        type={type}
        value={value}
      />
    </div>
  )
}

const containerStyles = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const headerStyles = css`
  display: flex;

  p {
    ${baseLabel};
    width: auto;
  }
`

const inputErrorStyles = css`
  ${baseInput};
  border-color: ${COLORS.RED};
`

TextLineInput.defaultProps = {
  error: null,
  placeHolder: '',
  max: null,
  type: null
}

TextLineInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  theme: PropTypes.shape().isRequired,
  error: PropTypes.string,
  placeHolder: PropTypes.string,
  type: PropTypes.string,
  max: PropTypes.number
}
