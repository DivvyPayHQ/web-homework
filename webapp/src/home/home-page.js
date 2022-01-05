import { useQuery } from '@apollo/client'
import GetTransactions from '../gql/transactions.gql'
import TxTable from '../components/transactions/TxTable'

export function Home () {
  const { loading, error, data = {} } = useQuery(GetTransactions)

  if (loading) {
    return (
      <>
        Loading...
      </>
    )
  }

  if (error) {
    return (
      <>
        ¯\_(ツ)_/¯
      </>
    )
  }

  return (
    <>
      <TxTable data={data.transactions} />
    </>
  )
}
