/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import gql from 'graphql-tag'
import { GET_TRANSACTIONS } from './ViewTransaction'
import { useMutation } from '@apollo/react-hooks'

const ADD_USER = gql`
  mutation AddUser($firstName: String, $lastName: String) {
    addUser(firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
        }
  }
`

const AddUser = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [addUser, { merchantData }] = useMutation(ADD_USER, {
    refetchQueries: [{
      query: GET_TRANSACTIONS
    }]
  })

  function handleAdd () {
    if (firstName.length < 1 || lastName.length < 1) {
      // eslint-disable-next-line no-undef
      alert('Please complete all inputs')
    } else {
      addUser({
        variables: { 'firstName': firstName,
          'lastName': lastName }
      })
      setFirstName('')
      setLastName('')
    }
  }
  return (
    <div>
      <label>first name</label>
      <input onChange={e => setFirstName(e.target.value)} value={firstName} />
      <label>last name</label>
      <input onChange={e => setLastName(e.target.value)} value={lastName} />
      <button onClick={() => handleAdd()}>ADD USER</button>
    </div>
  )
}

export default AddUser
