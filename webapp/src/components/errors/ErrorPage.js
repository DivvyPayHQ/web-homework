import React from 'react'
import PropTypes from 'prop-types'
import { MainHeader } from '../../components/headers'
import { translate } from '../../utils/translate'

export const ErrorPage = ({ error, errorMessageLookup }) => {
  console.error(error)
  return (
    <>
      <MainHeader>{translate('error')}</MainHeader>
      <p>{translate(errorMessageLookup)}</p>
    </>
  )
}

ErrorPage.defaultProps = {
  errorMessageLookup: 'error_message'
}

ErrorPage.propTypes = {
  errorMessageLookup: PropTypes.string,
  error: PropTypes.any
}
