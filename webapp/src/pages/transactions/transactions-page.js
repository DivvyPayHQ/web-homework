import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useQuery } from '@apollo/client'
import { Dialog, Tabs, Tab } from '@material-ui/core'
import { ErrorPage } from '../../components/errors'
import { MainHeader } from '../../components/headers'
import { PrimaryButton } from '../../components/buttons'
import { AddTransaction, TransactionsChart, TransactionsTable } from '../../components/transactions'
import GetTransactions from '../../gql/queries/transactions.gql'
import { translate } from '../../utils/translate'

const Header = styled.section`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`

const TabContent = styled.article`
  margin-top: 1em;
`

export const TransactionsPage = () => {
  const [value, setValue] = useState(0)
  const [showAddTransactionDialog, setShowAddTransactionDialog] = useState(false)
  const { loading, error, data = {}, refetch, networkStatus } = useQuery(GetTransactions)

  const closeAddTransactionDialog = () => setShowAddTransactionDialog(false)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  if (error) {
    return <ErrorPage error={error} />
  }

  return (
    <>
      <Tabs centered onChange={handleChange} value={value}>
        <Tab label={translate('table')} />
        <Tab label={translate('chart')} />
      </Tabs>
      <TabContent>
        <Header>
          <MainHeader>{translate('transactions')}</MainHeader>
          <PrimaryButton onClick={() => setShowAddTransactionDialog(true)} variant='contained'>
            {translate('add_transaction')}
          </PrimaryButton>
        </Header>
        {value === 0 && (
          <TransactionsTable
            closeAddTransactionDialog={closeAddTransactionDialog}
            data={data}
            loading={loading && networkStatus !== 4}
            refetch={refetch}
            showAddTransactionDialog={showAddTransactionDialog}
          />
        )}
        {value === 1 && <TransactionsChart data={data} />}
      </TabContent>
      <Dialog onClose={closeAddTransactionDialog} open={showAddTransactionDialog}>
        <AddTransaction onClose={closeAddTransactionDialog} refetch={refetch} />
      </Dialog>
    </>
  )
}
