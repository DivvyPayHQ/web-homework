import React, { Fragment } from 'react'
import gql from 'graphql-tag'
import Transactions from '../Components/Transactions'
import AddTransaction from '../Components/AddTransaction'

export function Home () {
  return (
    <Fragment>
      {/* <Link to='/another'>Another route</Link> */}
      <div>Ready, steady, go!</div>
      <Transactions />
      <AddTransaction />
    </Fragment>
  )
}
