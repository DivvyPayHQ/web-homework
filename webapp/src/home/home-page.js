import React, { Fragment, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GetTransactions } from '../gql/transactions.gql';
import { GetUsers } from '../gql/users.gql';
import { TxTable } from '../components/transactions/TxTable'
import TransactionModal from '../components/transaction-modal/transaction-modal'
import { Button } from 'rsuite'
import Visualizations from '../components/visualizations/visualizations';
import { css } from '@emotion/core';

export function Home () {
  const { loading, error, data = {} } = useQuery(GetTransactions)
  const {loading: l, error: er, refetch, data: {users = []} = {}} = useQuery(GetUsers)
  const [transaction, setTransaction] = useState()

const styles = css`
  display: flex;
  flex-gap: 30px;
  .vis-container {
    flex-basis: 26%;
    margin-left: 100px;
  }
`

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

      <TransactionModal close={() => setTransaction()} refetch={refetch} transaction={transaction} users={users} />
      <div css={styles}>
        <TxTable data={data.transactions} setTransaction={setTransaction} users={users} />
        <div className="vis-container">
          <Visualizations data={data.transactions} users={users} />
        </div>
      </div>
    </Fragment>
  );
}
