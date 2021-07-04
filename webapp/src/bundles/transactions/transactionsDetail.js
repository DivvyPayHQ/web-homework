import React from 'react'
import Layout from '../common/components/layout/Layout'
import { connect } from 'react-redux'
import { selectViewState } from '../common/reducers/ViewStateReducer'
import { shape, string } from 'prop-types'
import { useParams } from 'react-router-dom'
import Section, { SECTION_TYPES } from '../common/components/section/Section'

const transaction = {

}

function TransactionsDetail ({ theme }) {
  const { transactionId } = useParams()
  return (
    <Layout
      theme={theme}
      title='transactions'
    >
      <Section
        theme={theme}
        title='detail'
        type={SECTION_TYPES.HALF}
      />
      <Section
          theme={theme}
        title='merchant'
        type={SECTION_TYPES.HALF}
      />
      <Section
          theme={theme}
        title='history'
        type={SECTION_TYPES.HALF}
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

export default connect(mapStateToProps)(TransactionsDetail)

TransactionsDetail.propTypes = {
  theme: shape({
    type: string,
    background: string,
    secondary: string,
    color: string,
    accent: string,
    highlight: string
  })
}
