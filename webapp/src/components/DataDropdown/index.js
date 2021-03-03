import React from 'react'
import { bool, func, string } from 'prop-types'
import { useQuery } from '@apollo/client'
import { GetCategories } from 'gql/categories.gql'
import { GetMerchants } from 'gql/merchants.gql'
import { GetUsers } from 'gql/users.gql'
import styled from '@emotion/styled'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'

const StyledFormControl = styled(FormControl)`
  width: 100%;
`

const componentMap = {
  category: GetCategories,
  merchant: GetMerchants,
  user: GetUsers
}

const typeMap = {
  category: 'categories',
  merchant: 'merchants',
  user: 'users'
}

const DataDropdown = ({ error, onChange, type, value }) => {
  const { loading, data = {} } = useQuery(componentMap[type])

  if (loading) {
    return (
      <StyledFormControl>
        <InputLabel htmlFor='LOADING...'>LOADING...</InputLabel>
        <Select
          id='LOADING...'
          name='LOADING...'
          value=''
        />
      </StyledFormControl>
    )
  }

  return (
    <StyledFormControl>
      <InputLabel htmlFor={`${type}_id`}>{type}</InputLabel>
      <Select
        error={error}
        id={`${type}_id`}
        name={`${type}_id`}
        onChange={onChange}
        value={value}
      >
        {data[typeMap[type]].map((x) => (
          <MenuItem key={x.id} value={x.id}>
            {type === 'user' ? `${x.first_name} ${x.last_name}` : x.name}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  )
}

DataDropdown.propTypes = {
  error: bool.isRequired,
  onChange: func.isRequired,
  type: string.isRequired,
  value: string.isRequired
}

export default DataDropdown
