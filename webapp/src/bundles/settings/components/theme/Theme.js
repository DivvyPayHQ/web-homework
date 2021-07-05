import React from 'react'
import { shape, string, func } from 'prop-types'
import { connect } from 'react-redux'
import Switch from 'Components/switch/Switch'
import { setTheme } from 'Actions/setTheme'
import { THEME_TYPES } from 'Config/theme'
import { css } from '@emotion/core'

function Theme ({ theme, setTheme }) {
  const darkMode = theme.type === THEME_TYPES.DARK
  return (
    <div css={containerStyles}>
      <p css={labelStyles} style={{ color: theme.color }}>Dark Mode</p>
      <Switch
        on={darkMode}
        onClick={() => darkMode ? setTheme(THEME_TYPES.LIGHT) : setTheme(THEME_TYPES.DARK)}
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

function mapDispatchToProps (dispatch) {
  return {
    setTheme: (themeType) => { dispatch(setTheme(themeType)) }
  }
}

export default connect(null, mapDispatchToProps)(Theme)

Theme.propTypes = {
  theme: shape({
    type: string,
    background: string,
    secondary: string,
    color: string,
    accent: string,
    highlight: string
  }),
  setTheme: func.isRequired
}
