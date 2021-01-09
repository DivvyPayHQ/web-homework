import React, { useState } from 'react'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import { css } from '@emotion/core'
import { CREATE_MERCHANT } from '../../graphql/merchants'
import { useMutation } from '@apollo/react-hooks'

export function CreateMerchant () {
  const [createMerchant] = useMutation(CREATE_MERCHANT)
  const [merchant, setMerchant] = useState({ description: '', name: '' })

  const handleChange = ({ target }) => {
    setMerchant({ ...merchant, [target.name]: target.value })
  }

  return (
    <>
      <div css={containerStyle}>
        <InputLabel id='name'>Name</InputLabel>
        <Input
          name='name'
          onChange={handleChange}
          type='text'
          value={merchant.name}
        />

        <InputLabel css={inputLabelStyle} id='description'>Description</InputLabel>
        <Input
          css={descriptionStyle}
          name='description'
          onChange={handleChange}
          value={merchant.description}
        />

        <div>
          <Button css={buttonStyle} onClick={() => {
            createMerchant({ variables: merchant })
          }}>
          Create Merchant
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
const inputLabelStyle = css`
  padding-top: 12px;
`
