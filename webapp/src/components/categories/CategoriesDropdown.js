/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { Loading } from '../loading'
import { GetCategories } from '../../gql/queries/categories.gql'
import { translate } from '../../utils/translate'

const StyledFormControl = styled(FormControl)`
  width: 100%;
`

const StyledMenuItem = styled(MenuItem)`
  text-transform: capitalize;
`

const StyledSelect = styled(Select)`
  text-transform: capitalize;
`

export const CategoriesDropdown = ({ onSelect, value }) => {
  const { loading, data = {} } = useQuery(GetCategories)

  if (loading) {
    return <Loading />
  }

  return (
    <StyledFormControl>
      <InputLabel id='categories-dropdown-label'>{translate('category')}</InputLabel>
      <StyledSelect labelId='categories-dropdown-label' onChange={onSelect} value={value}>
        {data?.categories.map(category => (
          <StyledMenuItem key={category.id} value={category.id}>
            {category.name}
          </StyledMenuItem>
        ))}
      </StyledSelect>
    </StyledFormControl>
  )
}

CategoriesDropdown.propTypes = {
  onSelect: PropTypes.func.isRequired,
  value: PropTypes.string
}
