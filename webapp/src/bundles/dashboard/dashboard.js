import React from 'react'
import Layout from '../common/components/layout/Layout'
import { connect } from 'react-redux'
import { selectViewState } from '../common/reducers/ViewStateReducer'
import { shape, string } from 'prop-types'

function Dashboard ({ theme }) {
  return (
    <Layout
      theme={theme}
      title='dashboard'
    />
  )
}

function mapStateToProps (state) {
  const viewState = selectViewState(state)
  return {
    theme: viewState.theme
  }
}

export default connect(mapStateToProps)(Dashboard)

Dashboard.propTypes = {
  theme: shape({
    type: string,
    background: string,
    secondary: string,
    color: string,
    accent: string,
    highlight: string
  })
}
