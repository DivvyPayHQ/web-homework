import { css } from '@emotion/react'

export const txTableStyles = css`
display: flex;
flex-direction: column;
align-items: center;
width: 100%

table {
  border-collapse: collapse;
}

th, td {
  text-align: center;
  padding: 2px;
  font-size: 2vw;
}

tr:nth-child(even){background-color: #f2f2f2}

tr:hover {background-color: #ddd;}

th {
  background-color: #0067b7;
  color: white;
}

.buttons {
  display:flex;
}

`
