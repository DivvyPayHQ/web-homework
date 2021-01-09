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

export const CREATE_USER = gql`
    mutation createUser($dob: String!, $firstName:String!, $lastName:String!) {
        createUser(dob:$dob, firstName:$firstName, lastName:$lastName) {
            firstName 
            lastName
        }
    }
`

export const DELETE_USER = gql`
    mutation deleteUser($id: ID!) {
        deleteUser(id: $id) {
            id
        }
    }
`
