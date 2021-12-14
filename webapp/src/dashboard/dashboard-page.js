import React, { Fragment } from 'react'
import { css } from '@emotion/core'
import { useQuery } from '@apollo/client'
import AutoSizer from 'react-virtualized-auto-sizer'

import GetTransactions from 'src/gql/transactions.gql'

import { MerchantsCount } from 'src/components/dashboard/MerchantsCount'
import { UsersCount } from 'src/components/dashboard/UsersCount'
import { TransactionsCount } from 'src/components/dashboard/TransactionsCount'
import { TransactionsOverTime } from 'src/components/dashboard/TransactionsOverTime'

export function Dashboard () {
  // TODO: This could be updated to use some real queries
  const { loading, error, data = {} } = useQuery(GetTransactions)

  return (
    <Fragment>
      <section css={flexContainer}>
        <div css={cardContainerStyle}>
          <TransactionsCount error={error} loading={loading} transactions={data.transactions} />
          <MerchantsCount error={error} loading={loading} transactions={data.transactions} />
          <UsersCount error={error} loading={loading} transactions={data.transactions} />
        </div>
        <div css={chartContainerStyle}>
          <AutoSizer>
            {({ height, width }) => {
              if (!height || !width) return null

              return (
                <TransactionsOverTime error={error} height={height} loading={loading} transactions={data.transactions} width={width} />
              )
            }}
          </AutoSizer>
        </div>
      </section>
    </Fragment>
  )
}

const flexContainer = css`
  height: 100%;
  display: flex;
  flex-direction: column;
`
const cardContainerStyle = css`
  flex: 0 1 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-column-gap: 16px;
  grid-row-gap:16px;
`

const chartContainerStyle = css`
  flex: 1 0 auto;
`
