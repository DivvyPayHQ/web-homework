import { gql, useMutation } from '@apollo/client'

const DELETE_USER = gql`
  mutation DeleteMerchant($id: ID!) {
    deleteMerchant(id: $id) {
      id
    }
  }
`

/************************************
 * DEFAULT FUNCTION
 ***********************************/
const useLazyDeleteMerchant = (
  options = {
    variables: {}
  }
) => {
  const [deleteMerchant, { called, data, error, loading }] = useMutation(DELETE_USER, options)

  return {
    called,
    deleted: !!data?.deleteMerchant?.id,
    error,
    loading,
    mutation: deleteMerchant
  }
}

export default useLazyDeleteMerchant
