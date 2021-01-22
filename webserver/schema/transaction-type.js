const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLFloat
} = graphql

const CategoryType = require('./category-type')
const { findOne: findCategory } = require('../query-resolvers/category-resolvers')
const { findOne: findUser } = require('../query-resolvers/user-resolvers')
const { findOne: findMerchant } = require('../query-resolvers/merchant-resolvers')

const TransactionType = new GraphQLObjectType({
  name: 'Transaction',
  fields: () => ({
    id: { type: GraphQLString },
    description: { type: GraphQLString },
    merchant: {
      type: MerchantType,
      resolve (parentValue) {
        return findMerchant(parentValue.merchant_id)
      }
    },
    debit: { type: GraphQLBoolean },
    credit: { type: GraphQLBoolean },
    amount: { type: GraphQLFloat },
    category: { 
      type: CategoryType,
      resolve (parentValue, args) {
        return findCategory(parentValue.category_id)
      }
    },
    user: {
      type: UserType,
      resolve (parentValue) {
        return findUser(parentValue.user_id)
      }
    },
  })
})

module.exports = TransactionType

// Importing dependent types here prevents infinite loop errors
const MerchantType = require('./merchant-type');
const UserType = require('./user-type')
