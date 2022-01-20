import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../../shared/colors'
import { Button } from '../../../components'
import UsersTableRow from './users-table-row'

/************************************
 * REACT STYLED COMPONENTS
 ***********************************/
const Pagination = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  margin-top: 48px;
`

const TableHeader = styled.th`
  font-size: 16px;
  font-weight: 600;
  height: 64px;
`

const TableRow = styled.tr`
  font-size: 32px;
  font-weight: 700;
`

const Table = styled.table`
  border-radius: 4px;
  background-color: ${colors.smoke};
  table-layout: fixed;
  width: 100%;
`

/************************************
 * DEFAULT COMPONENT
 ***********************************/
function UsersTable ({ users }) {
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(users.length / 8)
  const pagedUsers = users.slice(page * 8, page * 8 + 8)

  return (
    <>
      <Table>
        <tbody>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>DOB</TableHeader>
            <TableHeader>Company</TableHeader>
            <TableHeader>Created On</TableHeader>
          </TableRow>
          {pagedUsers.map((u, k) => (
            <UsersTableRow key={k} user={u} />
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Button onClick={() => setPage(page - 1)}>Previous</Button>
        {`Page ${page + 1} / ${totalPages}`}
        <Button onClick={() => setPage(page + 1)}>Next</Button>
      </Pagination>
    </>
  )
}
UsersTable.defaultProps = {
  users: []
}

UsersTable.propTypes = {
  users: PropTypes.array
}

export default UsersTable
