import { gql, useMutation } from '@apollo/client'

const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: ID!) {
    deleteTransaction(id: $id) {
      id
    }
  }
`

/************************************
 * DEFAULT FUNCTION
 ***********************************/
const useLazyDeleteTransaction = (
  options = {
    variables: {}
  }
) => {
  const [deleteTransaction, { called, data, error, loading }] = useMutation(DELETE_TRANSACTION, options)

  return {
    called,
    deleted: !!data?.deleteTransaction?.id,
    error,
    loading,
    mutation: deleteTransaction
  }
}

export default useLazyDeleteTransaction
