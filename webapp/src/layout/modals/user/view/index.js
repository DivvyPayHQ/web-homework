import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { CompanyPicker, Field, InputField, LoadingModal, Modal, Radio, Success } from '../../../../components'
import { useLazyDeleteUser, useLazyUpdateUser, useUser } from '../../../../gql'
import { formatDate } from '../../../../shared/util'
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
const TITLE = 'User'

/************************************
 * DEFAULT COMPONENT
 ***********************************/
function User () {
  let { id } = useParams()

  const { mutation: deleteUser } = useLazyDeleteUser()
  const { mutation: updateUser } = useLazyUpdateUser()
  const { loading, user } = useUser({ id })

  const radioValues = ['Delete', 'Update']
  const [selectedRadio, setSelectedRadio] = useState(radioValues[0])

  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [dob, setDOB] = useState()
  const [companyId, setCompanyId] = useState()
  const [result, setResult] = useState()

  const onSubmit = async () => {
    var res

    switch (selectedRadio) {
      case radioValues[0]:
        res = await deleteUser({ variables: { id } })
        break
      case radioValues[1]:
        res = await updateUser({ variables: { companyId, dob, firstName, lastName, id } })
        break
    }
    setResult(res)
  }

  var success = result?.data?.deleteUser?.id || result?.data?.updateUser?.id || false

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
          <Details user={user} />
          <Radio selected={selectedRadio} setSelected={setSelectedRadio} values={radioValues} />
          <Hidden show={selectedRadio === radioValues[1]}>
            <Field label='First Name'>
              <InputField
                onBlur={e => {
                  setFirstName(e?.target?.value)
                }}
                placeholder={user.firstName}
              />
            </Field>
            <Field label='Last Name'>
              <InputField onBlur={e => setLastName(e?.target?.value)} placeholder={user.lastName} />
            </Field>
            <Field label='Date of Birth'>
              <InputField onBlur={e => setDOB(e?.target?.value)} placeholder={formatDate(user.dob)} type='date' />
            </Field>
            <Field label='Company'>
              <CompanyPicker company={user.company} setCompanyId={setCompanyId} />
            </Field>
          </Hidden>
        </>
      )}
    </Modal>
  )
}

export default User
