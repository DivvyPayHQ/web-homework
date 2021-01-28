const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLFloat } = graphql
const { TransactionModel } = require('../data-models/Transaction')
const TransactionType = require('./transaction-type')

const parseParams = function(user_id, description, merchant_id, debit, credit, amount) {
  let keys = ['user_id', 'description', 'merchant_id', 'debit', 'credit', 'amount']
  let result = {}
  for (let i = 0; i < arguments.length; i++) {
    if (arguments[i]) {
      result[keys[i]] = arguments[i]
    }
  }
  return result
}

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
        amount: { type: GraphQLFloat }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { user_id, description, merchant_id, debit, credit, amount }) {
        return (new TransactionModel({ user_id, description, merchant_id, debit, credit, amount })).save()
      }
    },
    delete_article_by_pk: {
      type: TransactionType,
      args: {
        id: { type: GraphQLString }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { id }) {
        return TransactionModel.deleteOne({ _id: id })
      }
    },
    editTransaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLString },
        user_id: { type: GraphQLString },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        debit: { type: GraphQLBoolean },
        credit: { type: GraphQLBoolean },
        amount: { type: GraphQLFloat }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { id, user_id, description, merchant_id, debit, credit, amount }) {
        const params = parseParams(user_id, description, merchant_id, debit, credit, amount)
        return TransactionModel.updateOne({ _id: id }, { $set: params })
      }
    }
  }
})

module.exports = mutation
