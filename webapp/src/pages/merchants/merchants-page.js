import React from 'react'
import { useQuery } from '@apollo/client'
import { ErrorPage } from '../../components/errors'
import { MainHeader } from '../../components/headers'
import { Table } from '../../components/table'
import GetMerchants from '../../gql/queries/merchants.gql'
import { columnsConfig, getMerchantTableData } from '../../utils/merchant-utils'
import { translate } from '../../utils/translate'

export const MerchantsPage = () => {
  const { loading, error, data = {} } = useQuery(GetMerchants)

  if (error) {
    return <ErrorPage error={error} />
  }

  const rows = getMerchantTableData(data?.merchants || [])

  return (
    <>
      <MainHeader>{translate('merchants')}</MainHeader>
      <Table columns={columnsConfig} loading={loading} rows={rows} />
    </>
  )
}
