/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import { GET_TRANSACTIONS } from './ViewTransaction'
import { useMutation } from '@apollo/react-hooks'
import { Wrapper, Input, PageWrapper, Title, Label } from './AddUser'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const ADD_MERCHANT = gql`
  mutation AddMerchant($merchantName: String) {
    addMerchant(merchantName: $merchantName) {
      id
      merchantName
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

const addMerchant = () => {
  const [merchantName, setMerchantName] = useState('')
  const [addMerchant, { merchantData }] = useMutation(ADD_MERCHANT, {
  })

  const handleAdd = () => {
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
    <Wrapper>
      <PageWrapper>
        <Title>Add <br /> Merchant</Title>
        <TextField
          id='standard-multiline-flexible'
          label='Merchant Name'
          multiline
          onChange={(e) => setMerchantName(e.target.value)}
          rowsMax={4}
          value={merchantName}
        />
      </PageWrapper>
      <Link style={{ textDecoration: 'none' }} to='/'><Button onClick={() => handleAdd()} style={{ width: '150px', color: 'gray', marginTop: '50px' }} variant='outlined'>ADD</Button></Link>
    </Wrapper>
  )
}

export default addMerchant
