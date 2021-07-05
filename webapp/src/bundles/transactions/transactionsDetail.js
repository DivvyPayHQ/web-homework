import React from 'react'
import Layout from 'Components/layout/Layout'
import { connect } from 'react-redux'
import { selectViewState } from 'Reducers/ViewStateReducer'
import { shape, string } from 'prop-types'
import { useParams } from 'react-router-dom'
import Section, { SECTION_TYPES } from 'Components/section/Section'
import TextLine from 'Components/textLine/TextLine'
import TransactionStatus from './components/transactionStatus/TransactionStatus'
import { css } from '@emotion/core'

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
        <div css={containerStyles}>
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
          <TransactionStatus
            status='PENDING'
            theme={theme}
          />
        </div>
      </Section>
      <Section
        theme={theme}
        title='merchant'
        type={SECTION_TYPES.HALF}
      >
        <div css={containerStyles}>
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
        </div>
      </Section>
    </Layout>
  )
}

const containerStyles = css`
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

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
