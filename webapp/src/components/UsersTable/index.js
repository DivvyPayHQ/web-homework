import React from 'react'
import { arrayOf, shape, string } from 'prop-types'
import { Link, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Paper } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'

import { makeStyles } from '@material-ui/core/styles'
import styled from '@emotion/styled'
const StyledLink = styled(Link)`
  color: #3f51b5 !important;
  text-decoration: none;
  &:focus, &:hover, &:visited, &:link, &:active {
    color: inherit;
    text-decoration: none;
  }
`
const useStyles = makeStyles({
  icon: {
    verticalAlign: '-4px',
    opacity: 0.35,
    '&:hover': {
      opacity: 0.9
    }
  },
  table: {
    minWidth: 650
  }
})
function createData (id, firstName, lastName, dob) {
  return { id, firstName, lastName, dob }
}

export default function UsersTable ({ data }) {
  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(25)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const rows = data.map(
    (u) => createData(
      u.id,
      u.first_name,
      u.last_name,
      u.dob
    )
  )

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label='user table' className={classes.table} size='small'>
          <TableHead>
            <TableRow>
              <TableCell align='left'>Name</TableCell>
              <TableCell align='left'>DOB</TableCell>
              <TableCell align='right'>View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                <TableCell align='left'>
                  <StyledLink href={`/users/${row.id}`}>
                    {`${row.firstName} ${row.lastName}`}
                  </StyledLink>
                </TableCell>
                <TableCell align='left'>{row.dob}</TableCell>
                <TableCell align='right'>
                  <StyledLink href={`/users/${row.id}`}>
                    <VisibilityIcon className={classes.icon} fontSize='small' />
                  </StyledLink>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component='div'
        count={rows.length}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10, 25, 100]}
      />
    </>
  )
}

UsersTable.propTypes = {
  data: arrayOf(shape({
    id: string.isRequired,
    first_name: string.isRequired,
    last_name: string.isRequired,
    dob: string.isRequired
  }))
}
