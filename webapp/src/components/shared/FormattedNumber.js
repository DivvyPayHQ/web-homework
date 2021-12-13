import PropTypes from 'prop-types'
import React, { Fragment, useContext } from 'react'

import { SettingsContext } from 'src/context/SettingsContext'

import { convertToRoman } from 'src/utils/numbers'

export function FormattedNumber ({ number }) {
  const { options } = useContext(SettingsContext)

  if (options.showRomanNumerals) {
    return (<Fragment>{convertToRoman(number)}</Fragment>)
  }

  return (
    <Fragment>${number}</Fragment>
  )
}

FormattedNumber.propTypes = {
  number: PropTypes.number.isRequired
}
