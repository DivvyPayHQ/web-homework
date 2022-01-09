import { useState, useEffect } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  // to mitigate the update on an unmounted component
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setError(null)
    setIsLoading(true)

    try {
      // login
      const res = await projectAuth.signInWithEmailAndPassword(email, password)

      if (!res) {
        throw new Error('Login failed.')
      }

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsLoading(false)
        setError(null)
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message)
        setIsLoading(false)
      }
    }
  }

  // cleanup function
  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { login, isLoading, error }
}
