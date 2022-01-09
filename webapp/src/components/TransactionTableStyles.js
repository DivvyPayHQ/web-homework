import { css } from '@emotion/core'

export const transactionCard = css`
list-style-type: none;

li {
  border: 1px solid #f2f2f2;
  box-shadow: 3px 3px 5px rgba(50,50,50,0.1);
  padding: 30px 30px 20px 20px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 10px;
  position: relative;
  border-left: 4px solid #5da0a2;
  margin-bottom: 20px;
}
.id {
  font-size: 8px;
  font-style: italics;
  color: #757575;
}
.description {
  font-size: 20px;
  font-weight: 900;
  color: #34495e;
}
.merchant {
  font-size: 12px;
  color: #aacfd0;
}
.created-at {
  text-align: right;
  font-size: 8px;
  font-style: italics;
  color: #757575;
}
.amount {
  font-size: 20px;
  font-style: 900;
  text-align: right;
  color: #5da0a2;
}
.type {
  font-size: 12px;
  text-align: right;
  color: #aacfd0;
}
.delete-button {
  position: absolute;
  top: 0;
  right:0;
}
`
