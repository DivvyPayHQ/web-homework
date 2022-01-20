import { gql, useQuery } from '@apollo/client'

export const USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      company {
        availableCredit
        creditLine
        id
        insertedAt
        name
        updatedAt
      }
      companyId
      dob
      firstName
      lastName
      insertedAt
      updatedAt
    }
  }
`

/************************************
 * DEFAULT FUNCTION
 ***********************************/
function useUser (variables) {
  const { data, error, loading } = useQuery(USER, { variables })

  return {
    error,
    loading,
    user: data?.user || null
  }
}

export default useUser
