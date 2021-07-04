import React from 'react'
import Layout from '../common/components/layout/Layout'
import { connect } from 'react-redux'
import { selectViewState } from '../common/reducers/ViewStateReducer'
import { shape, string } from 'prop-types'

function Settings ({ theme }) {
  return (
    <Layout
      theme={theme}
      title='settings'
    />
  )
}

function mapStateToProps (state) {
  const viewState = selectViewState(state)
  return {
    theme: viewState.theme
  }
}

export default connect(mapStateToProps)(Settings)

Settings.propTypes = {
  theme: shape({
    type: string,
    background: string,
    secondary: string,
    color: string,
    accent: string,
    highlight: string
  })
}
