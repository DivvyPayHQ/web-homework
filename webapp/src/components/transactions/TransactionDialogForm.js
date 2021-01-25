import React, { useState } from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  TextField
} from '@material-ui/core'
import { DangerButton, SuccessButton } from '../buttons'
import { CategoriesDropdown } from '../categories'
import { MerchantsDropdown } from '../merchants'
import { UsersDropdown } from '../users'
import { translate } from '../../utils/translate'

const Form = styled.form`
  min-width: 400px;

  @media scren and (max-width: 450px) {
    min-width: 90vw
  }
`

const StyledDialogContent = styled(DialogContent)`
  > div {
    margin: .5em 0;
  }

  > fieldset {
    margin: 1em 0 0;
  }

  label {
    text-transform: capitalize;
  }
`

const StyledRadio = styled(Radio)`
  color: ${props => props.theme.colors.info} !important;
`

export const TransactionDialogForm = ({ defaultValues, loading, onClose, onSubmit, title }) => {
  const [userId, setUserId] = useState(defaultValues?.userId || '')
  const [merchantId, setMerchantId] = useState(defaultValues?.merchantId || '')
  const [categoryId, setCategoryId] = useState(defaultValues?.categoryId || '')
  const [description, setDescription] = useState(defaultValues?.description || '')
  const [amount, setAmount] = useState(defaultValues?.amount || '')
  const [date, setDate] = useState(defaultValues?.date || '')
  const [debitCredit, setDebitCredit] = useState(defaultValues?.credit ? 'credit' : 'debit')

  const submitForm = e => {
    e.preventDefault()
    onSubmit({ userId, merchantId, categoryId, description, amount, date, debitCredit })
  }

  const disabled = !userId || !merchantId || !categoryId || !description || !amount || !date

  return (
    <Form onSubmit={submitForm}>
      <DialogTitle>{title}</DialogTitle>
      <StyledDialogContent>
        <DialogContentText>{translate('all_fields_required')}</DialogContentText>
        <UsersDropdown onSelect={e => setUserId(e.target.value)} value={userId} />
        <MerchantsDropdown onSelect={e => setMerchantId(e.target.value)} value={merchantId} />
        <CategoriesDropdown onSelect={e => setCategoryId(e.target.value)} value={categoryId} />
        <TextField
          fullWidth
          id='date'
          label={translate('date')}
          margin='dense'
          onChange={e => setDate(e.target.value)}
          placeholder='yyyy-mm-dd'
          required
          value={date}
        />
        <TextField
          fullWidth
          id='description'
          label={translate('description')}
          margin='dense'
          onChange={e => setDescription(e.target.value)}
          required
          value={description}
        />
        <FormControl component='fieldset'>
          <FormLabel component='legend'>{translate('credit_or_debit')}</FormLabel>
          <RadioGroup
            aria-label='credit'
            name='credit'
            onChange={e => setDebitCredit(e.target.value)}
            value={debitCredit}
          >
            <FormControlLabel control={<StyledRadio />} label={translate('credit')} value='credit' />
            <FormControlLabel control={<StyledRadio />} label={translate('debit')} value='debit' />
          </RadioGroup>
        </FormControl>
        <TextField
          fullWidth
          id='amount'
          label={translate('amount')}
          margin='dense'
          onChange={e => setAmount(e.target.value)}
          required
          type='number'
          value={amount}
        />
      </StyledDialogContent>
      <DialogActions>
        <DangerButton onClick={onClose}>{translate('cancel')}</DangerButton>
        <SuccessButton disabled={disabled} type='submit'>
          {translate('save')}
          {loading && ' ...'}
        </SuccessButton>
      </DialogActions>
    </Form>
  )
}

TransactionDialogForm.propTypes = {
  loading: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  defaultValues: PropTypes.object
}
