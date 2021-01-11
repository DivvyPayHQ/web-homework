import gql from 'graphql-tag'

const getTransactionQuery = gql`
  {
    transactions {
      user_id
      description
      merchant_id
      debit
      credit
      amount
    }
  }
`

// const addTransactionQuery = gql`
//     mutation{
//       addTransaction(user_id:"", description:"", merchant_id:"", debit:, credit:, amount:){
//         description
//         id
//       }
//   }
// `

export { getTransactionQuery }
// export { addTransactionQuery }

// export {getTransactionQuery, addTransactionQuery}
