import { gql, useMutation } from '@apollo/client'

const UPDATE_MERCHANT = gql`
  mutation UpdateMerchant($description: String, $id: ID!, $name: String) {
    updateMerchant(description: $description, id: $id, name: $name) {
      description
      id
      inserted_at
      name
      updated_at
    }
  }
`

/************************************
 * DEFAULT FUNCTION
 ***********************************/
const useLazyUpdateMerchant = (
  options = {
    variables: {}
  }
) => {
  const [updateMerchant, { called, data, error, loading }] = useMutation(UPDATE_MERCHANT, options)

  return {
    called,
    error,
    loading,
    mutation: updateMerchant,
    merchant: data?.updateMerchant || null
  }
}

export default useLazyUpdateMerchant
