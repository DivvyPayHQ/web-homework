import React from 'react'
import PropTypes from 'prop-types'
import LoadingSpinner from 'Components/loader/Loader'
import * as COLORS from 'Config/colors'
import { baseButton } from 'Styles/button'
import { css } from '@emotion/core'

export default function SaveButton (props) {
  const { onClick, loading } = props
  return (
    <button
      css={loading ? inactiveStyles : containerStyles}
      disabled={loading}
      onClick={onClick}
      type='button'
    >
      {
        loading && (
          <div css={loadingWrapperStyles}>
            <LoadingSpinner
              color={COLORS.WHITE}
              pixelDiameter={20}
              pixelThickness={3}
              theme={{ color: COLORS.WHITE }}
            />
          </div>
        )
      }
      {
        !loading && <p>save</p>
      }
    </button>
  )
}

const containerStyles = css`
  ${baseButton};
  
  background: ${COLORS.GREEN};
  width: 62px;
  justify-content: center;
`

const loadingWrapperStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: -5px;
  left: -4px;
`

const inactiveStyles = css`
  ${containerStyles};

  cursor: default;
  &:hover {
    opacity: 1;
  }
`

SaveButton.defaultProps = {
  loading: false
}

SaveButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  loading: PropTypes.bool
}
