import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../../../shared/colors'
import { Button } from '../../../components'
import CompaniesTableRow from './companies-table-row'

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
function CompaniesTable ({ companies }) {
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(companies.length / 8)
  const pagedCompanies = companies.slice(page * 8, page * 8 + 8)

  return (
    <>
      <Table>
        <tbody>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Available Credit</TableHeader>
            <TableHeader>Credit Line</TableHeader>
            <TableHeader>Created On</TableHeader>
          </TableRow>
          {pagedCompanies.map((c, k) => (
            <CompaniesTableRow company={c} key={k} />
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
CompaniesTable.defaultProps = {
  companies: []
}

CompaniesTable.propTypes = {
  companies: PropTypes.array
}

export default CompaniesTable
