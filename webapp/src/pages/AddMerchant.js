/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import gql from 'graphql-tag'
import { GET_TRANSACTIONS } from './ViewTransaction'
import { useMutation } from '@apollo/react-hooks'
const ADD_MERCHANT = gql`
  mutation AddMerchant($merchantName: String) {
    addMerchant(merchantName: $merchantName) {
      id
      merchantName
    }
  }
`

const addMerchant = () => {
  const [merchantName, setMerchantName] = useState('')
  const [addMerchant, { merchantData }] = useMutation(ADD_MERCHANT, {
    // refetchQueries: [{
    //   query: GET_TRANSACTIONS
    // }]
  })

  function handleAdd () {
    if (merchantName.length < 1) {
      alert('Please complete all inputs')
    } else {
      addMerchant({
        variables: { 'merchantName': merchantName }
      })
      setMerchantName('')
    }
  }
  return (
    <div>
      <input onChange={e => setMerchantName(e.target.value)} value={merchantName} />
      <button onClick={() => handleAdd()}>ADD MERCHANT</button>
    </div>
  )
}

export default addMerchant
