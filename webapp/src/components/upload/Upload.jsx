import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import CSVReader from 'react-csv-reader'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import uuidv4 from 'uuid/v4'

import Transactions from '../transactions/Transactions'
import { validateUploadedData } from '../../utilities/utilities'

const ADD_TRANSACTION = gql`
  mutation(
    $amount: Float!
    $debit: Boolean!
    $credit: Boolean!
    $description: String!
    $merchant_id: String!
    $dateAdded: String!
    $transactionId: String!
  ) {
    addTransaction(
      amount: $amount
      debit: $debit
      credit: $credit
      description: $description
      merchant_id: $merchant_id
      dateAdded: $dateAdded
      transactionId: $transactionId
    ) {
      amount
      debit
      credit
      description
      merchant_id
      dateAdded
      transactionId
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
      const transactionId = uuidv4()
      const builtVariable = {
        ...d,
        amount: parseFloat(d.amount),
        merchant_id: d.merchant_id.toString(),
        dateAdded,
        transactionId
      }
      return addTransaction({
        variables: builtVariable
      })
    })
  }, [transactions])

  return (
    <div className='upload-wrapper' css={layoutStyle}>
      <h3>Upload</h3>
      <p className='upload-instructions'>Upload your CSV file of transactions below.</p>
      <label className='upload-csv-input' htmlFor='csv-input'>
        <CSVReader
          // onError={setError(true)}
          inputId='csv-input'
          onFileLoaded={handleData}
          parserOptions={parseOptions}
        />
        File Upload
      </label>
      {error && <p className='upload-error'>There was an error uploading your file because one or more required fields are empty or null</p>}
      <Transactions
        categoryType='car'
      />
    </div>
  )
}

const layoutStyle = css`
  .upload-csv-input {
    appearance: none;
    background-color: #ffffff;
    border: none;
    border-radius: 3px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.08);
    display: inline-block;
    font-family: 'Calibre-Regular';
    font-size: 18px;
    padding: 8px 15px;
    margin-bottom: 20px;

    &:hover,
    &focus {
      box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.12);
      cursor: pointer;
    }
  }

  #csv-input {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .upload-error {
    background-color: rgba(157, 21, 47, 0.06);
    color: #9d152f;
    padding: 8px 15px;
    width: 50%;
  }
`

export default Upload
