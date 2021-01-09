import React, { useState } from 'react'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import { css } from '@emotion/core'
import { CREATE_USER } from '../../graphql/users'
import { useMutation } from '@apollo/react-hooks'

export function CreateUser () {
  const [createUser] = useMutation(CREATE_USER)
  const [user, setUser] = useState({ firstName: '', lastName: '', dob: '' })

  const handleChange = ({ target }) => {
    setUser({ ...user, [target.name]: target.value })
  }

  return (
    <>
      <div css={containerStyle}>
        <InputLabel id='firstName'>First Name</InputLabel>
        <Input
          name='firstName'
          onChange={handleChange}
          type='text'
          value={user.firstName}
        />

        <InputLabel css={inputLabelStyle} id='lastName'>Last Name</InputLabel>
        <Input
          name='lastName'
          onChange={handleChange}
          type='text'
          value={user.lastName}
        />

        <InputLabel css={inputLabelStyle} id='dob'>Date of Birth</InputLabel>
        <Input
          css={descriptionStyle}
          name='dob'
          onChange={handleChange}
          value={user.dob}
        />

        <div>
          <Button css={buttonStyle} onClick={() => {
            createUser({ variables: user })
          }}>
          Create User
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
