import React, { createContext, useReducer, useEffect } from 'react'
import { projectAuth } from '../firebase/config'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }
    case 'LOGOUT':
      return { ...state, user: null }
    case 'AUTH_IS_READY':
      return { ...state, user: action.payload, authIsReady: true }
    default:
      return state
  }
}

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  // sets the reducer function and intial state of the context
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false
  })

  useEffect(() => {
    const unsubscribe = projectAuth.onAuthStateChanged(user => {
      dispatch({ type: 'AUTH_IS_READY', payload: user })
      unsubscribe()
    })
  }, [])

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )
}
