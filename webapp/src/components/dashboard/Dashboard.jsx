import React, { useState } from 'react'
import { css } from '@emotion/core'

const Dashboard = () => {
  const [amount, setAmount] = useState(100)
  const [description, setDescription] = useState('Car Insurance')
  const [editing, toggleEdit] = useState(false)

  return (
    <div className='dashboard-wrapper' css={dashboardStyle}>
      <h3>Transactions</h3>
      <div className='transaction-card'>
        <div className='transaction-description-wrapper'>
          <div className='transaction-description'>
            Deposit Check #1209
          </div>
          <div className='transaction-amount positive'>
            ${amount}
          </div>
        </div>
        <div className='transaction-actions'>
          <button className='edit-btn'>EDIT</button>
          <button className='remove-btn'>REMOVE</button>
        </div>
      </div>
      <div className='transaction-card'>
        {editing ? (
          <div className='transaction-card-input-wrapper'>
            <input defaultValue={description} name='description' onChange={e => setDescription(e.target.value)} type='text' />
            <input defaultValue={amount} name='amount' onChange={e => setAmount(e.target.value)} type='number' />
          </div>
        ) : (
          <div className='transaction-description-wrapper'>
            <div className='transaction-description'>
              {description}
            </div>
            <div className='transaction-amount negative'>
              -${amount}
            </div>
          </div>
        )}
        <div className='transaction-actions'>
          {editing
            ? <button className='save-btn' onClick={() => toggleEdit(false)}>SAVE</button>
            : <button className='edit-btn' onClick={() => toggleEdit(true)}>EDIT</button>
          }
          <button className='remove-btn'>REMOVE</button>
        </div>
      </div>
    </div>
  )
}

const dashboardStyle = css`
  .transaction-card {
    align-items: center;
    background-color: #ffffff;
    border-radius: 6px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.05);
    display: flex;
    justify-content: space-between;
    padding: 15px 20px;
    margin: 0 0 15px 0;
    min-height: 45px;

    &:hover,
    &:focus {
      box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.08);
    }
  }

  .transaction-amount {
    &.positive {
      color: #159D6C;
    }

    &.negative {
      color: #9d152f;
    }
  }

  .transaction-actions button {
    appearance: none;
    background-color: #ffffff;
    border: 1px solid #000;
    border-radius: 3px;
    font-family: 'Calibre-Med';
    font-size: 13px;
    padding: 8px 15px;

    &.remove-btn {
      &:hover,
      &:focus {
        background-color: #9d152f;
        border: 1px solid #9d152f;
        color: #ffffff;
        cursor: pointer;
      }
    }

    &.save-btn {
      &:hover,
      &:focus {
        background-color: #159D6C;
        border: 1px solid #159D6C;
        color: #ffffff;
        cursor: pointer;
      }
    }

    &:hover,
    &:focus {
      background-color: #000000;
      color: #ffffff;
      cursor: pointer;
    }

    &:first-of-type {
      margin-right: 10px;
    }
  }

  .transaction-card-input-wrapper {
    > input {
      border-radius: 3px;
      border: 1px solid #626262;
      font-size: 14px;
      padding: 8px 15px;
      margin-right: 15px;
    }
  }
`

export default Dashboard
