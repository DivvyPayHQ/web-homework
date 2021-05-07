import React, { useState } from 'react'
import { arrayOf, string, bool, number, shape } from 'prop-types'

import { useMutation } from '@apollo/client'
import AddTransaction from '../../gql/addTransaction.gql'
import UpdateTransaction from '../../gql/updateTransaction.gql'
import RemoveTransaction from '../../gql/removeTransaction.gql'

import { TxTableDataRow } from './TxTableDataRow'

import { css } from '@emotion/core'

export function TxTable ({ data }) {
  const [ addTransaction ] = useMutation(AddTransaction)
  const [ removeTransaction ] = useMutation(RemoveTransaction)
  const [ updateTransaction ] = useMutation(UpdateTransaction)

  const [expandAddTx, setExpandAddTx] = useState(false)

  const [addTxDebit, setAddTxDebit] = useState(true)
  const [addTxDesc, setAddTxDesc] = useState('')
  const [addTxMerchant, setAddTxMerchant] = useState('')
  const [addTxAmount, setAddTxAmount] = useState('')

  const setNumberValue = (value) => {
    if (Number(value)) {
      setAddTxAmount(value)
    }
  }

  const submitNewTx = e => {
    e.preventDefault()

    addTransaction({
      variables: {
        user_id: 'test_id',
        description: addTxDesc,
        amount: Number(addTxAmount),
        merchant_id: addTxMerchant,
        debit: addTxDebit,
        credit: !addTxDebit
      }
    })
    setAddTxDesc('')
    setAddTxMerchant('')
    setAddTxAmount('')
  }

  return (
    <div css={styles}>
      <h1>Account Transactions</h1>
      <table className='tx-table' >
        <tbody>
          <tr className='header'>
            <td>ID</td>
            <td>User ID</td>
            <td>Description</td>
            <td>Merchant ID</td>
            <td>Debit</td>
            <td>Credit</td>
            <td>Amount</td>
            <td />
          </tr>
          {data.map(tx => (
            <TxTableDataRow
              key={`transaction-${tx.id}`}
              removeTransaction={removeTransaction}
              tx={tx}
              updateTransaction={updateTransaction}
            />
          ))}
        </tbody>
      </table>

      <div className='add-tx-control'>
        <h3>Add Transaction</h3>
        <button onClick={() => setExpandAddTx(!expandAddTx)}>{expandAddTx ? 'Cancel' : 'Add'}</button>
      </div>

      <br />
      <form className={`add-tx-form ${expandAddTx ? 'expanded' : 'collapsed'}`} onSubmit={e => submitNewTx(e)} >
        <div className='add-tx-row'>
          <div className='input-group'>
            <label htmlFor='add-tx-desc'>Description</label>
            <input
              id='add-tx-desc'
              onChange={e => setAddTxDesc(e.target.value)}
              type='text'
              value={addTxDesc}
            />
          </div>
          <div className='input-group'>
            <label htmlFor='add-tx-merchant'>Merchant</label>
            <input
              id='add-tx-merchant'
              onChange={e => setAddTxMerchant(e.target.value)}
              type='text'
              value={addTxMerchant}
            />
          </div>
          <div className='input-group'>
            <label htmlFor='add-tx-amount'>Amount</label>
            <span className='dollar'>
              $<input
                id='add-tx-amount'
                onChange={e => setNumberValue(e.target.value)}
                type='text'
                value={addTxAmount}
              />
            </span>
          </div>
          <div className='input-group debit-switch'>
            <label htmlFor='add-tx-debit-credit'>
              <div className='switch'>
                <div className='debit-bg bg'>Debit</div>
                <div className='credit-bg bg'>Credit</div>
                <div className={`selected-indicator ${addTxDebit ? '' : 'credit-selected'}`}>
                  {addTxDebit ? 'Debit' : 'Credit'}
                </div>
              </div>
            </label>
            <input
              checked={addTxDebit}
              id='add-tx-debit-credit'
              onChange={() => setAddTxDebit(!addTxDebit)}
              type='checkbox'
            />
          </div>
        </div>
        <button>Add Transaction</button>
      </form>
    </div>
  )
}

const styles = css`
  .tx-table {
    border: 1px solid #DDD;
    padding: 4px;
  }
  .header {
    font-weight: bold;

    td{
      padding: 2px 4px;
    }
  }

  .add-tx-row{
    display: flex;
    font-weight: bold;
  }

  .add-tx-form{
    transition: transform 0.5s;
    transform-origin: top;
    background-color: #CCC;
    border-radius: 8px;
    padding: 16px;
    width: 100%;
    max-width: 700px;
  }
  .add-tx-form.collapsed{
    transform: scaleY(0);
  }
  .add-tx-form.expanded{
    transform: scaleY(1);
  }
  
  .add-tx-row{
    display: flex;
    justify-content: space-between;
  }
  .input-group{
    display: flex;
    flex-direction: column;

  }
  .dollar{
    font-weight: normal;
    display: flex;  
  }

  #add-tx-debit-credit{
    opacity: 0;
  }
  .debit-switch{
    margin: 0 8px;
    height: 100%;
    display: flex;
    align-items: flex-end;
  }
  
  .switch{
    position: relative;
    display: flex;
    /* border: 1px solid black; */
    cursor: pointer;
    overflow: hidden;
    border-radius: 12px;
    
    .bg{
      padding: 4px 8px;
      background-color: #DDD;
      color: #AAA;
      width: 65px;
      text-align: center;
    }

    .selected-indicator{
      width: 65px;
      text-align: center;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 12px;
      padding: 4px 8px;
      background-color: firebrick;
      color: white;
      transition: all 0.4s;
    }
    .selected-indicator.credit-selected{
      background-color: green;
      left: calc(50% + 1px);
      right: 0;
    }
  }
`

TxTable.defaultProps = {
  data: []
}

TxTable.propTypes = {
  data: arrayOf(shape({
    id: string,
    user_id: string,
    description: string,
    merchant_id: string,
    debit: bool,
    credit: bool,
    amount: number
  }))
}
