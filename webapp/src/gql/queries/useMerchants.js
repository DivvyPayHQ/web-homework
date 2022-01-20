import { gql, useQuery } from '@apollo/client'

export const MERCHANTS = gql`
  query Merchants {
    merchants {
      description
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
function useMerchants () {
  const { data, error, loading } = useQuery(MERCHANTS)

  return {
    error,
    loading,
    merchants: data?.merchants || []
  }
}

export default useMerchants
