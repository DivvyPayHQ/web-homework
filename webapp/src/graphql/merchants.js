import gql from 'graphql-tag'

export const GET_ALL_MERCHANTS = gql`
    {
        merchants {
            id
            name
            description
        }
    }
`

export const CREATE_MERCHANT = gql`
    mutation createMerchant($description:String!, $name:String!) {
        createMerchant(description:$description, name:$name) {
            id
            name
        }
    }
`

export const DELETE_MERCHANT = gql`
    mutation deleteMerchant($id: ID!) {
        deleteMerchant(id: $id) {
            id
        }
    }
`
