const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLFloat, GraphQLNonNull } = graphql
const { TransactionModel } = require('../data-models/Transaction')
const TransactionType = require('./transaction-type')
const Transactions = require('../query-resolvers/transaction-resolvers.js')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () =>  ({
    addTransaction: {
      type: TransactionType,
      args: {
        user_id: { type: GraphQLString },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        debit: { type: GraphQLBoolean },
        credit: { type: GraphQLBoolean },
        amount: { type: GraphQLFloat }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, args) {
        return Transactions.addOne(args)
      }
    },
    updateTransaction: {
      type: TransactionType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString)},
        user_id: { type: GraphQLString },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        debit: { type: GraphQLBoolean },
        credit: { type: GraphQLBoolean },
        amount: { type: GraphQLFloat }
      },
      resolve(parentValue, { id, user_id, description, merchant_id, debit, credit, amount }) {
        return TransactionModel.findByIdAndUpdate(
          id,
          { user_id, description, merchant_id, debit, credit, amount },
          { overwite: true, new: true, useFindAndModify: false }
        )
      }
    },
    deleteTransaction: {
      type: TransactionType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString)},
      },
      // Tried multiple ways to get this working, but the id never seems to match,
      resolve(parentValue, { id }) {
        return TransactionModel.deleteMany({id})
      }
    }
  })
})

module.exports = mutation
