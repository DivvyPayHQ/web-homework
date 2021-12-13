import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { css } from '@emotion/core'
import { useNavigate, useParams } from 'react-router-dom'
import { useTokens } from '@kyper/tokenprovider'
import { Button } from '@kyper/button'
import { TextInput } from '@kyper/input'
import { Select } from '@kyper/select'
import { SelectionBox } from '@kyper/selectionbox'
import { useMutation, useQuery, useLazyQuery } from '@apollo/client'

import CreateTransaction from 'src/gql/CreateTransaction.gql'
import DeleteTransaction from 'src/gql/DeleteTransaction.gql'
import GetTransactions from 'src/gql/transactions.gql'
import GetTransaction from 'src/gql/GetTransaction.gql'
import UpdateTransaction from 'src/gql/UpdateTransaction.gql'
import GetUsers from 'src/gql/GetUsers.gql'
import GetMerchants from 'src/gql/GetMerchants.gql'

import ROUTES from 'src/constants/Routes'

/* eslint-disable camelcase */
export function TxModal (props) {
  const navigate = useNavigate()
  const tokens = useTokens()
  const styles = getStyles(tokens)
  const params = useParams()
  const [localTx, setLocalTx] = useState({ credit: false, debit: true })

  const { data: userData, loading: usersLoading } = useQuery(GetUsers)
  const { data: merchantData = {}, loading: merchantsLoading } = useQuery(GetMerchants)

  const [getTransaction, { loading: transactionLoading, data: transactionData = {} }] = useLazyQuery(GetTransaction, {
    onCompleted: data => {
      setLocalTx(data.transaction)
    }
  })

  const mutationOptions = {
    onCompleted: () => navigate(ROUTES.TRANSACTIONS),
    refetchQueries: [
      // This is definitely not optimal
      { query: GetTransactions }
    ]
  }

  const [createTransaction] = useMutation(CreateTransaction, mutationOptions)
  const [updateTransaction] = useMutation(UpdateTransaction, mutationOptions)
  const [deleteTransaction] = useMutation(DeleteTransaction, mutationOptions)

  useEffect(() => {
    if (params.id) {
      getTransaction({
        variables: { id: params.id }
      })
    }
  }, [params.id])

  const onChange = ({ target }) => {
    // Fancy validation could be done...maybe with types from GraphQL?
    setLocalTx(prevState => ({ ...prevState, [target.name]: target.value }))
  }

  const handleSave = () => {
    const { id, credit, debit, amount, date, description, merchant, merchant_id, user, user_id } = localTx

    if (params.id) {
      updateTransaction({
        variables: {
          id,
          description,
          date,
          debit,
          credit,
          amount: parseFloat(amount),
          merchant_id: merchant_id || merchant.id,
          user_id: user_id || user.id
        }
      })
    } else {
      createTransaction({
        variables: {
          description,
          date,
          debit,
          credit,
          amount: parseFloat(amount),
          merchant_id,
          user_id
        }
      })
    }
  }

  let isLoading = merchantsLoading || usersLoading

  isLoading = params.id ? transactionLoading || isLoading : isLoading

  return (
    <Modal isOpen
      onRequestClose={() => {
        navigate(ROUTES.TRANSACTIONS)
      }}
      style={styles}
    >
      <div css={headerStyle(tokens)}>
        <Button aria-label='Close' onClick={() => navigate(ROUTES.TRANSACTIONS)}>X</Button>
      </div>
      {!isLoading ? (
        <div css={containerStyle}>
          <TextInput
            label='Date'
            name='date'
            onChange={onChange}
            value={localTx.date}
          />
          <TextInput
            label='Description'
            name='description'
            onChange={onChange}
            value={localTx.description}
          />
          <TextInput
            iconLeft={(
              <span aria-hidden style={{ position: 'relative', top: -4 }}>
                &#36;
              </span>
            )}
            label='Amount'
            name='amount'
            onChange={onChange}
            value={localTx.amount}
          />
          {!params.id || (transactionData.transaction && merchantData.merchants) ? (
            <Select
              id='merchant'
              initialSelectedItem={params.id ? {
                label: transactionData.transaction.merchant.name,
                value: transactionData.transaction.merchant.id
              } : null}
              items={merchantData?.merchants?.map(merchant => ({ label: merchant.name, value: merchant.id }))}
              label='Merchant'
              onChange={({ value }) => onChange({ target: { name: 'merchant_id', value } })}
            />
          ) : null}

          {!params.id || (transactionData.transaction && userData.users) ? (
            <Select
              id='user'
              initialSelectedItem={params.id ? {
                label: transactionData.transaction.user.first_name,
                value: transactionData.transaction.user.id
              } : null}
              items={userData?.users?.map(user => ({ label: user.first_name, value: user.id }))}
              label='User'
              onChange={({ value }) => onChange({ target: { name: 'user_id', value } })}
            />
          ) : null}

          <div>
            <SelectionBox
              checked={localTx.credit}
              id='credit'
              label='Credit'
              name='creditdebit'
              onChange={() => setLocalTx(prevState => ({ ...prevState, credit: !prevState.credit, debit: prevState.credit }))}
              style={{
                marginBottom: 16
              }}
              value='credit'
              variant='radio'
            />
            <SelectionBox
              checked={localTx.debit}
              id='debit'
              label='Debit'
              name='creditdebit'
              onChange={() => setLocalTx(prevState => ({ ...prevState, credit: !prevState.credit, debit: prevState.credit }))}
              value='debit'
              variant='radio'
            />
          </div>

          <Button onClick={handleSave} variant='primary'>Save</Button>
          {params.id ? (<Button onClick={() => deleteTransaction({ variables: { id: params.id } })} variant='danger'>Delete</Button>) : null}
        </div>
      ) : null}
    </Modal>
  )
}

const headerStyle = tokens => css`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${tokens.Spacing.XLarge}px;
`

const containerStyle = css`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: px;
  grid-row-gap: 50px;
`

// Modal
const getStyles = tokens => ({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  content: {
    background: tokens.Color.Neutral900,
    border: 'none',
    top: 80,
    left: 80,
    right: 80,
    bottom: 80,
    padding: tokens.Spacing.XLarge
  }
})
