import React, { useState } from 'react'
import { func } from 'prop-types'
import { Button, FormControl, Grid, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const defaultValues = {
  first_name: '',
  last_name: '',
  dob: ''
}

const validDate = (val) => {
  if (val === '') return false
  const regex = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/ // eslint-disable-line no-useless-escape
  return regex.test(val)
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: theme.spacing(1),
    width: '100%'
  },
  submitButton: {
    marginTop: theme.spacing(4),
    width: '100%'
  }
}))

const Add = ({ submitForm }) => {
  const classes = useStyles()
  const [formValues, setFormValues] = useState(defaultValues)
  const [validFirst, setValidFirst] = useState(true)
  const [validLast, setValidLast] = useState(true)
  const [validDOB, setValidDOB] = useState(true)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValid(name)
    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (validForm()) submitForm(formValues)
  }

  const setValid = (key) => {
    switch (key) {
      case 'first_name':
        if (!validFirst) setValidFirst(true)
        break

      case 'last_name':
        if (!validLast) setValidLast(true)
        break

      case 'dob':
        if (!validDOB) setValidDOB(true)
        break

      default:
        break
    }
  }

  const validForm = () => {
    let valid = true
    if (formValues.first_name === '') {
      setValidFirst(false)
      valid = false
    }
    if (formValues.last_name === '') {
      setValidLast(false)
      valid = false
    }
    if (!validDate(formValues.dob)) {
      setValidDOB(false)
      valid = false
    }

    return valid
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid alignItems='center' container justify='center'>
        <Grid item xs={12}>
          <FormControl className={classes.formControl}>
            <TextField
              error={!validFirst}
              helperText={validFirst ? '' : 'Enter a first name'}
              id='first_name'
              label='First Name'
              name='first_name'
              onChange={handleInputChange}
              type='text'
              value={formValues.first_name}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.formControl}>
            <TextField
              error={!validLast}
              helperText={validLast ? '' : 'Enter a last name'}
              id='last_name'
              label='Last Name'
              name='last_name'
              onChange={handleInputChange}
              type='text'
              value={formValues.last_name}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl className={classes.formControl}>
            <TextField
              error={!validDOB}
              helperText={validDOB ? '' : 'Enter a valid date (YYYY-MM-DD)'}
              id='dob'
              label='Date Of Birth'
              name='dob'
              onChange={handleInputChange}
              placeholder='YYYY-MM-DD'
              type='text'
              value={formValues.dob}
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

Add.propTypes = {
  submitForm: func.isRequired
}

export default Add
