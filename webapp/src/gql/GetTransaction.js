query GetTransaction($id: ID!) {
  transaction(id: $id) {
    id
    date
    description
    debit
    credit
    amount
    merchant {
        id
        name
    }
    user {
        id
        first_name
        last_name
    }
  }
}