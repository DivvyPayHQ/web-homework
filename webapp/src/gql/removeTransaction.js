import { useMutation } from '@apollo/client'

import removeTransaction from './removeTransaction.gql'

const noop = () => {}

const useRemoveTransaction = (onSuccess = (noop), onError = (noop)) => {
  const [mutate, data] = useMutation(removeTransaction)

  const removeTransactionFunc = async (id) => {
    try {
      await mutate({
        variables: { id },
        refetchQueries: [ 'transactions' ]
      })

      onSuccess()
    } catch (error) {
      onError(error)
    }
  }

  return [removeTransactionFunc, data]
}

export default useRemoveTransaction
