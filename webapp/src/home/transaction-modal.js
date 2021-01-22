import React, { useState } from 'react'
import { Dialog } from '@reach/dialog';
import { any, func } from 'prop-types';
import '@reach/dialog/styles.css';
import { css } from '@emotion/core';
import { useMutation } from '@apollo/client';
import {AddTransaction} from '../gql/transactions.gql';

const setInitialTransaction = transaction => {
  return {
    description: transaction?.description || '',
    paymentOption: transaction?.debit ? 'debit' : 'credit',
    amount: transaction?.amount || 0,
  }
}

export default function TransactionModal (props) {

  const {close, transaction: initial} = props
  const isEdit = typeof initial !== 'boolean'
  const [transaction, setTransaction] = useState(() => setInitialTransaction(initial))
  const updateValue = (key, value) => {
    setTransaction(curr => ({...curr, [key]: value}))
  }

  const [save] = useMutation(AddTransaction)

  return (
    <Dialog aria-label={`${isEdit ? 'Edit' : 'Create'} transaction`} isOpen onDismiss={() => {}}>
      <h1>{isEdit ? 'Edit' : 'Create'} Transaction</h1>
      <label>
        Description
        <input onChange={e => updateValue('description', e.target.value)} value={transaction.description} />
      </label>
      <label>
        Debit
        <input
          checked={transaction.paymentOption === 'debit'}
          onChange={e => updateValue('paymentOption', e.currentTarget.value)}
          type="radio"
          value="debit"
        />
      </label>
      <label>
        Credit
        <input
          checked={transaction.paymentOption === 'credit'}
          onChange={e => updateValue('paymentOption', e.currentTarget.value)}
          type="radio"
          value="credit"
        />
      </label>
      <button onClick={close}>Cancel</button>
      <button onClick={() => save({variables: transaction})}>Save</button>
    </Dialog>
  );

}

TransactionModal.propTypes = {
  close: func,
  transaction: any,
}