import React, { useState } from 'react'
import { string, bool, number, shape, func } from 'prop-types'
import { formatCurrency } from '../../common/utils'
import { styles } from './TxTableDataRowStyles'

const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`
const makeDataInputTestId = (transactionId, fieldName) => `transaction-input-${transactionId}-${fieldName}`

export function TxTableDataRow ({ removeTransaction, tx, updateTransaction }) {
  const [showEditMenu, setShowEditMenu] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editData, setEditData] = useState(tx)

  const { id, user_id: userId, description, merchant_id: merchantId, debit, credit, amount } = tx

  const setEditDataValue = (key, value) => {
    const newData = { ...editData, [key]: value }

    setEditData(newData)
  }

  const setDebitCredit = (key) => {
    const debitValue = key === 'debit'
    const newData = { ...editData, debit: debitValue, credit: !debitValue }

    setEditData(newData)
  }

  const updateRowData = () => {
    updateTransaction({ variables: {
      id: editData.id,
      description: editData.description,
      merchant_id: editData.merchant_id,
      debit: editData.debit,
      credit: editData.credit,
      amount: Number(editData.amount)
    } })
  }

  if (editMode) {
    return (
      <tr className='tx-data-row' css={styles} data-testid={`transaction-${id}`}>
        <td data-testid={makeDataInputTestId(id, 'id')}>
          {editData.id}
        </td>
        <td data-testid={makeDataInputTestId(id, 'userId')}>
          {editData.userId}
        </td>
        <td data-testid={makeDataInputTestId(id, 'description')}>
          <input onChange={e => setEditDataValue('description', e.target.value)} value={editData.description} />
        </td>
        <td data-testid={makeDataInputTestId(id, 'merchant')}>
          <input onChange={e => setEditDataValue('merchant_id', e.target.value)} value={editData.merchant_id} />
        </td>
        <td className='check' data-testid={makeDataInputTestId(id, 'debit')}>
          <input checked={editData.debit} onChange={e => setDebitCredit('debit', e.target.value)} type='checkbox' />
        </td>
        <td className='check' data-testid={makeDataInputTestId(id, 'credit')}>
          <input checked={editData.credit} onChange={e => setDebitCredit('credit', e.target.value)} type='checkbox' />
        </td>
        <td className='currency' data-testid={makeDataInputTestId(id, 'amount')}>
          <input onChange={e => setEditDataValue('amount', e.target.value)} value={editData.amount} />
        </td>
        <td className='edit-menu-container'>
          <div className='edit-menu'>
            <button className='edit-menu-cancel' onClick={() => setEditMode(false)}>Cancel</button>
            <button className='edit-menu-save' onClick={() => updateRowData()}>Save</button>
          </div>
        </td>
      </tr>
    )
  }

  return (
    <tr className='tx-data-row' css={styles} data-testid={`transaction-${id}`}>
      <td data-testid={makeDataTestId(id, 'id')}>{id}</td>
      <td data-testid={makeDataTestId(id, 'userId')}>{userId}</td>
      <td data-testid={makeDataTestId(id, 'description')}>{description}</td>
      <td data-testid={makeDataTestId(id, 'merchant')}>{merchantId}</td>
      <td className='check' data-testid={makeDataTestId(id, 'debit')}>{(debit ? '✔' : '')}</td>
      <td className='check' data-testid={makeDataTestId(id, 'credit')}>{(credit ? '✔' : '')}</td>
      <td className='currency' data-testid={makeDataTestId(id, 'amount')}>{ formatCurrency(amount) }</td>
      <td className='edit-menu-container'>{ !showEditMenu
        ? (
          <button onClick={() => setShowEditMenu(true)}>
            Options
          </button>
        )
        : (
          <div className='edit-menu' >
            <button className='edit-menu-cancel' onClick={() => setShowEditMenu(false)}>X</button>
            <button className='edit-menu-edit' onClick={() => setEditMode(true)}>Edit</button>
            <button className='edit-menu-delete' onClick={() => removeTransaction(id)}>Remove</button>
          </div>
        )}
      </td>
    </tr>
  )
}

TxTableDataRow.propTypes = {
  tx: shape({
    id: string,
    user_id: string,
    description: string,
    merchant_id: string,
    debit: bool,
    credit: bool,
    amount: number
  }),
  removeTransaction: func,
  updateTransaction: func
}
