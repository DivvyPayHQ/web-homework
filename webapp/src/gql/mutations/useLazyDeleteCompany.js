import { gql, useMutation } from '@apollo/client'

const DELETE_COMPANY = gql`
  mutation DeleteCompany($id: ID!) {
    deleteCompany(id: $id) {
      id
    }
  }
`

/************************************
 * DEFAULT FUNCTION
 ***********************************/
const useLazyDeleteCompany = (
  options = {
    variables: {}
  }
) => {
  const [deleteCompany, { called, data, error, loading }] = useMutation(DELETE_COMPANY, options)

  return {
    called,
    deleted: !!data?.deleteCompany?.id,
    error,
    loading,
    mutation: deleteCompany
  }
}

export default useLazyDeleteCompany
