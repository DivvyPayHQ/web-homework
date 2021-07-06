import React from 'react'
import Layout from 'Components/layout/Layout'
import { connect } from 'react-redux'
import Section, { SECTION_TYPES } from 'Components/section/Section'
import Theme from './components/theme/Theme'
import Roman from './components/roman/Roman'
import { selectViewState } from 'Reducers/AppReducer'
import { shape, string } from 'prop-types'

function Settings ({ theme }) {
  return (
    <Layout
      theme={theme}
      title='settings'
    >
      <Section
        theme={theme}
        title='preferences'
        type={SECTION_TYPES.HALF}
      >
        <Theme
          theme={theme}
        />
        <Roman
          theme={theme}
        />
      </Section>
    </Layout>
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
