import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { useQuery } from '@apollo/client'
import { Dialog } from '@material-ui/core'
import { AddTransaction } from '../../components/transactions'
import { ErrorPage } from '../../components/errors'
import { MainHeader, SecondaryHeader } from '../../components/headers'
import { Footer, Table } from '../../components/table'
import { PrimaryButton } from '../../components/buttons'
import GetTransactions from '../../gql/queries/transactions.gql'
import { columnsConfig, formatCurrency, getTotal, getTransactionTableData } from '../../utils/transaction-utils'
import { translate } from '../../utils/translate'

const StyledFooter = styled(Footer)`
  justify-content: space-between;
`

const Header = styled.section`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`

export const TransactionsPage = () => {
  const [rows, setRows] = useState([])
  const [showDialog, setShowDialog] = useState(false)
  const { loading, error, data = {}, refetch, networkStatus } = useQuery(GetTransactions)

  useEffect(() => {
    if (data?.transactions) {
      setRows(getTransactionTableData(data.transactions))
    }
  }, [data])

  if (error) {
    return <ErrorPage error={error} />
  }

  const total = getTotal(rows)

  const closeDialog = () => setShowDialog(false)

  return (
    <>
      <Header>
        <MainHeader>{translate('transactions')}</MainHeader>
        <PrimaryButton onClick={() => setShowDialog(true)} variant='contained'>
          {translate('add_transaction')}
        </PrimaryButton>
      </Header>
      <Table columns={columnsConfig} defaultSortAsc={false} loading={loading && networkStatus !== 4} rows={rows} />
      <StyledFooter>
        <SecondaryHeader>{translate('total')}</SecondaryHeader>
        <p>{formatCurrency(total)}</p>
      </StyledFooter>
      <Dialog onClose={closeDialog} open={showDialog}>
        <AddTransaction onClose={closeDialog} refetch={refetch} />
      </Dialog>
    </>
  )
}
