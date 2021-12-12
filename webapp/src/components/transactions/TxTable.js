import { arrayOf, string, bool, number, shape, object } from 'prop-types'
import React, { useState } from 'react'

// import { css } from '@emotion/core'
import { useTokens } from '@kyper/tokenprovider'
import { Button } from '@kyper/button'
import { HeaderCell, Table, TableBodyVirtualized, TableCell, TableRow, TableHead, TableFooter, TABLE_CONST } from '@kyper/table'
import { useNavigate } from 'react-router-dom'

const dataPropShape = shape({
  id: string,
  user_id: string,
  description: string,
  merchant_id: string,
  debit: bool,
  credit: bool,
  amount: number
})

// const styles = css`
//  .header {
//    font-weight: bold;
//  }
// `

// const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

// export function TxTable ({ data }) {
//   const navigate = useNavigate()

//   return (
//     <React.Fragment>
//       <table css={styles}>
//         <tbody>
//           <tr className='header'>
//             <td >ID</td>
//             <td >User ID</td>
//             <td >Description</td>
//             <td >Merchant ID</td>
//             <td >Debit</td>
//             <td >Credit</td>
//             <td >Amount</td>
//             <td />
//           </tr>
//           {
//             data.map(tx => {
//               const { id, user_id: userId, description, merchant_id: merchantId, debit, credit, amount } = tx
//               return (
//                 <tr data-testid={`transaction-${id}`} key={`transaction-${id}`}>
//                   <td data-testid={makeDataTestId(id, 'id')}>{id}</td>
//                   <td data-testid={makeDataTestId(id, 'userId')}>{userId}</td>
//                   <td data-testid={makeDataTestId(id, 'description')}>{description}</td>
//                   <td data-testid={makeDataTestId(id, 'merchant')}>{merchantId}</td>
//                   <td data-testid={makeDataTestId(id, 'debit')}>{debit}</td>
//                   <td data-testid={makeDataTestId(id, 'credit')}>{credit}</td>
//                   <td data-testid={makeDataTestId(id, 'amount')}>{amount}</td>
//                   <td></td>
//                 </tr>
//               )
//             })
//           }
//         </tbody>
//       </table>
//     </React.Fragment>
//   )
// }

function RowRenderer ({ data, index, style }) {
  const navigate = useNavigate()
  const tokens = useTokens()
  const { id, user_id: userId, merchant_id: merchantId, description, amount, credit } = data[index]

  return (
    <TableRow index={index} style={style}>
      <TableCell style={{ width: '16.66%' }}>Date</TableCell>
      <TableCell style={{ width: '16.66%' }}>{userId}</TableCell>
      <TableCell style={{ width: '16.66%' }}>{merchantId}</TableCell>
      <TableCell style={{ width: '16.66%' }}>{description}</TableCell>
      <TableCell style={{ width: '16.66%', color: credit ? tokens.Color.Success300 : tokens.Color.Error300 }}>{amount}</TableCell>
      <TableCell style={{ width: '16.66%' }}>
        <Button onClick={() => navigate(`./${id}`)}>Edit</Button>
      </TableCell>
    </TableRow>
  )
}

RowRenderer.propTypes = {
  data: arrayOf(dataPropShape),
  index: number,
  style: object
}

const _sortTable = (data, sortColumn, sortDirection) => {
  const sortASC = (a, b) => (a[sortColumn] > b[sortColumn] ? -1 : 1)
  const sortDESC = (a, b) => (a[sortColumn] > b[sortColumn] ? 1 : -1)

  let sortedData = data

  if (sortDirection === TABLE_CONST.ASC) {
    sortedData = [...data].sort(sortASC)
  } else if (sortDirection === TABLE_CONST.DESC) {
    sortedData = [...data].sort(sortDESC)
  }

  return sortedData
}

export function TxTable ({ data = [] }) {
  const sortTable = (sortColumn, sortDirection) => {
    setSortedData(_sortTable(data, sortColumn, sortDirection))
  }

  const [sortedData, setSortedData] = useState(_sortTable(data, 'id', 'DESC'))

  return (
    <Table component='div' rowCount={data.length} sortColumn='id' sortDirection='DESC'>
      <TableHead>
        <TableRow>
          <HeaderCell label='date' sortFunc={sortTable} style={{ width: '16.66%' }}>
            Date
          </HeaderCell>
          <HeaderCell label='user' sortFunc={sortTable} style={{ width: '16.66%' }}>
            User
          </HeaderCell>
          <HeaderCell label='merchant' sortFunc={sortTable} style={{ width: '16.66%' }}>
            Merchant
          </HeaderCell>
          <HeaderCell label='description' sortFunc={sortTable} style={{ width: '16.66%' }}>
            Description
          </HeaderCell>
          <HeaderCell label='amount' sortFunc={sortTable} style={{ width: '16.66%' }}>
            Amount
          </HeaderCell>
          <HeaderCell label='' style={{ width: '16.66%' }} />
        </TableRow>
      </TableHead>
      <TableBodyVirtualized height={500} itemCount={data.length} itemData={sortedData} itemSize={50}>
        {RowRenderer}
      </TableBodyVirtualized>
      <TableFooter>
        <TableRow>
          <TableCell>{`Showing ${data.length} of ${data.length}`}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

TxTable.propTypes = {
  data: arrayOf(dataPropShape)
}
