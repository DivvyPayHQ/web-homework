import React, { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import * as globalStyles from '../global styles/GlobalStyles'
export default function SignupPage () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const { signup, isLoading, error } = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName)
  }

  return (
    <div css={globalStyles.form}>
      <form className='user-form' onSubmit={handleSubmit}>
        <h2 className='form-title'>Sign Up</h2>
        <label>
          <span>email:</span>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type='email'
            value={email}
          />
        </label>
        <label>
          <span>password:</span>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            value={password}
          />
        </label>
        <label>
          <span>Display Name:</span>
          <input
            onChange={(e) => setDisplayName(e.target.value)}
            type='text'
            value={displayName}
          />
        </label>
        <div className='button-container'>
          <button css={globalStyles.buttonOne} disabled={isLoading}>{ !isLoading ? 'Sign Up' : 'Loading . . .'}</button>
        </div>
        { error && <p css={globalStyles.errorMessage}>{ error }</p>}
      </form>
    </div>
  )
}
