import { css } from '@emotion/react'

export const txTableStyles = css`
display: flex;
flex-direction: column;
align-items: center;
width: 70%;

table {
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.header {
  background-color: #40a8f8;
  color: #ffffff;
  text-align: left;
}

th, td {
  padding: 12px 15px;
}

tr {
  border-bottom: 1px solid #dddddd;
}

tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

tr:last-of-type {
  border-bottom: 2px solid #40a8f8;
}

tr:not(:first-of-type):hover {
  color: #009879;
}



.buttons {
  display:flex;
}

`
