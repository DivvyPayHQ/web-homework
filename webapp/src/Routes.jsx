import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { css } from '@emotion/core'
import Dashboard from './components/dashboard/Dashboard'
import Nav from './components/nav/Nav'
import Upload from './components/upload/Upload'

function AppRouter () {
  return (
    <BrowserRouter>
      <section className='app-wrapper' css={contentStyle}>
        <Nav />
        <div className='main-content'>
          <Switch>
            <Redirect exact from='/' to='/dashboard' />
            <Route component={Dashboard} exact path='/dashboard' />
            <Route component={Upload} exact path='/upload' />
          </Switch>
        </div>
      </section>
    </BrowserRouter>
  )
}

const contentStyle = css`
  background-color: #f9f8f0;
  
  .main-content {
    grid-row: 2;
    height: auto;
    padding: 20px 40px;
    margin: 0 auto;
    max-width: 1300px;
    min-height: 100vh;
  }
`
export default AppRouter
