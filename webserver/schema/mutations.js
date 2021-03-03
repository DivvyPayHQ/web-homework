/* eslint-disable camelcase */
const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLFloat } = graphql
const { TransactionModel } = require('../data-models/Transaction')
const { UserModel } = require('../data-models/User')
const TransactionType = require('./transaction-type')
const UserType = require('./user-type')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTransaction: {
      type: TransactionType,
      args: {
        user_id: { type: GraphQLString },
        category_id: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        amount: { type: GraphQLFloat },
        credit: { type: GraphQLBoolean },
        description: { type: GraphQLString },
        date: { type: GraphQLString }
      },
      resolve (parentValue, { user_id, category_id, merchant_id, amount, credit, description, date }) {
        return (new TransactionModel({ user_id, category_id, merchant_id, amount, credit, description, date })).save()
      }
    },
    deleteTransaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLString }
      },
      async resolve (parentValue, { id }) {
        const transaction = await TransactionModel.findById(id)
        await transaction.delete()
      }
    },
    editTransaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLString },
        user_id: { type: GraphQLString },
        category_id: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        amount: { type: GraphQLFloat },
        credit: { type: GraphQLBoolean },
        description: { type: GraphQLString },
        date: { type: GraphQLString }
      },
      async resolve (parentValue, { id, user_id, description, merchant_id, debit, credit, amount, category_id, date }) {
        const transaction = await TransactionModel.findById(id)
        if (user_id) transaction.user_id = user_id
        if (category_id) transaction.category_id = category_id
        if (merchant_id) transaction.merchant_id = merchant_id
        if (amount) transaction.amount = amount
        if (credit) transaction.credit = credit
        if (date) transaction.date = date
        if (description) transaction.description = description

        await transaction.save()
        return transaction
      }
    },
    addUser: {
      type: UserType,
      args: {
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        dob: { type: GraphQLString }
      },
      resolve (parentValue, { first_name, last_name, dob }) {
        return (new UserModel({ first_name, last_name, dob })).save()
      }
    }
  }
})

module.exports = mutation
