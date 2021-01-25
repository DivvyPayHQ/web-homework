import React, { useEffect, useState } from 'react'
import { compose, graphql } from 'react-apollo'
import { addTransactionQuery, getTransactionQuery, updateTransaction } from '../queries/queries'
import { css } from '@emotion/core'
import PropTypes from 'prop-types'

export const GetTransactionType = transaction => {
  if (transaction?.debit === true) {
    return 'debit'
  } else {
    return 'credit'
  }
}

const AddTransaction = props => {
  const [Id, setId] = useState('')
  const [userId, setUserId] = useState('')
  const [merchantId, setMerchantId] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [transactionType, setTransactionType] = useState('')
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (props.transaction) {
      setId(props.transaction.id)
      setUserId(props.transaction.user_id)
      setMerchantId(props.transaction.merchant_id)
      setAmount(props.transaction.amount)
      setDescription(props.transaction.description)
      setTransactionType(GetTransactionType(props.transaction))
    }
  }, [])

  const randomCode = () => {
    return Math.random()
      .toString(36)
      .substr(2, 9)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (props.editTransaction) {
      props.updateTransaction({
        variables: {
          transaction: {
            id: Id,
            user_id: userId,
            merchant_id: merchantId,
            debit: transactionType === 'debit',
            credit: transactionType === 'credit',
            amount: parseNumber(amount),
            description: description
          }
        }
      })
    } else {
      props.addTransactionQuery({
        variables: {
          user_id: randomCode(),
          merchant_id: randomCode(),
          debit: transactionType === 'debit',
          credit: transactionType === 'credit',
          amount: parseNumber(amount),
          description: description
        },
        refetchQueries: [{ query: getTransactionQuery }]
      })
    }

    props.handleClose()
  }

  const parseNumber = value => {
    return value !== '' ? parseFloat(value) : 0
  }

  return (
    <div>
      <form css={formContainer} onSubmit={handleSubmit}>
        <h3
          css={css`
            padding: 8px;
            margin-left: 50px;
            width: 50%;
          `}
        >
          {props.editTransaction ? 'Edit Transaction' : 'Add Transaction'}
        </h3>
        <div
          css={css`
            padding: 5px;
            margin-left: 50px;
            width: 50%;
            margintop: 100px;
          `}
        >
          <label htmlFor='description'>Description: </label>
          <input onChange={e => setDescription(e.target.value)} type='text' value={description} />
        </div>

        <div
          css={css`
            padding: 8px;
            margin-left: 50px;
            width: 50%;
          `}
        >
          <label htmlFor='amount'>Amount: </label>
          <input onChange={e => setAmount(e.target.value)} type='text' value={amount} />
          {/* <input onBlur={e => parseNumber(e)} type='text' /> */}
        </div>

        <div
          css={css`
            font-size: 15px;
            padding: 8px;
            display: flex;
            align-self: center;
            margin-left: 85px;
            cursor: pointer;
          `}
        >
          <select onBlur={e => setTransactionType(e.target.value)} value={transactionType}>
            <option label='Debit' value='debit'>
              debit
            </option>
            <option label='Credit' value='credit'>
              credit
            </option>
          </select>
        </div>
        <button
          css={css`
            font-size: 15px;
            padding: 8px;
            display: flex;
            align-self: center;
            margin-left: 100px;
            cursor: pointer;
            background-color: #39ac39;
            color: white;
          `}
          onClick={() => setShowForm(!showForm)}
        >
          {props.editTransaction ? 'Edit' : 'Add'}
        </button>
      </form>
    </div>
  )
}

AddTransaction.propTypes = {
  transaction: PropTypes.object,
  editTransaction: PropTypes.func,
  updateTransaction: PropTypes.func,
  addTransactionQuery: PropTypes.func,
  handleClose: PropTypes.func
}

const formContainer = css`
  color: black;
  background-color: white;
  padding: 2px 30px 10px 30px;
`

export default compose(
  graphql(addTransactionQuery, { name: 'addTransactionQuery' }),
  graphql(updateTransaction, { name: 'updateTransaction' })
)(AddTransaction)
