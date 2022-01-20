import { gql, useMutation } from '@apollo/client'

const CREATE_USER = gql`
  mutation CreateUser($companyId: ID!, $dob: String!, $firstName: String!, $lastName: String!) {
    createUser(companyId: $companyId, dob: $dob, firstName: $firstName, lastName: $lastName) {
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
const useLazyCreateUser = (
  options = {
    variables: {}
  }
) => {
  const [createUser, { called, data, error, loading }] = useMutation(CREATE_USER, options)

  return {
    called,
    error,
    loading,
    mutation: createUser,
    user: data?.createUser || null
  }
}

export default useLazyCreateUser
