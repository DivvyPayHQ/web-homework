import React from 'react'
import { useQuery } from '@apollo/client'
import { ErrorPage } from '../../components/errors'
import { MainHeader } from '../../components/headers'
import { Table } from '../../components/table'
import GetUsers from '../../gql/queries/users.gql'
import { columnsConfig, getUserTableData } from '../../utils/user-utils'
import { translate } from '../../utils/translate'

export const UsersPage = () => {
  const { loading, error, data = {} } = useQuery(GetUsers)

  if (error) {
    return <ErrorPage error={error} />
  }

  const rows = getUserTableData(data?.users || [])

  return (
    <>
      <MainHeader>{translate('users')}</MainHeader>
      <Table columns={columnsConfig} loading={loading} rows={rows} />
    </>
  )
}
