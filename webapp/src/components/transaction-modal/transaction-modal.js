import React, { useState, useMemo, useEffect } from 'react'
import { Button, Dropdown, Input, InputNumber, Modal, Radio } from 'rsuite';
import { any, array, func } from 'prop-types';
import '@reach/dialog/styles.css';
import { css } from '@emotion/core';
import { useMutation } from '@apollo/client';
import {AddTransaction, EditTransaction} from '../../gql/transactions.gql';
import gql from 'graphql-tag';
import { prepareTransaction, setInitialTransaction } from './transaction-modal-helper';

export default function TransactionModal (props) {

  const {close, transaction: initial, users, refetch} = props
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

  const [create, status] = useMutation(AddTransaction, {
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

  const [update, editStatus] = useMutation(EditTransaction)

  const save = () => {
    let preparedTransaction = prepareTransaction(transaction)
    preparedTransaction.id ? update({ variables: preparedTransaction }) : create({ variables: preparedTransaction });
  }

  useEffect(() => {
    if (status.data || editStatus.data) { // every time the request completes, close modal
      close()
      refetch()
    }
  },[status.data, editStatus.data])

  const getName = () => {
    const user = users.find(user => user.id === transaction.user_id)
    return user
      ? `${user.firstName} ${user.lastName}`
      : 'select'
  }

  return (
    <Modal onHide={close} show={!!initial}>
      <Modal.Header>
        <Modal.Title>{isEdit ? 'Edit' : 'Create'} Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div css={row}>
          <label>User</label>
          <Dropdown title={getName()}>
            {users.map(user => (
              <Dropdown.Item key={user.id} onClick={() => updateValue('user_id', user.id)}>
                {user.firstName} {user.lastName}
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div>
        <div css={row}>
          <label htmlFor="description">Description</label>
          <Input id="description" onChange={val => updateValue('description', val)} value={transaction.description} />
        </div>
        <div css={row}>
          <label htmlFor='amount'>Amount</label>
          <InputNumber id='amount' onChange={val => updateValue('amount', val)} prefix="$" value={transaction.amount} />
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
        <Button
          appearance="primary"
          disabled={!transaction.user_id}
          loading={status.loading}
          onClick={save}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );

}

TransactionModal.propTypes = {
  close: func,
  transaction: any,
  users: array,
  refetch: func,
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