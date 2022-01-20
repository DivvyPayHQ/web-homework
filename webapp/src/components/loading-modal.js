import React from 'react'
import { Field, LoadingShimmer } from './'

/************************************
 * DEFAULT COMPONENT
 ***********************************/
function LoadingModal () {
  return (
    <>
      <Field>
        <LoadingShimmer height='48px' />
      </Field>
      <Field>
        <LoadingShimmer height='48px' />
      </Field>
      <Field>
        <LoadingShimmer height='48px' />
      </Field>
      <Field>
        <LoadingShimmer height='48px' />
      </Field>
      <Field>
        <LoadingShimmer height='48px' />
      </Field>
    </>
  )
}
export default LoadingModal
