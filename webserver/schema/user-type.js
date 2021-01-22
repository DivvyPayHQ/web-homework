const graphql = require('graphql')
const {
  GraphQLList,
  GraphQLString,
  GraphQLObjectType
} = graphql

const { find: findTransactions } = require('../query-resolvers/transaction-resolvers')

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    dob: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    transactions: {
      type: new GraphQLList(TransactionType),
      resolve (parentValue, args) {
        return findTransactions({ user_id: parentValue.id })
      }
    }
  })
})

module.exports = UserType

// Importing dependent types here prevents infinite loop errors
const TransactionType = require('./transaction-type')
