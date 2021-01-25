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
        category_id: { type: GraphQLString },
        date: { type: GraphQLString }
      },
      /* eslint-disable-next-line camelcase */
      resolve (parentValue, { user_id, description, merchant_id, debit, credit, amount, category_id, date }) {
        return (new TransactionModel({ user_id, description, merchant_id, debit, credit, amount, category_id, date })).save()
      }
    },
    deleteTransaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLString }
      },
      /* eslint-disable-next-line camelcase */
      async resolve(parentValue, { id }) {
        const transaction = await TransactionModel.findById(id)
        try {
          await transaction.delete()
          return 'success'
        } catch (e) {
          return e
        }
      }
    },
    updateTransaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLString },
        user_id: { type: GraphQLString },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        debit: { type: GraphQLBoolean },
        credit: { type: GraphQLBoolean },
        amount: { type: GraphQLFloat },
        category_id: { type: GraphQLString },
        date: { type: GraphQLString }
      },
      /* eslint-disable-next-line camelcase */
      async resolve(parentValue, { id, user_id, description, merchant_id, debit, credit, amount, category_id, date }) {
        const transaction = await TransactionModel.findById(id)
        if (user_id) {
          transaction.user_id = user_id
        }
        if (description) {
          transaction.description = description
        }
        if (merchant_id) {
          transaction.merchant_id = merchant_id
        }
        if (debit !== transaction.debit && debit !== undefined) {
          transaction.debit = debit
        }
        if (credit !== transaction.credit && credit !== undefined) {
          transaction.credit = credit
        }
        if (amount) {
          transaction.amount = amount
        }
        if (category_id) {
          transaction.category_id = category_id
        }
        if (date) {
          transaction.date = date
        }
        await transaction.save()
        return transaction
      }
    }
  }
})

module.exports = mutation
