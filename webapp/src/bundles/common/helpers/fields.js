import { validateFields, validateField as validateSingleField } from '../validation/core'
import { cleanEnum } from '../utils/cleanEnum'

export function onChange (event, reference) {
  const { target: { name, value } } = event
  const { fields } = reference.state
  const { [name]: field } = fields
  reference.setState({
    fields: Object.assign({}, fields, {
      [name]: Object.assign({}, field, {
        value
      })
    })
  })
}

export function validate (reference, onComplete) {
  const { fields } = reference.state
  const result = validateFields(fields)
  reference.setState({
    fields: result.validatedFields,
    isValid: result.isValid
  }, onComplete)
}

export function validateField (reference, field, name, onComplete) {
  const { fields } = reference.state
  const result = validateSingleField(field)
  reference.setState({
    isValid: result.isValid,
    fields: {
      ...fields,
      [name]: result
    }
  }, onComplete)
}

export function onDropDownSelect (name, value, reference) {
  const event = { target: { name, value } }
  onChange(event, reference)
}

export function onDropDownSelectMultiple (name, value, reference) {
  const { fields } = reference.state
  const { [name]: field } = fields
  const array = field.value

  if (!array.map(item => (item.name === value.name)).includes(true)) {
    // Item not in array
    reference.setState({
      fields: Object.assign({}, fields, {
        [name]: Object.assign({}, field, {
          value: [...array, value]
        })
      })
    })
  } else if (array.map(item => (item.name === value.name)).indexOf(true) > -1) {
    // Item already in array
    const newArray = [...array]
    newArray.splice(array.map(item => (item.name === value.name)).indexOf(true), 1)
    reference.setState({
      fields: Object.assign({}, fields, {
        [name]: Object.assign({}, field, {
          value: newArray
        })
      })
    })
  }
}

export function arrayToString (array) {
  if (array.length === 0) {
    return ''
  } else if (array.length === 1) {
    return cleanEnum(array[0].name)
  } else {
    let string = cleanEnum(array[0].name)
    for (let i = 1; i < array.length; i += 1) {
      string += `, ${cleanEnum(array[i].name)}`
    }
    return string
  }
}
