import React, { useState } from 'react'
import Layout from 'Components/layout/Layout'
import { connect } from 'react-redux'
import { selectViewState } from 'Reducers/AppReducer'
import { shape, string } from 'prop-types'
import { useParams, useHistory } from 'react-router-dom'
import DeleteButton from 'Components/buttons/DeleteButton'
import Detail from './components/detail/Detail'
import Merchant from './components/merchant/Merchant'

function TransactionsDetail ({ theme }) {
  const [loading, setLoading] = useState(false)
  const { transactionId } = useParams()
  const history = useHistory()

  const deleteTransaction = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      history.push('/transactions?page=1')
    }, 1500)
  }

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
      buttons={(
        <DeleteButton
          loading={loading}
          onClick={deleteTransaction}
        />
      )}
      links={links}
      theme={theme}
      title='transactions'
    >
      <Detail
        theme={theme}
      />
      <Merchant
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
