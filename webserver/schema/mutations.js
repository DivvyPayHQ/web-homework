const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLFloat } = graphql
const { TransactionModel } = require('../data-models/Transaction')
const TransactionType = require('./transaction-type')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTransaction: {
      type: TransactionType,
      args: {
        user_id: { type: GraphQLString },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        debit: { type: GraphQLBoolean },
        credit: { type: GraphQLBoolean },
        amount: { type: GraphQLFloat },
        dateAdded: { type: GraphQLString },
        transactionId: { type: GraphQLString }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { user_id, description, merchant_id, debit, credit, amount, dateAdded, transactionId }) {
        return (new TransactionModel({ user_id, description, merchant_id, debit, credit, amount, dateAdded, transactionId })).save()
      }
    },
    deleteTransaction: {
      type: TransactionType,
      args: {
        transactionId: { type: GraphQLString }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { transactionId }) {
        return TransactionModel.findOneAndDelete({ transactionId })
      }
    },
    updatedTransaction: {
      type: TransactionType,
      args: {
        transactionId: { type: GraphQLString }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { transactionId }) {
        return TransactionModel.findOneAndUpdate({ transactionId })
      }
    }
  }
})

module.exports = mutation
