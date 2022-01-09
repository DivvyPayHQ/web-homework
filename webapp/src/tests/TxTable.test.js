// import { render } from '@testing-library/react'
import React from 'react'
import { shallow } from 'enzyme'
import { useQuery } from '@apollo/client'
import GetTransactions from '../gql/transactions.gql'
import TxTable from '../components/TransactionTable'

describe('Transactions Table', () => {
  it('should show user "employee4" with amount "150"', () => {
    const { data = {} } = useQuery(GetTransactions)
    const table = shallow(<TxTable
      data={data.transaction}
    />)
    expect(table).toMatchSnapshot()
  })
})
