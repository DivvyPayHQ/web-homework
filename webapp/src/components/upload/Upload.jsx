import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import CSVReader from 'react-csv-reader'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import uuidv4 from 'uuid/v4'

import Transactions from '../transactions/Transactions'
import { validateUploadedData } from '../../helpers/helpers'

const ADD_TRANSACTION = gql`
  mutation(
    $amount: Float!
    $debit: Boolean!
    $credit: Boolean!
    $description: String!
    $merchant_id: String!
    $dateAdded: String!
    $transactionId: String!
    $category: String!
  ) {
    addTransaction(
      amount: $amount
      debit: $debit
      credit: $credit
      description: $description
      merchant_id: $merchant_id
      dateAdded: $dateAdded
      transactionId: $transactionId
      category: $category
    ) {
      amount
      debit
      credit
      description
      merchant_id
      dateAdded
      transactionId
      category
    }
  }
`

const Upload = () => {
  const [transactions, setTransactions] = useState(null)
  const [error, setError] = useState(false)
  const [addTransaction, { loading }] = useMutation(ADD_TRANSACTION)
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
      {/* adding key={uuidv4()} on parent element is a way to reset the CSVReader
      and allow multi uploads without refreshing the page */}
      <label className='upload-csv-input' htmlFor='csv-input' key={uuidv4()}>
        <CSVReader
          inputId='csv-input'
          onFileLoaded={handleData}
          parserOptions={parseOptions}
        />
        {loading && <div className='loading-ring' css={loadingCircleStyles}><div /><div /><div /><div /></div>}File Upload
      </label>
      {error && <p className='upload-error'>There was an error uploading your file because one or more required fieloading are empty or null</p>}
      <Transactions />
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
    max-height: 36px;

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

const loadingCircleStyles = css`
  display: inline-block;
  position: relative;
  width: 18px;
  height: 18px;
  padding-bottom: 3px;
  margin-right: 15px;
  
  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 15px;
    height: 15px;
    margin: 8px;
    border: 1px solid #000000;
    border-radius: 50%;
    animation: loading-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #000000 transparent transparent transparent;
  }
  
  div:nth-of-type(1) {
    animation-delay: -0.45s;
  }
  
  div:nth-of-type(2) {
    animation-delay: -0.3s;
  }
  
  div:nth-of-type(3) {
    animation-delay: -0.15s;
  }
  
  @keyframes loading-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export default Upload
