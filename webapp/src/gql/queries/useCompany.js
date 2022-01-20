import { gql, useQuery } from '@apollo/client'

export const COMPANY = gql`
  query Company($id: ID!) {
    company(id: $id) {
      availableCredit
      creditLine
      id
      insertedAt
      name
      updatedAt
    }
  }
`

/************************************
 * DEFAULT FUNCTION
 ***********************************/
function useCompany (variables) {
  const { data, error, loading } = useQuery(COMPANY, { variables })

  return {
    company: data?.company || null,
    error,
    loading
  }
}

export default useCompany
