import React from 'react'
import { css } from '@emotion/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import DeleteForever from '@material-ui/icons/DeleteForever'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_MERCHANT } from '../../graphql/merchants'

// eslint-disable-next-line react/prop-types
export function MerchantsTable ({ merchants }) {
  const [deleteMerchant] = useMutation(DELETE_MERCHANT)

  return (
    <TableContainer component={Paper} css={tableContainerStyle}>
      <Table aria-label='simple table' css={tableStyle}>
        <TableHead>
          <TableRow>
            <TableCell align='left' css={tableHeaderCellStyle}>Name</TableCell>
            <TableCell align='left' css={tableHeaderCellStyle}>Description</TableCell>
            <TableCell align='center' css={noBorderCell}> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {merchants.map((merchant) => (
            <TableRow key={merchant.id}>
              <TableCell align='left' css={noBorderCell}>{merchant.name}</TableCell>
              <TableCell align='left' css={noBorderCell}>{merchant.description}</TableCell>
              <TableCell align='center' css={[noBorderCell, descriptionCellStyle]}><DeleteForever css={deleteIconStyle} onClick={() => { deleteMerchant({ variables: { id: merchant.id } }) }} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const tableContainerStyle = css`
    box-shadow: none;
    display: inline-block;
    float: right;
    margin: 0px 20px;
    width: 70%;
`
const tableStyle = css`
    min-width: 650px;
`
const noBorderCell = css`
    border-bottom: none;
`
const descriptionCellStyle = css`
    width: 10%;
`

const tableHeaderCellStyle = css`
    font-weight: 600;
`
const deleteIconStyle = css`
    color: indianred;
`
