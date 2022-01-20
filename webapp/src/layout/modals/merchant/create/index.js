import React, { useState } from 'react'
import { Field, InputField, Modal, Success } from '../../../../components'
import { useLazyCreateMerchant } from '../../../../gql'

/************************************
 * DEFAULT COMPONENT
 ***********************************/
function CreateMerchant () {
  const TITLE = 'Create Merchant'
  const { mutation: createMerchant } = useLazyCreateMerchant()

  const [description, setDescription] = useState()
  const [name, setName] = useState()
  const [result, setResult] = useState()

  const onSubmit = async () => {
    var res = await createMerchant({ variables: { description, name } })
    setResult(res)
  }

  var success = result?.data?.createMerchant?.id || false

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
      <Field label='Description'>
        <InputField onBlur={e => setDescription(e?.target?.value)} type='text' />
      </Field>
    </Modal>
  )
}

export default CreateMerchant
