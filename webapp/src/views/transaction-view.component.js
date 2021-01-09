import React, { useState } from 'react'
import { CreateTransaction } from '../views/create-transaction.component'
import { GET_ALL_TRANSACTIONS } from '../graphql/transactions'
import { useQuery } from '@apollo/react-hooks'
import Container from '@material-ui/core/Container'
import { TransactionTable } from '../views/transactions-table.component'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

export function TransactionsView () {
  const { data, loading } = useQuery(GET_ALL_TRANSACTIONS)
  const [roman, setRoman] = useState(false)

  return (
    <>
      <Container>
        <CreateTransaction />
        {!loading && (<TransactionTable roman={roman} transactions={data.transactions} />)}
        <FormControlLabel
          control={<Switch checked={roman} name='roman' onChange={() => setRoman(!roman)} />}
          label='Roman'
        />
      </Container>
    </>
  )
}
