import React, { useState, useEffect } from 'react'
import { css } from '@emotion/core'
import CSVReader from 'react-csv-reader'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import Transactions from '../transactions/Transactions'

const ADD_TRANSACTION = gql`
  mutation(
    $amount: Float!
    $debit: Boolean!
    $credit: Boolean!
    $description: String!
  ) {
    addTransaction(
      amount: $amount
      debit: $debit
      credit: $credit
      description: $description
    ) {
      amount
      id
      description
      credit
      debit
    }
  }
`

const Upload = () => {
  const [transactions, setTransactions] = useState(null)
  const [addTransaction] = useMutation(ADD_TRANSACTION)
  const parseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: header => header.toLowerCase().replace(/\W/g, '_')
  }

  const handleData = data => {
    setTransactions(data)
  }

  useEffect(() => {
    transactions && transactions.map(d => addTransaction({
      variables: { ...d, amount: parseFloat(d.amount) }
    }))
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
`

export default Upload
