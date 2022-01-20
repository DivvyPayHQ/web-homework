import React, { useState } from 'react'
import { Field, InputField, Modal } from '../../../../components'

/************************************
 * DEFAULT COMPONENT
 ***********************************/
function LogIn () {
  const [userName, setUserName] = useState()
  const [password, setPassword] = useState()

  return (
    <Modal
      onSubmit={() => {
        return { password, userName }
      }}
      title='Log In'
    >
      <Field label='User Name'>
        <InputField
          onBlur={e => {
            setUserName(e?.target?.value)
          }}
        />
      </Field>
      <Field label='Password'>
        <InputField onBlur={e => setPassword(e?.target?.value)} type='password' />
      </Field>
    </Modal>
  )
}

export default LogIn
