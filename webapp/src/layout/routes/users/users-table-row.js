import React from 'react'
import PropTypes from 'prop-types'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../../shared/colors'
import { formatDate } from '../../../shared/util'

/************************************
 * REACT STYLED COMPONENTS
 ***********************************/
const Cell = styled.td`
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 64px;
  text-align: center;
  width: 100px;
  overflow: hidden;
`

const TableRow = styled.tr`
  height: 64px;

  :hover {
    background-color: ${colors.mystic};
    cursor: ${props => props?.type !== 'text' && 'pointer'};
  }
`

/************************************
 * DEFAULT COMPONENT
 ***********************************/
function UsersTableRow ({ user: u }) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <>
      <TableRow onClick={() => navigate(`/users/${u.id}`, { state: { background: location } })}>
        <Cell>{`${u.firstName} ${u.lastName}`}</Cell>
        <Cell>{formatDate(u.dob)}</Cell>
        <Cell>{u.company.name}</Cell>
        <Cell>{formatDate(u.insertedAt)}</Cell>
      </TableRow>
    </>
  )
}

UsersTableRow.defaultProps = {
  user: {}
}

UsersTableRow.propTypes = {
  user: PropTypes.object
}

export default UsersTableRow