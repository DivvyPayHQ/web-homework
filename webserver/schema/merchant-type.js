const graphql = require('graphql')
const {
  GraphQLString,
  GraphQLObjectType
} = graphql

const MerchantType = new GraphQLObjectType({
  name: 'Merchant',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString }
  })
})

module.exports = MerchantType
