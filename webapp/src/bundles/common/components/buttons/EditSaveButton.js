import React from 'react'
import { bool, func, shape, string } from 'prop-types'
import EditButton from 'Components/buttons/EditButton'
import SaveButton from 'Components/buttons/SaveButton'
import { css } from '@emotion/core'

export default function EditSaveButton ({ editing, loading, onEditClick, onSaveClick, theme }) {
  return (
    <div css={overflowWrapperStyles}>
      <div css={containerStyles}>
        {
          !editing && (
            <EditButton
              onClick={onEditClick}
              theme={theme}
            />
          )
        }
        {
          editing && (
            <SaveButton
              loading={loading}
              onClick={onSaveClick}
              theme={theme}
            />
          )
        }
      </div>
    </div>
  )
}

const overflowWrapperStyles = css`
  width: 65px;
  overflow: hidden;
`

const containerStyles = css`
  display: flex;
  width: 124px;
`

EditSaveButton.defaultProps = {
  editing: false,
  loading: false
}

EditSaveButton.propTypes = {
  editing: bool,
  loading: bool,
  onEditClick: func.isRequired,
  onSaveClick: func.isRequired,
  theme: shape({
    type: string,
    background: string,
    secondary: string,
    color: string,
    accent: string,
    highlight: string
  }) }
