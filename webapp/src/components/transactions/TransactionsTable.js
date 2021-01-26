import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { useMutation } from '@apollo/client'
import { Dialog, IconButton } from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'
import { EditTransaction } from '.'
import { SecondaryHeader } from '../headers'
import { Footer, Table } from '../table'
import DeleteTransaction from '../../gql/mutations/deleteTransaction.gql'
import { columnsConfig, formatCurrency, getTotal, getTransactionTableData } from '../../utils/transaction-utils'
import { translate } from '../../utils/translate'

const StyledFooter = styled(Footer)`
  justify-content: space-between;
  padding-right: 10%;

  p {
    padding-right: 16px;
  }
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

export const TransactionsTable = ({ data, loading, refetch }) => {
  const [rows, setRows] = useState([])
  const [showEditTransactionDialog, setShowEditTransactionDialog] = useState(false)
  const [transaction, setTransaction] = useState(null)

  const [deleteTransactionMutation] = useMutation(DeleteTransaction, {
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

  const total = getTotal(rows)
  const closeEditTransactionDialog = () => setShowEditTransactionDialog(false)

  return (
    <>
      <Table columns={columnsConfig} defaultSortAsc={false} loading={loading} rows={rows} />
      <StyledFooter>
        <SecondaryHeader>{translate('total')}</SecondaryHeader>
        <p>{formatCurrency(total)}</p>
      </StyledFooter>
      <Dialog onClose={closeEditTransactionDialog} open={showEditTransactionDialog}>
        <EditTransaction onClose={closeEditTransactionDialog} refetch={refetch} transaction={transaction} />
      </Dialog>
    </>
  )
}

TransactionsTable.propTypes = {
  data: PropTypes.any.isRequired,
  loading: PropTypes.bool.isRequired,
  refetch: PropTypes.func.isRequired
}
