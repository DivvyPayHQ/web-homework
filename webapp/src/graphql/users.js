import gql from 'graphql-tag'

export const GET_ALL_USERS = gql`
    {
        users {
            id
            dob
            firstName
            lastName
        }
    }
`
