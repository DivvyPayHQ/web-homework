import React, { Fragment } from 'react'
import { css } from '@emotion/core'
import { useQuery } from '@apollo/client'
import { Outlet, useNavigate } from 'react-router-dom'
import { Button } from '@kyper/button'
import { useTokens } from '@kyper/tokenprovider'

import GetTransactions from 'src/gql/transactions.gql'
import { TxTable } from 'src/components/transactions/TxTable'

import ROUTES from 'src/constants/Routes'

export function Transactions () {
  const tokens = useTokens()
  const navigate = useNavigate()
  const { loading, error, data = {} } = useQuery(GetTransactions)

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
      <div css={containerStyle(tokens)}>
        <Button onClick={() => navigate(ROUTES.TRANSACTION_NEW)} variant='primary'>
          Add Transaction
        </Button>
      </div>
      <TxTable data={data.transactions} />
      <Outlet />
    </Fragment>
  )
}

const containerStyle = tokens => css`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${tokens.Spacing.Large}px;

  & button {
    color: ${tokens.Color.Black} !important;
  }
`
