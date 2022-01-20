import React, { useState } from 'react'
import { CompanyPicker, Field, InputField, Modal, Success } from '../../../../components'
import { useLazyCreateUser } from '../../../../gql'

/************************************
 * DEFAULT COMPONENT
 ***********************************/
function CreateUser () {
  const TITLE = 'Sign Up'
  const { mutation: createUser } = useLazyCreateUser()

  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [dob, setDOB] = useState()
  const [companyId, setCompanyId] = useState()
  const [result, setResult] = useState()

  const onSubmit = async () => {
    var res = await createUser({ variables: { firstName, lastName, dob, companyId } })
    setResult(res)
  }

  var success = result?.data?.createUser?.id || false

  if (success) {
    return (
      <Modal title={TITLE}>
        <Success />
      </Modal>
    )
  }
  return (
    <Modal onSubmit={onSubmit} title={TITLE}>
      <>
        <Field label='First Name'>
          <InputField
            onBlur={e => {
              setFirstName(e?.target?.value)
            }}
          />
        </Field>
        <Field label='Last Name'>
          <InputField onBlur={e => setLastName(e?.target?.value)} />
        </Field>
        <Field label='Date of Birth'>
          <InputField onBlur={e => setDOB(e?.target?.value)} type='date' />
        </Field>
        <Field label='Company'>
          <CompanyPicker setCompanyId={setCompanyId} />
        </Field>
      </>
    </Modal>
  )
}

export default CreateUser
