const gql = require('graphql-tag')

export const getMerchants = gql`
  query getMerchants {
    merchants {
      name
      id
    }
  }
`
