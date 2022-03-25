import TxTable from '../components/transactions/TxTable'
import { transactions } from '../../mocks/transactions-data'

export function Home () {
  return (
    <>
      <TxTable data={transactions} />
    </>
  )
}
