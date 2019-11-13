import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import CSVReader from 'react-csv-reader'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import Transactions from '../transactions/Transactions'
import { validateUploadedData } from '../../utilities/utilities'

const ADD_TRANSACTION = gql`
  mutation(
    $amount: Float!
    $debit: Boolean!
    $credit: Boolean!
    $description: String!
    $dateAdded: String!
  ) {
    addTransaction(
      amount: $amount
      debit: $debit
      credit: $credit
      description: $description
      dateAdded: $dateAdded
    ) {
      amount
      id
      description
      credit
      debit
      dateAdded
    }
  }
`

const Upload = () => {
  const [transactions, setTransactions] = useState(null)
  const [error, setError] = useState(false)
  const [addTransaction] = useMutation(ADD_TRANSACTION)
  const parseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header => header.toLowerCase().replace(/\W/g, '_')
  }

  const handleData = data => {
    const validData = validateUploadedData(data)

    if (!validData) {
      return setError(true)
    }

    setError(false)
    return setTransactions(data)
  }

  useEffect(() => {
    transactions && transactions.map(d => {
      const date = new Date()
      const dateAdded = `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getUTCFullYear()}`
      return addTransaction({
        variables: {
          ...d,
          amount: parseFloat(d.amount),
          dateAdded
        }
      })
    })
  }, [transactions])

  return (
    <div className='upload-wrapper' css={layoutStyle}>
      <h3>Upload</h3>
      <p className='upload-instructions'>Upload your CSV file of transactions below.</p>
      <CSVReader
        cssClass='upload-csv-input'
        onFileLoaded={handleData}
        parserOptions={parseOptions}
      />
      {error && <p className='upload-error'>There was an error uploading your file because one or more required fields are empty or null</p>}
      <Transactions
        categoryType='car'
      />
    </div>
  )
}

const layoutStyle = css`
  .upload-csv-input {
    margin-bottom: 20px;
  }

  .upload-error {
    background-color: rgba(157, 21, 47, 0.06);
    color: #9d152f;
    padding: 8px 15px;
    width: 50%;
  }
`

export default Upload
