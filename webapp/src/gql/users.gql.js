const gql = require('graphql-tag')

export const getUsersQuery = gql`
  query getUsersQuery {
    users {
      id
      firstName
      lastName
    }
  }
`
