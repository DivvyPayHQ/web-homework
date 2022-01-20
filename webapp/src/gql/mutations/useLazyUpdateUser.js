import { gql, useMutation } from '@apollo/client'

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $companyId: ID, $dob: String, $firstName: String, $lastName: String) {
    updateUser(id: $id, companyId: $companyId, dob: $dob, firstName: $firstName, lastName: $lastName) {
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
const useLazyUpdateUser = (
  options = {
    variables: {}
  }
) => {
  const [updateUser, { called, data, error, loading }] = useMutation(UPDATE_USER, options)

  return {
    called,
    error,
    loading,
    mutation: updateUser,
    user: data?.updateUser || null
  }
}

export default useLazyUpdateUser
