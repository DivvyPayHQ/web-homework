import React from 'react'
import { useQuery } from '@apollo/client'
import { ErrorPage } from '../../components/errors'
import { MainHeader } from '../../components/headers'
import { Table } from '../../components/table'
import GetCategories from '../../gql/queries/categories.gql'
import { columnsConfig } from '../../utils/category-utils'
import { translate } from '../../utils/translate'

export const CategoriesPage = () => {
  const { loading, error, data = {} } = useQuery(GetCategories)

  if (error) {
    return <ErrorPage error={error} />
  }

  return (
    <>
      <MainHeader>{translate('categories')}</MainHeader>
      <Table columns={columnsConfig} loading={loading} rows={data?.categories || []} />
    </>
  )
}
