import { gql, useMutation } from '@apollo/client'

const CREATE_MERCHANT = gql`
  mutation CreateMerchant($description: String!, $name: String!) {
    createMerchant(description: $description, name: $name) {
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
const useLazyCreateMerchant = (
  options = {
    variables: {}
  }
) => {
  const [createMerchant, { called, data, error, loading }] = useMutation(CREATE_MERCHANT, options)

  return {
    called,
    merchant: data?.createMerchant || null,
    error,
    loading,
    mutation: createMerchant
  }
}

export default useLazyCreateMerchant
