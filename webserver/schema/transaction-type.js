const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLFloat
} = graphql

const UserType = require('./user-type')
const { findOne: findUser } = require('../query-resolvers/user-resolver')

const CategoryType = require('./category-type')
const { findOne: findCategory } = require('../query-resolvers/category-resolver')

const MerchantType = require('./merchant-type')
const { findOne: findMerchant } = require('../query-resolvers/merchant-resolver')

const TransactionType = new GraphQLObjectType({
  name: 'Transaction',
  fields: () => ({
    id: { type: GraphQLString },
    user: {
      type: UserType,
      resolve (parentValue) {
        return findUser(parentValue.user_id)
      }
    },
    category: {
      type: CategoryType,
      resolve (parentValue) {
        return findCategory(parentValue.category_id)
      }
    },
    merchant: {
      type: MerchantType,
      resolve (parentValue) {
        return findMerchant(parentValue.merchant_id)
      }
    },
    amount: { type: GraphQLFloat },
    credit: { type: GraphQLBoolean },
    description: { type: GraphQLString },
    date: { type: GraphQLString }
  })
})

module.exports = TransactionType
