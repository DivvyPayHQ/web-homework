/* eslint-disable */
import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@apollo/client'
import styled from '@emotion/styled'
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core'
import { Loading } from '../loading'
import { GetMerchants } from '../../gql/queries/merchants.gql'
import { translate } from '../../utils/translate'

const StyledFormControl = styled(FormControl)`
  width: 100%;
`

const StyledMenuItem = styled(MenuItem)`
  text-transform: capitalize;
`

export const MerchantsDropdown = ({ onSelect, value }) => {
  const { loading, data = {} } = useQuery(GetMerchants)

  if (loading) {
    return <Loading />
  }

  return (
    <StyledFormControl>
      <InputLabel id='merchants-dropdown-label'>{translate('merchant')}</InputLabel>
      <Select labelId='merchants-dropdown-label' onChange={onSelect} value={value}>
        {data?.merchants.map(merchant => (
          <StyledMenuItem key={merchant.id} value={merchant.id}>
            {merchant.name}
          </StyledMenuItem>
        ))}
      </Select>
    </StyledFormControl>
  )
}

MerchantsDropdown.propTypes = {
  onSelect: PropTypes.func.isRequired,
  value: PropTypes.string
}
