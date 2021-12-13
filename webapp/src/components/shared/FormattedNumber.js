import PropTypes from 'prop-types'
import React, { Fragment, useContext } from 'react'

import { SettingsContext } from 'src/context/SettingsContext'

import { convertToRoman } from 'src/utils/numbers'

export function FormattedNumber ({ prefix = '$', number }) {
  const { options } = useContext(SettingsContext)

  if (options.showRomanNumerals && number >= 1) {
    return (<Fragment>{convertToRoman(Math.floor(number))}</Fragment>)
  }

  return (
    <Fragment>{prefix}{number}</Fragment>
  )
}

FormattedNumber.propTypes = {
  number: PropTypes.number.isRequired,
  prefix: PropTypes.string
}
