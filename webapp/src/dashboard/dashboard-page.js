import React from 'react'
import { css } from '@emotion/core'
import { useQuery } from '@apollo/client'

import GetTransactions from 'src/gql/transactions.gql'

import { MerchantsCount } from 'src/components/dashboard/MerchantsCount'
import { UsersCount } from 'src/components/dashboard/UsersCount'
import { TransactionsCount } from 'src/components/dashboard/TransactionsCount'

export function Dashboard () {
  // TODO: This could be updated to use some real queries
  const { loading, error, data = {} } = useQuery(GetTransactions)

  return (
    <section css={containerStyle}>
      <TransactionsCount error={error} loading={loading} transactions={data.transactions} />
      <MerchantsCount error={error} loading={loading} transactions={data.transactions} />
      <UsersCount error={error} loading={loading} transactions={data.transactions} />
    </section>
  )
}

const containerStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`
