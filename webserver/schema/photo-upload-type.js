const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString
} = graphql

const PhotoUploadType = new GraphQLObjectType({
  name: 'Photo-Upload',
  fields: () => ({
    user_id: { type: GraphQLString },
    photo: { type: GraphQLString }
  })
})

module.exports = PhotoUploadType
