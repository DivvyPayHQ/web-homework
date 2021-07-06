import { handleNull } from '../utils/handleNull'

const validator = require('validator')

export function isMobilePhone (value) {
  if (!validator.isMobilePhone(`${value}`)) {
    return 'Invalid Number'
  }
  return null
}

export function isPostalCode (value) {
  if (!validator.isPostalCode(`${value}`)) {
    return 'Invalid Zip Code'
  }
  return null
}

export function isEmail (value) {
  if (!validator.isEmail(`${value}`)) {
    return 'Invalid Email'
  }
  return null
}

export function isNotEmpty (value) {
  if (validator.isEmpty(`${handleNull(value)}`)) {
    return 'Required'
  }
  return null
}

export function isNumeric (value) {
  if (!validator.isNumeric(`${value}`)) {
    return 'Numbers Only'
  }
  return null
}

export function isWholeNumber (value) {
  if (!validator.isNumeric(`${value}`, { no_symbols: true })) {
    return 'No Decimals'
  }
  return null
}
