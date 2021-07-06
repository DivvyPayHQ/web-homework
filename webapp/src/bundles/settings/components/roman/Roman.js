import React from 'react'
import { shape, string, func, bool } from 'prop-types'
import { connect } from 'react-redux'
import Switch from 'Components/switch/Switch'
import { selectViewState } from 'Reducers/AppReducer'
import { toggleRoman } from 'Actions/toggleRoman'
import { css } from '@emotion/core'

function Roman ({ theme, toggleRoman, roman }) {
  return (
    <div css={containerStyles}>
      <p css={labelStyles} style={{ color: theme.color }}>Roman Numerals</p>
      <Switch
        on={roman}
        onClick={toggleRoman}
        theme={theme}
      />
    </div>
  )
}

const containerStyles = css`
  display: flex;
  align-items: center;
`

const labelStyles = css`
  margin-right: 20px;
`

function mapStateToProps (state) {
  const viewState = selectViewState(state)
  return {
    roman: viewState.roman
  }
}

function mapDispatchToProps (dispatch) {
  return {
    toggleRoman: () => { dispatch(toggleRoman()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Roman)

Roman.propTypes = {
  theme: shape({
    type: string,
    background: string,
    secondary: string,
    color: string,
    accent: string,
    highlight: string
  }),
  toggleRoman: func.isRequired,
  roman: bool.isRequired
}
