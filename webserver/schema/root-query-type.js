const graphql = require('graphql')
const TransactionType = require('./transaction-type')
const Transactions = require('../query-resolvers/transaction-resolvers.js')
const UserType = require('./user-type')
const Users = require('../query-resolvers/user-resolvers.js')
const MerchantType = require('./merchant-type')
const Merchants = require('../query-resolvers/merchant-resolvers.js')

const {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} = graphql
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    transaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Transactions.findOneTransaction(args.id)
      }
    },
    transactions: {
      type: GraphQLList(TransactionType),
      args: {
        amount: { type: GraphQLFloat },
        credit: { type: GraphQLBoolean },
        debit: { type: GraphQLBoolean },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        user_id: { type: GraphQLString },
        category: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Transactions.findTransactions(args)
      }
    },
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Users.findOneUser(args.id)
      }
    },
    users: {
      type: GraphQLList(UserType),
      args: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Users.findUsers(args)
      }
    },
    merchant: {
      type: MerchantType,
      args: {
        id: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Merchants.findOneMerchant(args.id)
      }
    },
    merchants: {
      type: GraphQLList(MerchantType),
      args: {
        id: { type: GraphQLString },
        merchantName: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Merchants.findMerchants(args)
      }
    }
  })
})

module.exports = RootQuery
