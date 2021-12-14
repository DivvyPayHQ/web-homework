import { arrayOf, string, bool, number, shape, object } from 'prop-types'
import React, { useEffect, useState } from 'react'

// import { css } from '@emotion/core'
import { useTokens } from '@kyper/tokenprovider'
import { Button } from '@kyper/button'
import { HeaderCell, Table, TableBodyVirtualized, TableCell, TableRow, TableHead, TableFooter, TABLE_CONST } from '@kyper/table'
import { useNavigate } from 'react-router-dom'

import { FormattedNumber } from 'src/components/shared/FormattedNumber'

const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`

const dataPropShape = shape({
  id: string,
  user_id: string,
  description: string,
  merchant_id: string,
  debit: bool,
  credit: bool,
  amount: number
})

export function RowRenderer ({ data, index, style }) {
  const navigate = useNavigate()
  const tokens = useTokens()
  const { id, date, user, merchant, description, amount, credit } = data[index]

  return (
    <TableRow data-testid={`transaction-${id}`} index={index} style={style}>
      <TableCell data-testid={makeDataTestId(id, 'date')} style={{ width: '16.66%' }}>{date}</TableCell>
      <TableCell data-testid={makeDataTestId(id, 'users-name')} style={{ width: '16.66%' }}>{user.first_name} {user.last_name}</TableCell>
      <TableCell data-testid={makeDataTestId(id, 'merchant')} style={{ width: '16.66%' }}>{merchant.name}</TableCell>
      <TableCell data-testid={makeDataTestId(id, 'description')} style={{ width: '16.66%' }}>{description}</TableCell>
      <TableCell data-testid={makeDataTestId(id, 'amount')} style={{ width: '16.66%', color: credit ? tokens.Color.Success300 : tokens.Color.Error300 }}>
        <FormattedNumber number={amount} />
      </TableCell>
      <TableCell style={{ width: '16.66%' }}>
        <Button data-testid={makeDataTestId(id, 'edit')} onClick={() => navigate(`./${id}`)}>Edit</Button>
      </TableCell>
    </TableRow>
  )
}

RowRenderer.propTypes = {
  data: arrayOf(dataPropShape),
  index: number,
  style: object
}

export const _sortTable = (data, sortColumn, sortDirection) => {
  const sortASC = (a, b) => (a[sortColumn] > b[sortColumn] ? 1 : -1)
  const sortDESC = (a, b) => (a[sortColumn] > b[sortColumn] ? -1 : 1)

  let sortedData = data

  if (sortDirection === TABLE_CONST.ASC) {
    sortedData = [...data].sort(sortASC)
  } else if (sortDirection === TABLE_CONST.DESC) {
    sortedData = [...data].sort(sortDESC)
  }

  return sortedData
}

export function TxTable ({ data = [] }) {
  const [sortInfo, setSortInfo] = useState({ sortColumn: 'date', sortDirection: 'DESC' })

  const sortTable = (sortColumn, sortDirection) => {
    setSortInfo({
      sortColumn, sortDirection
    })
  }

  const [sortedData, setSortedData] = useState(_sortTable(data, sortInfo.sortColumn, sortInfo.sortDirection))

  useEffect(() => {
    // Keeps the sort if new data comes in with our mutation refresh.
    setSortedData(_sortTable(data, sortInfo.sortColumn, sortInfo.sortDirection))
  }, [data, sortInfo])

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
      <TableBodyVirtualized height={500} itemCount={data.length} itemData={sortedData} itemSize={75}>
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
