import { gql, useMutation } from '@apollo/client'

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`

/************************************
 * DEFAULT FUNCTION
 ***********************************/
const useLazyDeleteUser = (
  options = {
    variables: {}
  }
) => {
  const [deleteUser, { called, data, error, loading }] = useMutation(DELETE_USER, options)

  return {
    called,
    deleted: !!data?.deleteUser?.id,
    error,
    loading,
    mutation: deleteUser
  }
}

export default useLazyDeleteUser
