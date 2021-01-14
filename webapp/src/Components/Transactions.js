import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query, graphql } from 'react-apollo'
// import { useQuery, useMutation } from '@apollo/react-hooks'
import { getTransactionQuery, removeTransaction } from '../queries/queries'

// const getTransactionQuery = gql`
//   {
//     transactions {
//       user_id
//       description
//       merchant_id
//       debit
//       credit
//       amount
//     }
//   }
// `


//   const removeTransaction = gql`
//   mutation DeleteTransaction($transactionId: String!) {
//     deleteTransaction(transactionId: $transactionId) {
//       id
//     }
//   }
// `
// }

const Transactions = (props) => {

  const deleteTrans = (id) => {
    console.log("This is the ID:", id);
    props.removeTransaction({
      variables: {
        transactionId: id
      }
    })
  }

  const editTransaction = (transaction) => {
    console.log(transaction);
  }

  return (
    <Query query={getTransactionQuery}>
      {({ loading, error, data }) => {
        if (loading) return <p>Relax, it's worth the wait...</p>
        if (error) return <p>Looks like we've got a problem...</p>
        return (
          <div className='container'>
            <h1>Transactions</h1>
            <div className='row'>
              {data.transactions.map((transaction) => (
                <div className='col-sm'>
                  <div className='card' style={{ width: '18rem' }}>
                    <div className='card-body' key={transaction.id}>
                      <h5 className='card-title'>User Id: {transaction.user_id}</h5>
                      <p className='card-text'>description: {transaction.description}</p>
                      <p className='card-text'>Merchant Id: {transaction.merchant_id}</p>
                      <p className='card-text'>Debit {transaction.debit}</p>
                      <p className='card-text'>Credit {transaction.credit}</p>
                      <p className='card-text'> Amount: {transaction.amount}</p>
                    </div>
                    <button onClick={(e) => deleteTrans(transaction.id)}>Delete</button>

                    <button onClick={() => editTransaction(transaction)}>Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }}
    </Query>
  )
}

// export default Transactions
export default graphql(removeTransaction, { name: 'removeTransaction' })(Transactions)

