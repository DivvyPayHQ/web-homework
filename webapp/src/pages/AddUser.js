/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import { GET_TRANSACTIONS } from './ViewTransaction'
import { useMutation } from '@apollo/react-hooks'
import styled from '@emotion/styled'
import Button from '@material-ui/core/Button'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const ADD_USER = gql`
  mutation AddUser($firstName: String, $lastName: String) {
    addUser(firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
        }
  }
`
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  }
}))

const AddUser = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [addUser, { merchantData }] = useMutation(ADD_USER, {
    refetchQueries: [{
      query: GET_TRANSACTIONS
    }]
  })

  const handleAdd = () => {
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
    <Wrapper>
      <PageWrapper>
        <Title>Add User</Title>
        <TextField
          id='standard-multiline-flexible'
          label='First Name'
          multiline
          onChange={(e) => setFirstName(e.target.value)}
          rowsMax={4}
          value={firstName}
        />
        <TextField
          id='standard-multiline-flexible'
          label='Last Name'
          multiline
          onChange={(e) => setLastName(e.target.value)}
          rowsMax={4}
          value={lastName}
        />
      </PageWrapper>
      <Link style={{ textDecoration: 'none' }} to='/'><Button onClick={() => handleAdd()} style={{ width: '150px', color: 'gray', marginTop: '50px' }} variant='outlined'>ADD</Button></Link>
    </Wrapper>
  )
}
export default AddUser

export const Wrapper = styled('div')`
min-height: 600px;
display:flex;
justify-content: center;
align-items: center;
flex-direction: column;
`
export const PageWrapper = styled('div')`
display:flex;
flex-direction: column;

`
export const Title = styled('h1')`

`

export const Input = styled('input')`
width: 200px;
height: 35px;
box-shadow: 0 0px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
transition: all 0.3s cubic-bezier(.25,.8,.25,1);
border:none;
margin:5px;
outline: none;
`
export const Label = styled('label')`
color: gray;
`
