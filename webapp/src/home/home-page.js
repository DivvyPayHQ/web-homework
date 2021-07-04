import React, { Fragment } from 'react'
import { useQuery } from '@apollo/client'
import GetTransactions from '../gql/transactions.gql'
// import { TxTable } from '../bundles/common/components/transactions/TxTable'
import Layout from '../bundles/common/components/layout/Layout'
import Section, { SECTION_TYPES } from '../bundles/common/components/section/Section'

export function Home () {
  const { loading, error, data = {} } = useQuery(GetTransactions)
  if (loading) {
    return (
      <Fragment>
        Loading...
      </Fragment>
    )
  }

  if (error) {
    return (
      <Fragment>
        ¯\_(ツ)_/¯
      </Fragment>
    )
  }

  return (
    <Layout>
      <Section
        title='test'
        type={SECTION_TYPES.HALF}
      >
        {/*<TxTable data={data.transactions} />*/}
      </Section>
      <Section
          title='test'
          type={SECTION_TYPES.HALF}
      >
        {/*<TxTable data={data.transactions} />*/}
      </Section>
      <Section
          title='test'
          type={SECTION_TYPES.HALF}
      >
        {/*<TxTable data={data.transactions} />*/}
      </Section>
    </Layout>
  )
}
