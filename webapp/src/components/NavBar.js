import React from 'react'
import { NavLink as Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import * as navbarStyles from './NavBarStyles.js'
import * as globalStyles from '../global styles/GlobalStyles'

export default function NavBar () {
  const { logout } = useLogout()
  const { user } = useAuthContext(null)

  return (
    <nav css={navbarStyles.navbar}>
      <div css={navbarStyles.title}>Transaction Manager</div>
      <div>{user && (
        <>
          <Link activeClassName='active-link' css={navbarStyles.navlink} to='/transactions'>Transactions</Link>
          <Link activeClassName='active-link' css={navbarStyles.navlink} to='/profile'>Profile</Link>
        </>
      )}
      </div>
      <div>
        {!user && (
        <>
          <Link css={navbarStyles.navlink} to='/login'>Login</Link>
          <Link css={navbarStyles.navlink} to='/signup'>Signup</Link>
        </>
        )}
        {user && (
        <>
          <span css={navbarStyles.subtitle}>Welcome, {user.displayName}!</span>
          <button css={globalStyles.buttonTwo} onClick={logout} type='button'>Logout</button>
        </>
        )}
      </div>
    </nav>
  )
}
