import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { css } from '@emotion/core'
import Dashboard from './dashboard/Dashboard'
import Nav from './nav/Nav'

function AppRouter () {
  return (
    <Router>
      <section className='app-wrapper'>
        <Nav />
        <div className='main-content' css={contentStyle}>
          <Route component={Dashboard} exact path='/' />
          <Route component={() => (<h3>Report</h3>)} exact path='/report' />
        </div>
      </section>
    </Router>
  )
}

const contentStyle = css`
  background-color: #f9f8f0;
  grid-row: 2;
  height: 100vh;
  padding: 20px 40px;
`
export default AppRouter
