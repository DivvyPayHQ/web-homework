import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Table as MuiTable, TableContainer } from '@material-ui/core'
import { Headers } from './Headers'
import { Loading } from '../loading'
import { Row } from './Row'
import { Rows } from './Rows'
import { sortRows } from '../../utils/table-utils'
import { translate } from '../../utils/translate'

const LoadingContainer = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 1em 0;
`

const Message = styled.p`
  font-family: ${props => props.theme.fontFamily};
`

export const Table = ({ rows, columns, defaultSortField, defaultSortAsc, loading }) => {
  const [dataRows, setDataRows] = useState(rows || [])
  const [sortField, setSortField] = useState(defaultSortField || columns[0].field)
  const [sortAsc, setSortAsc] = useState(defaultSortAsc)

  const sortData = () => {
    const sortingColumn = columns.find(column => column.field === sortField)
    const sortType = sortingColumn?.type || 'string'
    if (!sortingColumn.sortDisabled) {
      const sortedRows = sortRows({ sortField, sortType, rows, sortAsc })
      setDataRows(sortedRows)
    }
  }

  const onClickHeader = field => {
    const sortingColumn = columns.find(column => column.field === field)
    if (sortingColumn && !sortingColumn.sortDisabled) {
      if (sortingColumn.field === sortField) {
        setSortAsc(!sortAsc)
      } else {
        setSortAsc(true)
        setSortField(field)
      }
    }
  }

  useEffect(() => {
    sortData()
  }, [rows, sortField, sortAsc])

  return (
    <TableContainer>
      <MuiTable>
        <Headers columns={columns} onClick={onClickHeader} sortAsc={sortAsc} sortField={sortField} />
        {!loading && (
          <Rows>
            {dataRows.map((row, index) => (
              <Row columns={columns} key={index} row={row} />
            ))}
          </Rows>
        )}
      </MuiTable>
      {loading && (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      )}
      {!loading && rows?.length === 0 && <Message>{translate('no_results')}</Message>}
    </TableContainer>
  )
}

Table.defaultProps = {
  defaultSortAsc: true
}

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      headerLookup: PropTypes.string.isRequired,
      sortDisabled: PropTypes.bool,
      type: PropTypes.string,
      width: PropTypes.number.isRequired
    }).isRequired
  ),
  defaultSortField: PropTypes.string,
  defaultSortAsc: PropTypes.bool,
  loading: PropTypes.bool,
  rows: PropTypes.arrayOf(PropTypes.object)
}
