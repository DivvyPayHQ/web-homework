import React from 'react'
import { bool, func } from 'prop-types'
import EditButton from 'Components/buttons/EditButton'
import SaveButton from 'Components/buttons/SaveButton'
import { CSSTransition } from 'react-transition-group'
import { css } from '@emotion/core'

export default function EditSaveButton ({ editing, loading, onEditClick, onSaveClick, theme }) {
  return (
    <div css={overflowWrapperStyles}>
      <div css={containerStyles}>
        <CSSTransition
          classNames={{
            enter: editEnter,
            enterActive: editEnterActive,
            exit: editExit,
            exitActive: editExitActive
          }}
          in={!editing}
          timeout={600}
          unmountOnExit
        >
          <EditButton
            onClick={onEditClick}
            theme={theme}
          />
        </CSSTransition>
        <CSSTransition
          classNames={{
            enter: saveEnter,
            enterActive: saveEnterActive,
            exit: saveExit,
            exitActive: saveExitActive
          }}
          in={editing}
          timeout={600}
          unmountOnExit
        >
          <SaveButton
            loading={loading}
            onClick={onSaveClick}
            theme={theme}
          />
        </CSSTransition>
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

const editEnter = css`
  transform: translateX(-100%);
  transition-delay: 300ms;
`
const editEnterActive = css`
  transform: translateX(0);
  transition: transform 300ms ease-in-out;
  transition-delay: 300ms;
`
const editExit = css`
  transform: translateX(0);

`
const editExitActive = css`
  transform: translateX(-100%);
  transition: transform 300ms ease-in-out;
`

const saveEnter = css`
  transform: translateX(-200%);
  transition-delay: 600ms;
`

const saveEnterActive = css`
  transform: translateX(-100%);
  transition: transform 300ms ease-in-out;
  transition-delay: 300ms;
`

const saveExit = css`
  transform: translateX(-100%);
`

const saveExitActive = css`
  transform: translateX(-200%);
  transition: transform 300ms ease-in-out;
`

EditButton.defaultProps = {
  editing: false,
  loading: false
}

EditButton.propTypes = {
  editing: bool,
  loading: bool,
  onEditClick: func.isRequired,
  onSaveClick: func.isRequired
}
