import React, { useState, useMemo, useEffect } from 'react'
import { Button, Input, Modal, Radio } from 'rsuite';
import { any, func } from 'prop-types';
import '@reach/dialog/styles.css';
import { css } from '@emotion/core';
import { useMutation } from '@apollo/client';
import {AddTransaction} from '../gql/transactions.gql';
import gql from 'graphql-tag';

const setInitialTransaction = transaction => {
  return {
    description: transaction?.description || '',
    paymentOption: transaction?.debit ? 'debit' : 'credit',
    amount: transaction?.amount || 0,
    ...transaction
  }
}

export default function TransactionModal (props) {

  const {close, transaction: initial} = props
  const [transaction, setTransaction] = useState({})
  const isEdit = useMemo(() => initial ? typeof initial !== 'boolean' : transaction?.id, [initial, transaction])
  const updateValue = (key, value) => {
    setTransaction(curr => ({...curr, [key]: value}))
  }

  useEffect(() => {
    if (initial) {
      setTransaction(setInitialTransaction(initial))
    }
  },[initial])

  const [save, status] = useMutation(AddTransaction, {
    update(cache, {data: {addTransaction}}) {
      cache.modify({
        fields: {
          transactions(existing = []) {
            const newTransaction = cache.writeFragment({
              data: addTransaction,
              fragment: gql`
                fragment NewTransaction on Transaction {
                  id
                }
              `
            });
            return [...existing, newTransaction]
          }
        }
      })
    }
  })

  if (status.data) {
    close()
  }

  return (
    <Modal onHide={close} show={!!initial}>
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
        <Button appearance="primary" loading={status.loading} onClick={() => save({ variables: transaction })}>
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