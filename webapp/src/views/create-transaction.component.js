import React, { useState, useEffect } from 'react'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import { css } from '@emotion/core'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'

export function CreateTransaction () {
  const [transaction, setTransaction] = useState({ amount: 0, credit: false, debit: '', description: '', merchantId: undefined, userId: undefined })

  const handleChange = ({ target }) => {
    if (target.value === 'credit') {
      setTransaction({ ...transaction, credit: true, debit: false })
    } else if (target.value === 'debit') {
      setTransaction({ ...transaction, debit: true, credit: false })
    } else {
      setTransaction({ ...transaction, [target.name]: target.value })
    }
  }

  useEffect(() => {
    console.log(transaction)
  }, [transaction])

  return (
    <>
      <div css={containerStyle}>
        <InputLabel id='amount'>Amount</InputLabel>
        <Input
          name='amount'
          onChange={handleChange}
          type='text'
          value={transaction.amount}
        />

        <div>
          <FormControl css={inputLabelStyle}>
            <RadioGroup aria-label='debitOrCredit' name='debitOrCredit' onChange={handleChange} row>
              <FormControlLabel control={<Radio />} label='Credit' value='credit' />
              <FormControlLabel control={<Radio />} label='Debit' value='debit' />
            </RadioGroup>
          </FormControl>
        </div>

        <InputLabel css={inputLabelStyle} id='description'>Description</InputLabel>
        <textarea
          css={descriptionStyle}
          name='description'
          onChange={handleChange}
          value={transaction.description}
        />
        <InputLabel css={inputLabelStyle} id='merchant'>Merchant</InputLabel>
        <Select css={selectStyle} name='merchantId' onBlur={handleChange}>
          <option value=''> </option>
          <option value='344296f8-93a2-4935-8f4b-89a377585293'>Tesla</option>
        </Select>

        <InputLabel css={inputLabelStyle} id='users'>User</InputLabel>
        <Select css={selectStyle} name='userId' onBlur={handleChange}>
          <option value=''> </option>
          <option value='1544bcf6-11a1-42ce-b640-b8e3ed2626d4'>Eliott Moreno</option>
        </Select>
        <div>
          <Button css={buttonStyle}>
          Create Transaction
          </Button>
        </div>
      </div>
    </>
  )
}

const buttonStyle = css`
  background-color: black;
  border-radius: 15px;
  color: white;
  margin-top: 12px;
  padding: 6px 16px;
  &:hover {
    background-color: #3b3b3b;
  }
`

const containerStyle = css`
  background-color: #efefef;
  border-radius: 25px;
  display: inline-block;
  padding: 40px;
  width: 200px;
`
const descriptionStyle = css`
  border-radius: 10px;
  border: 0px;
  margin-top: 8px;
`

const selectStyle = css`
  width: 180px;
`
const inputLabelStyle = css`
  padding-top: 12px;
`
