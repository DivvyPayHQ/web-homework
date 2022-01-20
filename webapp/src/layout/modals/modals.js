import React from 'react'
import PropTypes from 'prop-types'
import { Route, Routes } from 'react-router-dom'
import { CreateCompany, Company } from './company'
import { CreateMerchant, Merchant } from './merchant'
import { CreateTransaction, Transaction } from './transaction'
import { CreateUser, LogIn, User } from './user'

/************************************
 * CONSTANS
 ***********************************/
export const COMPANIES_MODALS = [
  { element: <CreateCompany />, label: 'Create Company', path: '/companies/create' },
  { element: <Company />, label: 'Company', path: '/companies/:id' }
]
export const MERCHANT_MODALS = [
  { element: <CreateMerchant />, label: 'Create Merchant', path: '/merchants/create' },
  { element: <Merchant />, label: 'Merchant', path: '/merchants/:id' }
]
export const TRANSACTION_MODALS = [
  { element: <CreateTransaction />, label: 'Create Transaction', path: '/transactions/create' },
  { element: <Transaction />, label: 'Transaction', path: '/transactions/:id' }
]

export const USER_MODALS = [
  { element: <LogIn />, label: 'Log In', path: '/log-in' },
  { element: <CreateUser />, label: 'Create User', path: '/sign-up' },
  { element: <User />, label: 'User', path: '/users/:id' }
]

const MODALS = COMPANIES_MODALS.concat(MERCHANT_MODALS.concat(TRANSACTION_MODALS.concat(USER_MODALS)))

/************************************
 * DEFAULT COMPONENT
 ***********************************/
function Modals ({ background }) {
  if (!background) return null
  else {
    return (
      <Routes>
        {MODALS.map((r, k) => (
          <Route element={r.element} exact key={k} path={r.path} />
        ))}
      </Routes>
    )
  }
}

Modals.propTypes = {
  background: PropTypes.object
}

export default Modals
