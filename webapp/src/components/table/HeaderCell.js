import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import { TableCell } from '@material-ui/core'
import { ArrowUpward, ArrowDownward } from '@material-ui/icons'

const StyledCell = styled(TableCell)`
  width: ${props => props.column.width ? `${props.column.width}%` : 'auto'};
  text-transform: uppercase;
  letter-spacing: .05em;
  cursor: ${props => props.column.sortDisabled ? 'auto' : 'pointer'};
  /* use !important to override material table cell css */
  color: ${props => props.theme.colors.black} !important;
  font-weight: bold !important;
`

const HeaderCellContent = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: ${props => ['number', 'currency'].includes(props.column.type) ? 'flex-end' : 'flex-start'};
`

const IconContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: .5em;

  svg {
    font-size: 1em;
  }
`

export const HeaderCell = ({ children, column, onClick, showSortIcon, sortAsc }) => {
  return (
    <StyledCell column={column} onClick={onClick}>
      <HeaderCellContent column={column}>
        {children}
        {showSortIcon && (
          <IconContainer>
            {sortAsc && <ArrowUpward />}
            {!sortAsc && <ArrowDownward />}
          </IconContainer>
        )}
      </HeaderCellContent>
    </StyledCell>
  )
}

HeaderCell.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  column: PropTypes.shape({
    field: PropTypes.string.isRequired,
    headerLookup: PropTypes.string.isRequired,
    sortDisabled: PropTypes.bool,
    type: PropTypes.string,
    width: PropTypes.number.isRequired
  }).isRequired,
  onClick: PropTypes.func,
  showSortIcon: PropTypes.bool,
  sortAsc: PropTypes.bool
}
