function checkErrors (field) {
  const errors = []
  const { validators, value } = field
  // eslint-disable-next-line no-unused-expressions
    validators?.forEach((validator) => {
      const error = validator(value)
      if (error) {
        errors.push(error)
      }
    })
    if (errors.length > 0) {
      return { ...field, error: errors[0] }
    }
    return field
}

function areValid (validatedFields) {
  let isValid = true
  Object.values(validatedFields).forEach((field) => {
    if (field.error) {
      isValid = false
    }
  })
  return isValid
}

export function validateField (field) {
  const resetField = { ...field, error: undefined }
  const validatedField = checkErrors(resetField)
  if (validatedField.error) {
    return { ...validatedField, isValid: false }
  }
  return { ...validatedField, isValid: true }
}

export function validateFields (fields) {
  const validatedFields = {}
  Object.keys(fields).forEach((fieldName) => {
    const field = fields[fieldName]
    validatedFields[fieldName] = { ...validateField(field) }
  })
  const isValid = areValid(validatedFields)
  return { validatedFields, isValid }
}
