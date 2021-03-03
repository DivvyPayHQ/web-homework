const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString
} = graphql

const CategoryType = new GraphQLObjectType({
  name: 'Category',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString }
  })
})

module.exports = CategoryType
