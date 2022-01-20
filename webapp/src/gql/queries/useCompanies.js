import { gql, useQuery } from '@apollo/client'

export const COMPANIES = gql`
  query Companies {
    companies {
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
function useCompanies () {
  const { data, error, loading } = useQuery(COMPANIES)

  return {
    companies: data?.companies || [],
    error,
    loading
  }
}

export default useCompanies
