import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import { css } from '@emotion/core'

export function CreateTransaction () {
  const [amount, setAmount] = useState(0)
  return (
    <>
      <div css={containerStyle}>
        <div css={inputStyle}>
          <TextField
            onChange={(event) => {
              console.log('new amount', event.target.value)
              setAmount(event.target.value)
            }}
            type='number'
            value={amount}
          />
        </div>
        <div>
          <Button
            css={buttonStyle}
            onChange={() => {
              console.log('adding')
            }}
            variant='outlined'
          >
            ADD TRANSACTION
          </Button>
        </div>
      </div>
    </>
  )
}

const containerStyle = css`
  border-radius: 15px;
  max-width: 250px;
`

const buttonStyle = css`
  background-color: white;
  color: black;
`

const inputStyle = css`
  margin: auto;
  padding: 8px;
`
