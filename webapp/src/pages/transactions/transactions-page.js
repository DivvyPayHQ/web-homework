import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { useMutation, useQuery } from '@apollo/client'
import { CircularProgress, Dialog, IconButton } from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'
import { AddTransaction, EditTransaction } from '../../components/transactions'
import { ErrorPage } from '../../components/errors'
import { MainHeader, SecondaryHeader } from '../../components/headers'
import { Footer, Table } from '../../components/table'
import { PrimaryButton } from '../../components/buttons'
import GetTransactions from '../../gql/queries/transactions.gql'
import DeleteTransaction from '../../gql/mutations/deleteTransaction.gql'
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

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const EditTransactionButton = styled(Edit)`
  color: ${props => props.theme.colors.info};
`

const DeleteTransactionIcon = styled(Delete)`
  color: ${props => props.theme.colors.danger};
`

const Loading = styled(CircularProgress)`
  color: ${props => props.theme.colors.danger};
`

export const TransactionsPage = () => {
  const [rows, setRows] = useState([])
  const [showAddTransactionDialog, setShowAddTransactionDialog] = useState(false)
  const [showEditTransactionDialog, setShowEditTransactionDialog] = useState(false)
  const [transaction, setTransaction] = useState(null)
  const { loading, error, data = {}, refetch, networkStatus } = useQuery(GetTransactions)

  const [deleteTransactionMutation, { loading: deleteLoading }] = useMutation(DeleteTransaction, {
    onCompleted: data => {
      refetch()
    }
  })

  const editTransaction = transaction => {
    setTransaction(transaction)
    setShowEditTransactionDialog(true)
  }

  const deleteTransaction = id => {
    deleteTransactionMutation({ variables: { id } })
  }

  useEffect(() => {
    if (data?.transactions) {
      setRows(
        getTransactionTableData(data.transactions).map(row => {
          return {
            ...row,
            actions: (
              <ActionsContainer>
                <IconButton onClick={() => editTransaction(row)}>
                  <EditTransactionButton />
                </IconButton>
                <IconButton onClick={() => deleteTransaction(row.id)}>
                  <DeleteTransactionIcon />
                </IconButton>
              </ActionsContainer>
            )
          }
        })
      )
    }
  }, [data])

  if (error) {
    return <ErrorPage error={error} />
  }

  const total = getTotal(rows)

  const closeAddTransactionDialog = () => setShowAddTransactionDialog(false)
  const closeEditTransactionDialog = () => setShowEditTransactionDialog(false)

  return (
    <>
      <Header>
        <MainHeader>{translate('transactions')}</MainHeader>
        <PrimaryButton onClick={() => setShowAddTransactionDialog(true)} variant='contained'>
          {translate('add_transaction')}
        </PrimaryButton>
      </Header>
      <Table columns={columnsConfig} defaultSortAsc={false} loading={loading && networkStatus !== 4} rows={rows} />
      <StyledFooter>
        <SecondaryHeader>{translate('total')}</SecondaryHeader>
        <p>{formatCurrency(total)}</p>
      </StyledFooter>
      <Dialog onClose={closeAddTransactionDialog} open={showAddTransactionDialog}>
        <AddTransaction onClose={closeAddTransactionDialog} refetch={refetch} />
      </Dialog>
      <Dialog onClose={closeEditTransactionDialog} open={showEditTransactionDialog}>
        <EditTransaction onClose={closeEditTransactionDialog} refetch={refetch} transaction={transaction} />
      </Dialog>
    </>
  )
}
