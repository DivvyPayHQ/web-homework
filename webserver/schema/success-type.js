const graphql = require('graphql')
const {
  GraphQLBoolean,
  GraphQLObjectType
} = graphql

const SuccessType = new GraphQLObjectType({
  name: 'Success',
  fields: () => ({
    success: { type: GraphQLBoolean }
  })
})

module.exports = SuccessType
