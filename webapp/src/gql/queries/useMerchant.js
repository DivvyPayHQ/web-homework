import { gql, useQuery } from '@apollo/client'

export const MERCHANT = gql`
  query Merchant($id: ID!) {
    merchant(id: $id) {
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
function useMerchant (variables) {
  const { data, error, loading } = useQuery(MERCHANT, { variables })

  return {
    error,
    loading,
    merchant: data?.merchant || null
  }
}

export default useMerchant
