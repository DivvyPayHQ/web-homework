import { css } from '@emotion/core'

export const buttonOne = css`
  background: #34495e;  
  color: #f4f7f7; 
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  border: none;

  :hover {
    background: #f4f7f7;
    color: #34495e;
  }
`
export const buttonTwo = css`
  background: #5da0a2;
  color: #f4f7f7;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  border: none;

  :hover {
    background: #757575;
  }
`

export const form = css`
.user-form, .add-transaction-form, add-photo-form {
  max-width: 360px;
  padding: 30px;
  background: #aacfd0; 
  border-radius: 4px;
}

.add-transaction-form {
  width: 100%;
}

.user-form {
  margin: 50px auto;
  }

.form-title {
  color: #34495e;
  text-transform: lowercase;
  font-size: 24px;
}

input, select {
  padding: 8px 6px;
  font-size: 1em;
  color: #757575; 
  border-radius: 4px;
  border: none;
}

input {
  width: 97%;
}

select {
  width: 100%;
}

label {
  font-weight: 900;
  display: block;
  margin: 30px auto;
  color: #34495e; 
}

span {
  display: block;
  margin-bottom: 6px;
}

.button-container {
  display: block;

  button {
    width: 100%;
    margin-bottom: 10px;
  }
}
`
export const errorMessage = css`
  color: red;
  text-align: center;
  margin-top: 20px;
`
