import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Field, InputField, LoadingModal, Modal, Radio, Success } from '../../../../components'
import { useLazyDeleteMerchant, useLazyUpdateMerchant, useMerchant } from '../../../../gql'
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
const TITLE = 'Merchant'

/************************************
 * DEFAULT COMPONENT
 ***********************************/
function Merchant () {
  var { id } = useParams()

  const { mutation: deleteMerchant } = useLazyDeleteMerchant()
  const { mutation: updateMerchant } = useLazyUpdateMerchant()
  const { loading, merchant } = useMerchant({ id })

  const radioValues = ['Delete', 'Update']
  const [selectedRadio, setSelectedRadio] = useState(radioValues[0])

  const [name, setName] = useState()
  const [description, setDescription] = useState()
  const [result, setResult] = useState()

  const onSubmit = async () => {
    var res
    switch (selectedRadio) {
      case radioValues[0]:
        res = await deleteMerchant({ variables: { id } })
        break
      case radioValues[1]:
        res = await updateMerchant({ variables: { description, name, id } })
        break
    }
    setResult(res)
  }

  var success = result?.data?.deleteMerchant?.id || result?.data?.updateMerchant?.id || false

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
          <Details merchant={merchant} />
          <Radio selected={selectedRadio} setSelected={setSelectedRadio} values={radioValues} />
          <Hidden show={selectedRadio === radioValues[1]}>
            <Field label='Name'>
              <InputField
                onBlur={e => {
                  setName(e?.target?.value)
                }}
                placeholder={merchant.name}
              />
            </Field>
            <Field label='Description'>
              <InputField onBlur={e => setDescription(e?.target?.value)} placeholder={merchant.description} />
            </Field>
          </Hidden>
        </>
      )}
    </Modal>
  )
}

export default Merchant
