import React, { Component, useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { Query, graphql } from 'react-apollo'
// import { useQuery, useMutation } from '@apollo/react-hooks'
import { getTransactionQuery, removeTransaction, updateTransaction } from '../queries/queries'
import EditTransactionForm from './EditTransactionForm'
import AddTransaction from './AddTransaction'
import Modal from '@material-ui/core/Modal'

const Transactions = props => {
  const [editing, setEditing] = useState(false)
  const [transaction, setTransaction] = useState(null)

  // function changeEdit(){
  //   return setEditing(!editing)
  // }
  // useEffect(() => {
  //   // console.log(data)
  //   // return data;
  // }, [])
  // console.log(useQuery);
  // const { loading, data } = useQuery(getTransactionQuery)
  // console.log(data);

  const deleteTrans = id => {
    console.log('This is the ID:', id)
    props.removeTransaction({
      variables: {
        transactionId: id
      },
      refetchQueries: [{ query: getTransactionQuery }]
    })
  }

  const triggerModal = (transaction) => {
    console.log(transaction);
    setTransaction(transaction);
    setEditing(true);
  }

  return (
    <Query query={getTransactionQuery}>
      {({ loading, error, data }) => {
        if (loading) return <p>Relax, it's worth the wait...</p>
        if (error) return <p>Looks like we've got a problem...</p>

        return (
          <div className='container'>
            <Modal
              aria-describedby='simple-modal-description'
              aria-labelledby='simple-modal-title'
              onClose={() => setEditing(false)}
              open={editing}
            >
              <AddTransaction
                editTransaction={editing}
                transaction={transaction}
                // transactionID={transaction.id}
              />
            </Modal>
            <h1>Transactions</h1>
            <div className='row'>
              {data.transactions.map(transaction => (
                <div className='col-sm'>
                  <div className='card' style={{ width: '18rem' }}>
                    <p>{transaction.id}</p>
                    <p>{transaction.description}</p>
                    
                    <button onClick={e => deleteTrans(transaction.id)}>Delete</button>
                    <button onClick={() => triggerModal(transaction)}>Edit </button>
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

export default graphql(
  removeTransaction, { name: 'removeTransaction' },
  updateTransaction, { name: 'updateTransaction' }
)(Transactions)
