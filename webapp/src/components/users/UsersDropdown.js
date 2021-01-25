/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { Loading } from '../loading'
import { GetUsers } from '../../gql/queries/users.gql'
import { formatName } from '../../utils/user-utils'
import { translate } from '../../utils/translate'

const StyledFormControl = styled(FormControl)`
  width: 100%;
`

export const UsersDropdown = ({ onSelect, value }) => {
  const { loading, data = {} } = useQuery(GetUsers)

  if (loading) {
    return <Loading />
  }

  return (
    <StyledFormControl>
      <InputLabel id='users-dropdown-label'>{translate('user')}</InputLabel>
      <Select labelId='users-dropdown-label' onChange={onSelect} value={value}>
        {data?.users.map(user => (
          <MenuItem key={user.id} value={user.id}>
            {formatName(user)}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  )
}

UsersDropdown.propTypes = {
  onSelect: PropTypes.func.isRequired,
  value: PropTypes.string
}
