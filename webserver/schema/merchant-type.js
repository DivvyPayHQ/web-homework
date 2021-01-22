const graphql = require('graphql')
const {
  GraphQLList,
  GraphQLString,
  GraphQLObjectType
} = graphql

const { find: findTransactions } = require('../query-resolvers/transaction-resolvers')

const MerchantType = new GraphQLObjectType({
  name: 'Merchant',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    transactions: {
      type: new GraphQLList(TransactionType),
      resolve (parentValue, args) {
        return findTransactions({ merchant_id: parentValue.id })
      }
    }
  })
})

module.exports = MerchantType

// Importing here prevents infinite loop errors
const TransactionType = require('./transaction-type')
