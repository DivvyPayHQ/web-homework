import React from 'react'
import Layout from 'Components/layout/Layout'
import Categories from './components/categories/Categories'
import { connect } from 'react-redux'
import { selectViewState } from 'Reducers/AppReducer'
import { shape, string } from 'prop-types'

function Dashboard ({ theme }) {
  return (
    <Layout
      theme={theme}
      title='dashboard'
    >
      <Categories
        theme={theme}
      />
    </Layout>
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
