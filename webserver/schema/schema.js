const graphql = require('graphql')
const { GraphQLSchema } = graphql

const RootQueryType = require('./root-query-type')
const mutations = require('./mutations')

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: mutations
})
