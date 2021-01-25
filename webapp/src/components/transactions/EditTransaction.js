import React from 'react'
import PropTypes from 'prop-types'
import { useMutation } from '@apollo/client'
import { TransactionDialogForm } from './TransactionDialogForm'
import UpdateTransaction from '../../gql/mutations/updateTransaction.gql'
import { translate } from '../../utils/translate'

export const EditTransaction = ({ onClose, refetch, transaction }) => {
  const [updateTransaction, { loading }] = useMutation(UpdateTransaction, {
    onCompleted: data => {
      refetch()
    }
  })

  const editTransaction = ({ userId, merchantId, categoryId, description, amount, date, debitCredit }) => {
    updateTransaction({
      variables: {
        id: transaction.id,
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
      defaultValues={{
        amount: transaction.amount,
        categoryId: transaction.category.id,
        date: transaction.date,
        debitCredit: transaction.debit ? 'debit' : 'credit',
        description: transaction.description,
        merchantId: transaction.merchant.id,
        userId: transaction.user.id
      }}
      loading={loading}
      onClose={onClose}
      onSubmit={editTransaction}
      title={translate('edit_transaction')}
    />
  )
}

EditTransaction.propTypes = {
  onClose: PropTypes.func.isRequired,
  refetch: PropTypes.func,
  transaction: PropTypes.object
}
