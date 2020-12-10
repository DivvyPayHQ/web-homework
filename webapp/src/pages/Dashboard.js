import React, { Fragment } from 'react'
import Table from '../components/tables/Table'
import ViewTransaction from './ViewTransaction'

const Dashboard = () => {
  return (
    <Fragment>
      {/* <Link to='/another'>Another route</Link> */}
      <div>Ready, steady, go!</div>
      <Table />
      <ViewTransaction />
    </Fragment>
  )
}

export default Dashboard
