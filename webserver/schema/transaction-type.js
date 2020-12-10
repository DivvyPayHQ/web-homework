const graphql = require('graphql')
const path = require('path')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLFloat
} = graphql

const { UserModel: User } = require(path.join('..', 'data-models', 'User'))
const { MerchantModel: Merchant } = require(path.join('..', 'data-models', 'Merchant'))

const TransactionType = new GraphQLObjectType({
  name: 'Transaction',
  fields: () => ({
    id: { type: GraphQLString },
    user: {
      type: UserType,
      resolve (parentValue, args) {
        return User.findById(parentValue.user_id).populate('user')
      }
    },
    merchant: {
      type: MerchantType,
      resolve (parentValue, args) {
        return Merchant.findById(parentValue.merchant_id).populate('merchant')
      }
    },
    user_id: { type: GraphQLString },
    description: { type: GraphQLString },
    merchant_id: { type: GraphQLString },
    debit: { type: GraphQLBoolean },
    credit: { type: GraphQLBoolean },
    amount: { type: GraphQLFloat },
    category: { type: GraphQLString }
  })
})

module.exports = TransactionType

const UserType = require('./user-type')
const MerchantType = require('./merchant-type')
