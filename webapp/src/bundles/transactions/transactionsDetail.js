import React from 'react'
import Layout from 'Components/layout/Layout'
import { connect } from 'react-redux'
import { selectViewState } from 'Reducers/ViewStateReducer'
import { shape, string } from 'prop-types'
import { useParams } from 'react-router-dom'
import Section, { SECTION_TYPES } from 'Components/section/Section'
import TextLine from 'Components/textLine/TextLine'
import DeleteButton from 'Components/buttons/DeleteButton'
import Detail from './components/detail/Detail'
import { css } from '@emotion/core'

const transaction = {

}

function TransactionsDetail ({ theme }) {
  const { transactionId } = useParams()

  const links = [
    {
      name: 'Transactions',
      url: '/transactions?page=1'
    },
    {
      name: 'Dominoes',
      url: `/transactions/${transactionId}`
    }
  ]
  
  return (
    <Layout
      buttons={(<DeleteButton onClick={null} />)}
      theme={theme}
      title='transactions'
      links={links}
    >
     <Detail
         theme={theme}
     />
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
