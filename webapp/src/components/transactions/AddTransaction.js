import React from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'
import { TransactionDialogForm } from './TransactionDialogForm'
import CreateTransaction from '../../gql/mutations/createTransaction.gql'
import { translate } from '../../utils/translate'

export const AddTransaction = ({ onClose, refetch }) => {
  const [createTransaction, { loading }] = useMutation(CreateTransaction, {
    onCompleted: data => {
      refetch()
    }
  })

  const addTransaction = ({ userId, merchantId, categoryId, description, amount, date, debitCredit }) => {
    createTransaction({
      variables: {
        user_id: userId,
        merchant_id: merchantId,
        category_id: categoryId,
        description,
        amount: Number(amount),
        date,
        debit: debitCredit === 'debit',
        credit: debitCredit === 'credit'
      }
    })
    onClose()
  }

  return (
    <TransactionDialogForm
      loading={loading}
      onClose={onClose}
      onSubmit={addTransaction}
      title={translate('add_transaction')}
    />
  )
}

AddTransaction.propTypes = {
  onClose: PropTypes.func.isRequired,
  refetch: PropTypes.func
}
