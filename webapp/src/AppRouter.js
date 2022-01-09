import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// pages/componets
import TransactionPage from './pages/TransactionPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import NavBar from './components/NavBar'
import ProfilePage from './pages/ProfilePage'

export default function AppRouter () {
  const { authIsReady, user } = useAuthContext()

  return (
    <>
      {authIsReady && (
        <Router>
          <NavBar />
          <Switch>
            <Route exact path='/transactions'>
              { user ? <TransactionPage /> : <Redirect to='/login' />}
            </Route>
            <Route exact path='/profile'>
              { user ? <ProfilePage /> : <Redirect to='/login' />}
            </Route>
            <Route path='/login'>
              {user ? <Redirect to='/transactions' /> : <LoginPage />}
            </Route>
            <Route path='/signup'>
              { user && user.displayName ? <Redirect to='/transactions' /> : <SignupPage /> }
            </Route>
          </Switch>
        </Router>
      )}
    </>
  )
}
