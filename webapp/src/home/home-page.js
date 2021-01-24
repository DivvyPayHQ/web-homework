import React, { Fragment, useState } from 'react'
import { useQuery } from '@apollo/client'
import { GetTransactions } from '../gql/transactions.gql';
import { GetUsers } from '../gql/users.gql';
import { TxTable } from '../components/transactions/TxTable'
import TransactionModal from '../components/transaction-modal/transaction-modal'
import { Button } from 'rsuite'

export function Home () {
  const { loading, error, data = {} } = useQuery(GetTransactions)
  const {loading: l, error: er, data: {users = []} = {}} = useQuery(GetUsers)
  const [transaction, setTransaction] = useState()

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
      <Button onClick={() => setTransaction(true)}>add transaction</Button>
      <TransactionModal close={() => setTransaction()} transaction={transaction} users={users} />
      <TxTable data={data.transactions} setTransaction={setTransaction} users={users} />
    </Fragment>
  );
}
