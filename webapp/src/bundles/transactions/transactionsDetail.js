import React from 'react'
import Layout from '../common/components/layout/Layout'
import { connect } from 'react-redux'
import { selectViewState } from '../common/reducers/ViewStateReducer'
import { shape, string } from 'prop-types'
import { useParams } from 'react-router-dom'
import Section, { SECTION_TYPES } from '../common/components/section/Section'
import TextLine from '../common/components/textLine/TextLine'

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
      >
        <TextLine
          label='Date'
          theme={theme}
          value='01-01-2021'
        />
        <TextLine
          label='Amount'
          theme={theme}
          value='$29.00'
        />
      </Section>
      <Section
        theme={theme}
        title='merchant'
        type={SECTION_TYPES.HALF}
      >
        <TextLine
          label='Name'
          theme={theme}
          value='Dominoes'
        />
        <TextLine
          label='Category'
          theme={theme}
          value='Food & Drinks'
        />
        <TextLine
          label='Location'
          theme={theme}
          value='Riverton, UT'
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
