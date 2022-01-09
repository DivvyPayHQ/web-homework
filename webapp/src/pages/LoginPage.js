import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import * as globalStyles from '../global styles/GlobalStyles'
export default function LoginPage () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading, error } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <div css={globalStyles.form}>
      <form className='user-form' onSubmit={handleSubmit}>
        <h2 className='form-title'>login</h2>
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
        <div className='button-container'>
          <button css={globalStyles.buttonOne} disabled={isLoading}>{ !isLoading ? 'Login' : 'Loading . . .'}</button>
        </div>
        { error && <p css={globalStyles.errorMessage}>{ error }</p>}
      </form>
    </div>
  )
}
