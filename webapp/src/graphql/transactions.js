import gql from 'graphql-tag'

export const GET_ALL_TRANSACTIONS = gql`
    {
        transactions {
            id
            amount
            description
            credit
            debit
            insertedAt
            user {
                id
                firstName
                lastName
            }
            merchant {
                id
                name
            }
        }
    }
`
