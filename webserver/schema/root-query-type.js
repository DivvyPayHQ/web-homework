const graphql = require('graphql')
const CategoryType = require('./category-type')
const Categories = require('../query-resolvers/category-resolver')
const TransactionType = require('./transaction-type')
const Transactions = require('../query-resolvers/transaction-resolver')
const MerchantType = require('./merchant-type')
const Merchants = require('../query-resolvers/merchant-resolver')
const UserType = require('./user-type')
const Users = require('../query-resolvers/user-resolver')

const {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} = graphql
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: (test) => ({
    category: {
      type: CategoryType,
      args: {
        id: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Categories.findOne(args.id)
      }
    },
    categories: {
      type: GraphQLList(CategoryType),
      args: {
        name: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Categories.find(args)
      }
    },
    merchant: {
      type: MerchantType,
      args: {
        id: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Merchants.findOne(args.id)
      }
    },
    merchants: {
      type: GraphQLList(MerchantType),
      args: {
        name: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Merchants.find(args)
      }
    },
    transaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Transactions.findOne(args.id)
      }
    },
    transactions: {
      type: GraphQLList(TransactionType),
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
      resolve (parentValue, args) {
        return Transactions.find(args)
      }
    },
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Users.findOne(args.id)
      }
    },
    users: {
      type: GraphQLList(UserType),
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        dob: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Users.find(args)
      }
    }
  })
})

module.exports = RootQuery
