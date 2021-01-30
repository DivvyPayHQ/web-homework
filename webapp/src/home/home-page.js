import React, { Fragment } from 'react'
import { TxTable } from '../components/transactions/TxTable'
import { CreateTransaction } from '../components/transactions/create-transaction'
import { css } from '@emotion/core'

export function Home () {
  return (
    <Fragment>
      <div css={mainStyle}>
        <div css={paddingStyle}>
          <CreateTransaction />
        </div>
        <div css={paddingStyle}>
          <TxTable css={paddingStyle} />
        </div>
      </div>
    </Fragment>
  )
}

const mainStyle = css`
  display: flex;
`

const paddingStyle = css`
  margin: 20px 10px 20px 10px;
`
