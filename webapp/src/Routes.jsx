import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { css } from '@emotion/core'
import Dashboard from './components/dashboard/Dashboard'
import Nav from './components/nav/Nav'
import Upload from './components/upload/Upload'

function AppRouter () {
  return (
    <Router>
      <section className='app-wrapper'>
        <Nav />
        <div className='main-content' css={contentStyle}>
          <Route component={Dashboard} exact path='/' />
          <Route component={Upload} exact path='/upload' />
        </div>
      </section>
    </Router>
  )
}

const contentStyle = css`
  background-color: #f9f8f0;
  grid-row: 2;
  height: auto;
  padding: 20px 40px;
  min-height: 100vh;
`
export default AppRouter
