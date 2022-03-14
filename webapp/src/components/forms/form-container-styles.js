import { css } from '@emotion/react'

export const formContainerStyles = css`

position: absolute;
background: white;
top: 20%;
border-radius: 5px;

.blocker {
  position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  background: #ffffffa3;
}


.transaction-form {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  align-items: center;
  border-radius: 5px;
}

`
