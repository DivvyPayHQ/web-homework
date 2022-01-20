import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import {
  Field,
  InputField,
  LoadingModal,
  MerchantPicker,
  Modal,
  Radio,
  Success,
  UserPicker
} from '../../../../components'
import { useLazyDeleteTransaction, useLazyUpdateTransaction, useTransaction } from '../../../../gql'
import { formatAmountFromFloat } from '../../../../shared/util'
import Details from './details'

/************************************
 * REACT STYLED COMPONENTS
 ***********************************/
const Hidden = styled.div`
  ${({ show }) => `display: ${show ? '' : 'none'};`}
`

/************************************
 * CONSTANTS
 ***********************************/
const TITLE = 'Transaction'

/************************************
 * DEFAULT COMPONENT
 ***********************************/
function Transaction () {
  let { id } = useParams()

  const { mutation: deleteTransaction } = useLazyDeleteTransaction()
  const { mutation: updateTransaction } = useLazyUpdateTransaction()
  const { loading, transaction } = useTransaction({ id })

  const radioValues = ['Delete', 'Update']
  const [selectedRadio, setSelectedRadio] = useState(radioValues[0])

  const [amount, setAmount] = useState()
  const [description, setDescription] = useState()
  const [merchantId, setMerchantId] = useState()
  const [userId, setUserId] = useState()
  const [result, setResult] = useState()

  const onSubmit = async () => {
    var res
    switch (selectedRadio) {
      case radioValues[0]:
        res = await deleteTransaction({ variables: { id } })
        break
      case radioValues[1]:
        res = await updateTransaction({ variables: { amount, description, id, merchantId, userId } })
        break
    }
    setResult(res)
  }

  var success = result?.data?.deleteTransaction?.id || result?.data?.updateTransaction?.id || false

  if (success) {
    return (
      <Modal title={TITLE}>
        <Success />
      </Modal>
    )
  }

  return (
    <Modal onSubmit={onSubmit} title={TITLE}>
      {loading ? (
        <LoadingModal />
      ) : (
        <>
          <Details transaction={transaction} />
          <Radio selected={selectedRadio} setSelected={setSelectedRadio} values={radioValues} />
          <Hidden show={selectedRadio === radioValues[1]}>
            <Field label='Amount'>
              <InputField onBlur={setAmount} placeholder={formatAmountFromFloat(transaction.amount)} type='amount' />
            </Field>
            <Field label='Description'>
              <InputField
                onBlur={e => setDescription(e?.target?.value)}
                placeholder={transaction.description}
                type='text'
              />
            </Field>
            <Field label='Merchant'>
              <MerchantPicker merchant={transaction.merchant} setMerchantId={setMerchantId} />
            </Field>
            <Field label='User'>
              <UserPicker setUserId={setUserId} user={transaction.user} />
            </Field>
          </Hidden>
        </>
      )}
    </Modal>
  )
}

export default Transaction
