import { useMutation } from '@apollo/client'

import transactionsQuery from './transactions.gql'
import addTransaction from './addTransaction.gql'

const noop = () => {}

const useAddTransaction = (onSuccess = (noop), onError = (noop)) => {
  const [mutate, data] = useMutation(addTransaction)

  const addTransactionFunc = async ({
    userId,
    description,
    merchantId,
    debit,
    credit,
    amount
  }) => {
    const variables = {
      user_id: userId,
      description,
      merchant_id: merchantId,
      debit,
      credit,
      amount
    }

    try {
      await mutate({
        variables,
        refetchQueries: [ transactionsQuery ]
      })

      onSuccess()
    } catch (error) {
      console.log('error', error)
      onError(error)
    }
  }

  return [addTransactionFunc, data]
}

export default useAddTransaction
