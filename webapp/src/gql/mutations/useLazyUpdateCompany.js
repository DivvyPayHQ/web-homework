import { gql, useMutation } from '@apollo/client'

const UPDATE_COMPANY = gql`
  mutation UpdateCompany($creditLine: Int, $id: ID!, $name: String) {
    updateCompany(creditLine: $creditLine, id: $id, name: $name) {
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
const useLazyUpdateCompany = (
  options = {
    variables: {}
  }
) => {
  const [updateCompany, { called, data, error, loading }] = useMutation(UPDATE_COMPANY, options)

  return {
    called,
    company: data?.updateCompany || null,
    error,
    loading,
    mutation: updateCompany
  }
}

export default useLazyUpdateCompany
