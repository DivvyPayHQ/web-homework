import gql from 'graphql-tag'

export const GET_ALL_TRANSACTIONS = gql`
    {
        transactions {
            id
            amount
            description
            description
            credit
            debit
            insertedAt
            category
            user {
                id
                firstName
                lastName
            }
            merchant {
                id
                name
            }
            company {
                id
            }
        }
    }
`
