import React, { Fragment, useState } from 'react'
import { useQuery } from '@apollo/client'
import {GetTransactions} from '../gql/transactions.gql'
import { TxTable } from '../components/transactions/TxTable'
import TransactionModal from './transaction-modal'
import { Button } from 'rsuite'

export function Home () {
  const { loading, error, data = {} } = useQuery(GetTransactions)
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
      <TransactionModal close={() => setTransaction()} transaction={transaction} />
      <TxTable data={data.transactions} setTransaction={setTransaction} />
    </Fragment>
  );
}
