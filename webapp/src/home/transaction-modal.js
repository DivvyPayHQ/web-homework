import React, { useState, useMemo } from 'react'
import { Button, Input, Modal, Radio } from 'rsuite';
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
  const isEdit = useMemo(() => initial && typeof initial !== 'boolean', [initial])
  const [transaction, setTransaction] = useState(() => setInitialTransaction(initial))
  const updateValue = (key, value) => {
    setTransaction(curr => ({...curr, [key]: value}))
  }

  const [save] = useMutation(AddTransaction)

  return (
    <Modal onHide={close} show={initial}>
      <Modal.Header>
        <Modal.Title>{isEdit ? 'Edit' : 'Create'} Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div css={row}>
          <label htmlFor="description">Description</label>
          <Input id="description" onChange={val => updateValue('description', val)} value={transaction.description} />
        </div>
        <div css={row}>
          <label>Payment type</label>
          <div>
            <Radio
              checked={transaction.paymentOption === 'debit'}
              inline
              onChange={value => updateValue('paymentOption', value)}
              type="radio"
              value="debit"
            >
              Debit
            </Radio>
            <Radio
              checked={transaction.paymentOption === 'credit'}
              inline
              onChange={value => updateValue('paymentOption', value)}
              type="radio"
              value="credit"
            >
              Credit
            </Radio>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={close}>Cancel</Button>
        <Button appearance="primary" onClick={() => save({ variables: transaction })}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );

}

TransactionModal.propTypes = {
  close: func,
  transaction: any,
}

const row = css`
  display: flex;
  width: 80%;
  margin: 12px;
  > label {
    flex: 0 0 100px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 12px;
  }
`