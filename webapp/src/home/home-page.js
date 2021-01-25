import React, { Fragment, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GetTransactions } from '../gql/transactions.gql';
import { GetUsers } from '../gql/users.gql';
import { TxTable } from '../components/transactions/TxTable'
import TransactionModal from '../components/transaction-modal/transaction-modal'
import Visualizations from '../components/visualizations/visualizations';
import { css } from '@emotion/core';

export function Home () {
  const { loading, error, data = {}, refetch: refetchTx } = useQuery(GetTransactions)
  const {loading: l, error: er, refetch, data: {users = []} = {}} = useQuery(GetUsers)
  const [transaction, setTransaction] = useState()
  const colors = ['#1da562', '#a52f1d', '#a5731d', '#3f1da5'];

  const styles = css`
    display: flex;
    flex-gap: 30px;
    .vis-container {
      flex-basis: 375px;
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
        <TxTable data={data.transactions} refetchTx={refetchTx} refetchUser={refetch} setTransaction={setTransaction} users={users} />
        <div className="vis-container">
          <Visualizations data={data.transactions} users={users.map((user, index) => ({...user, color: colors[index]}))} />
        </div>
      </div>
    </Fragment>
  );
}
