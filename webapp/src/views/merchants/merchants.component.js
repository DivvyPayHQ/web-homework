import React from 'react'
import { CreateMerchant } from './create-merchant.component'
import { useQuery } from '@apollo/react-hooks'
import Container from '@material-ui/core/Container'
import { MerchantsTable } from './merchant-table.component'
import { GET_ALL_MERCHANTS } from '../../graphql/merchants'

export function Merchants () {
  const { data, loading } = useQuery(GET_ALL_MERCHANTS)

  return (
    <>
      <Container>
        <CreateMerchant />
        {!loading && (<MerchantsTable merchants={data.merchants} />)}
      </Container>
    </>
  )
}
