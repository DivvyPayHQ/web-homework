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
