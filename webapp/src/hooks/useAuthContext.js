import { AuthContext } from '../firebase/AuthContext'
import { useContext } from 'react'

export const useAuthContext = () => {
  // calls createContext in ./AuthContext
  const context = useContext(AuthContext)

  if (!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }

  return context
}
