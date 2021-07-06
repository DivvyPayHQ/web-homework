import React, { Fragment } from 'react'
import { shape, string, bool, func, number } from 'prop-types'
import TrashIcon from 'Assets/TrashIcon'
import LoadingSpinner from 'Components/loader/Loader'
import * as COLORS from 'Config/colors'
import { baseButton } from 'Styles/button'
import { css } from '@emotion/core'

export default function RemoveButton ({ onClick, icon, text, width, loading, theme }) {
  const buttonWidth = width || (icon ? 95 : 65)
  return (
    <button css={containerStyles} onClick={onClick} style={{ width: buttonWidth }} type='button'>
      {
        !loading && (
          <Fragment>
            <p>{text}</p>
            {
              icon && (
                <div css={iconWrapperStyles}>
                  <TrashIcon />
                </div>
              )
            }
          </Fragment>
        )
      }
      {
        loading && (
          <div css={loadingWrapperStyles}>
            <LoadingSpinner
              color={COLORS.RED}
              pixelDiameter={20}
              pixelThickness={3}
              theme={theme}
            />
          </div>
        )
      }
    </button>
  )
}

const containerStyles = css`
  ${baseButton};
  background: transparent;
  color: ${COLORS.RED};
  border: solid 2px${COLORS.RED};
  padding: 4px 6px;
`

const loadingWrapperStyles = css`
  position: relative;
  margin: auto;
  top: -5px;
  left: -4px;
`

const iconWrapperStyles = css`
  position: relative;
  top: -5px;
  right: 3px;
  width: 12px;
  height: 12px;
`

RemoveButton.defaultProps = {
  icon: true,
  text: 'remove',
  width: undefined,
  loading: false
}

RemoveButton.propTypes = {
  theme: shape({
    type: string,
    background: string,
    secondary: string,
    color: string,
    accent: string,
    highlight: string
  }),
  onClick: func.isRequired,
  icon: bool,
  text: string,
  width: number,
  loading: bool
}
