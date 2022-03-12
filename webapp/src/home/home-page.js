import React, { Fragment } from 'react'
import { useQuery } from '@apollo/client'
import { GetTransactions } from '../gql/transactions.gql.js'
import { TxTable } from '../components/transactions/TxTable'
import { bool } from 'prop-types'

export function Home ({ convertRoman }) {
  const { loading, error, data = {} } = useQuery(GetTransactions, {
    fetchPolicy: 'network-only'
  })

  if (loading) {
    return (
      <Fragment>
        Loading...
      </Fragment>
    )
  }

  if (error) {
    return (
      <Fragment>
        ¯\_(ツ)_/¯
      </Fragment>
    )
  }

  return (
    <Fragment>
      <TxTable convertRoman={convertRoman} data={data.transactions} />
    </Fragment>
  )
}

Home.propTypes = {
  convertRoman: bool
}
