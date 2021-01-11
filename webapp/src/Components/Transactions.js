import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { getTransactionQuery } from '../queries/queries'

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

const Transactions = () => {
  return (
    <Query query={getTransactionQuery}>
      {({ loading, error, data }) => {
        if (loading) return <p>Relax, it's worth the wait...</p>
        if (error) return <p>Looks like we've got a problem...</p>
        return (
          <div className='container'>
            <h1>Transactions</h1>
            <div className='row'>
              {data.transactions.map((trans) => (
                <div className='col-sm'>
                  <div className='card' style={{ width: '18rem' }}>
                    <div className='card-body' key={trans.id}>
                      <h5 className='card-title'>User Id: {trans.user_id}</h5>
                      <p className='card-text'>description: {trans.description}</p>
                      <p className='card-text'>Merchant Id: {trans.merchant_id}</p>
                      <p className='card-text'>Debit {trans.debit}</p>
                      <p className='card-text'>Credit {trans.credit}</p>
                      <p className='card-text'> Amount: {trans.amount}</p>
                    </div>
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

export default Transactions
