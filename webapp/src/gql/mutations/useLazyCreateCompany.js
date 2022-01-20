import { gql, useMutation } from '@apollo/client'

const CREATE_COMPANY = gql`
  mutation CreateCompany($availableCredit: Int!, $creditLine: Int!, $name: String!) {
    createCompany(availableCredit: $availableCredit, creditLine: $creditLine, name: $name) {
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
const useLazyCreateCompany = (
  options = {
    variables: {}
  }
) => {
  const [createCompany, { called, data, error, loading }] = useMutation(CREATE_COMPANY, options)

  return {
    called,
    company: data?.createCompany || null,
    error,
    loading,
    mutation: createCompany
  }
}

export default useLazyCreateCompany
