import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Field, InputField, LoadingModal, Modal, Radio, Success } from '../../../../components'
import { useLazyDeleteCompany, useLazyUpdateCompany, useCompany } from '../../../../gql'
import { formatAmountFromInt } from '../../../../shared/util'
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
const TITLE = 'Company'

/************************************
 * DEFAULT COMPONENT
 ***********************************/
function Company () {
  var { id } = useParams()

  const { mutation: deleteCompany } = useLazyDeleteCompany()
  const { mutation: updateCompany } = useLazyUpdateCompany()
  const { loading, company } = useCompany({ id })

  const radioValues = ['Delete', 'Update']
  const [selectedRadio, setSelectedRadio] = useState(radioValues[0])

  const [creditLine, setCreditLine] = useState()
  const [name, setName] = useState()
  const [result, setResult] = useState()

  const onSubmit = async () => {
    var res
    switch (selectedRadio) {
      case radioValues[0]:
        res = await deleteCompany({ variables: { id } })
        break
      case radioValues[1]:
        res = await updateCompany({ variables: { creditLine, id, name } })
        break
    }
    setResult(res)
  }

  var success = result?.data?.deleteCompany?.id || result?.data?.updateCompany?.id || false

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
          <Details company={company} />
          <Radio selected={selectedRadio} setSelected={setSelectedRadio} values={radioValues} />
          <Hidden show={selectedRadio === radioValues[1]}>
            <Field label='Name'>
              <InputField onBlur={e => setName(e?.target?.value)} placeholder={company.name} type='text' />
            </Field>
            <Field label='Credit Line'>
              <InputField onBlur={setCreditLine} placeholder={formatAmountFromInt(company.creditLine)} type='amount' />
            </Field>
          </Hidden>
        </>
      )}
    </Modal>
  )
}

export default Company
