import React, { useState } from 'react'
import { bool, func, number, shape, string } from 'prop-types'
import { DataDropdown } from 'components'
import { Button, Checkbox, FormControl, FormControlLabel, Grid, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const isValidated = (type, val) => {
  let regex
  switch (type) {
    case 'amount':
      regex = /^[1-9]\d*(\.\d+)?$/
      return regex.test(val)

    case 'date':
      regex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/ // eslint-disable-line no-useless-escape
      return regex.test(val)

    default:
      return false
  }
}

const useStyles = makeStyles((theme) => ({
  checkboxArea: {
    margin: theme.spacing(1),
    paddingTop: '20px'
  },
  formControl: {
    marginBottom: theme.spacing(1),
    width: '100%'
  },
  submitButton: {
    marginTop: theme.spacing(4),
    width: '100%'
  }
}))

const flattenData = (data) => ({
  ...data,
  category_id: data.category.id,
  merchant_id: data.merchant.id,
  user_id: data.user.id
})

const Edit = ({ submitForm, transaction }) => {
  const flattenedData = flattenData(transaction)
  const classes = useStyles()
  const [formValues, setFormValues] = useState(flattenedData)
  const [validUser, setValidUser] = useState(true)
  const [validCategory, setValidCategory] = useState(true)
  const [validMerchant, setValidMerchant] = useState(true)
  const [validAmount, setValidAmount] = useState(true)
  const [validDate, setValidDate] = useState(true)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValid(name)
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setFormValues({
      ...formValues,
      [name]: checked
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (validForm()) submitForm(formValues)
  }

  const setValid = (key) => {
    switch (key) {
      case 'user_id':
        if (!validUser) setValidUser(true)
        break

      case 'category_id':
        if (!validCategory) setValidCategory(true)
        break

      case 'merchant_id':
        if (!validMerchant) setValidMerchant(true)
        break

      case 'amount':
        if (!validAmount) setValidAmount(true)
        break

      case 'date':
        if (!validDate) setValidDate(true)
        break

      default:
        break
    }
  }

  const validForm = () => {
    let valid = true
    if (formValues.user_id === '') {
      setValidUser(false)
      valid = false
    }
    if (formValues.category_id === '') {
      setValidCategory(false)
      valid = false
    }
    if (formValues.merchant_id === '') {
      setValidMerchant(false)
      valid = false
    }
    if (!isValidated('amount', formValues.amount)) {
      setValidAmount(false)
      valid = false
    }
    if (!isValidated('date', formValues.date)) {
      setValidDate(false)
      valid = false
    }

    return valid
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid alignItems='center' container justify='center'>
        <Grid className={classes.formControl} item xs={12}>
          <DataDropdown
            error={!validUser}
            onChange={handleInputChange}
            type='user'
            value={formValues.user_id}
          />
        </Grid>
        <Grid className={classes.formControl} item xs={12}>
          <DataDropdown
            error={!validCategory}
            onChange={handleInputChange}
            type='category'
            value={formValues.category_id}
          />
        </Grid>
        <Grid className={classes.formControl} item xs={12}>
          <DataDropdown
            error={!validMerchant}
            onChange={handleInputChange}
            type='merchant'
            value={formValues.merchant_id}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <FormControl className={classes.checkboxArea}>
              <TextField
                error={!validAmount}
                helperText={validAmount ? '' : 'Enter an numerical amount'}
                id='amount'
                label='Amount'
                name='amount'
                onChange={handleInputChange}
                type='number'
                value={formValues.amount}
              />
            </FormControl>
            <FormControlLabel
              className={classes.checkboxArea}
              control={
                (
                  <Checkbox
                    checked={formValues.credit}
                    color='primary'
                    id='credit'
                    inputProps={{ 'aria-label': 'purchased with credit' }}
                    name='credit'
                    onChange={handleCheckboxChange}
                  />
                )
              }
              label='Credit?'
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.formControl}>
            <TextField
              error={!validDate}
              helperText={validDate ? '' : 'Enter a valid date (YYYY-MM-DD)'}
              id='date'
              label='date'
              name='date'
              onChange={handleInputChange}
              placeholder='YYYY-MM-DD'
              type='text'
              value={formValues.date}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.formControl}>
            <TextField
              id='description'
              label='description'
              name='description'
              onChange={handleInputChange}
              type='text'
              value={formValues.description}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button className={classes.submitButton} color='primary' type='submit' variant='contained'>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

Edit.propTypes = {
  transaction: shape({
    amount: number.isRequired,
    category: shape({
      id: string.isRequired
    }),
    credit: bool.isRequired,
    date: string.isRequired,
    description: string.isRequired,
    merchant: shape({
      id: string.isReauired
    }),
    user: shape({
      id: string.isRequired
    })
  }),
  submitForm: func.isRequired
}

export default Edit
