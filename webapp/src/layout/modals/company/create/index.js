import React, { useState } from 'react'
import { Field, InputField, Modal, Success } from '../../../../components'
import { useLazyCreateCompany } from '../../../../gql'

/************************************
 * DEFAULT COMPONENT
 ***********************************/
function CreateCompany () {
  const TITLE = 'Create Company'
  const { mutation: createCompany } = useLazyCreateCompany()

  const [availableCredit, setAvailableCredit] = useState()
  const [creditLine, setCreditLine] = useState()
  const [name, setName] = useState()
  const [result, setResult] = useState()

  const onSubmit = async () => {
    var res = await createCompany({ variables: { availableCredit, creditLine, name } })
    setResult(res)
  }

  var success = result?.data?.createCompany?.id || false

  if (success) {
    return (
      <Modal title={TITLE}>
        <Success />
      </Modal>
    )
  }

  return (
    <Modal onSubmit={onSubmit} title={TITLE}>
      <Field label='Name'>
        <InputField onBlur={e => setName(e?.target?.value)} type='text' />
      </Field>
      <Field label='Available Credit'>
        <InputField onBlur={setAvailableCredit} type='amount' />
      </Field>
      <Field label='Credit Line'>
        <InputField onBlur={setCreditLine} type='amount' />
      </Field>
    </Modal>
  )
}

export default CreateCompany
