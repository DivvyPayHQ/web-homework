import React, { useState } from 'react'
import styled from 'styled-components'
import {
  CompanyPicker,
  Field,
  InputField,
  MerchantPicker,
  Modal,
  Radio,
  Success,
  UserPicker
} from '../../../../components'
import { useLazyCreateTransaction } from '../../../../gql'

/************************************
 * REACT STYLED COMPONENTS
 ***********************************/
const Row = styled.div`
  border-radius: 4px;

  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: center;
  width: 100%;
`

/************************************
 * DEFAULT COMPONENT
 ***********************************/
function CreateTransaction () {
  const TITLE = 'Create Transaction'
  const { mutation: createTransaction } = useLazyCreateTransaction()

  const [amount, setAmount] = useState()
  const [companyId, setCompanyId] = useState()
  const [credit, setCredit] = useState('On')
  const [debit, setDebit] = useState('On')
  const [description, setDescription] = useState()
  const [merchantId, setMerchantId] = useState()
  const [userId, setUserId] = useState()
  const [result, setResult] = useState()

  const radioValues = ['On', 'Off']

  const onSubmit = async () => {
    var res = await createTransaction({
      variables: {
        amount,
        companyId,
        credit: credit === radioValues[0],
        debit: debit === radioValues[0],
        description,
        merchantId,
        userId
      }
    })
    setResult(res)
  }

  var success = result?.data?.createTransaction?.id || false

  if (success) {
    return (
      <Modal title={TITLE}>
        <Success />
      </Modal>
    )
  }

  return (
    <Modal onSubmit={onSubmit} title={TITLE}>
      <Field label='Amount'>
        <InputField onBlur={setAmount} type='amount' />
      </Field>
      <Field label='Description'>
        <InputField onBlur={e => setDescription(e?.target?.value)} type='text' />
      </Field>
      <Field label='Payment Methods'>
        <Row>
          <Field label='Credit'>
            <Radio selected={credit} setSelected={setCredit} values={radioValues} />
          </Field>
          <Field label='Debit'>
            <Radio selected={debit} setSelected={setDebit} values={radioValues} />
          </Field>
        </Row>
      </Field>
      <Field label='Company'>
        <CompanyPicker setCompanyId={setCompanyId} />
      </Field>
      <Field label='Merchant'>
        <MerchantPicker setMerchantId={setMerchantId} />
      </Field>
      <Field label='User'>
        <UserPicker setUserId={setUserId} />
      </Field>
    </Modal>
  )
}

export default CreateTransaction
