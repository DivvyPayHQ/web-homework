import { css } from '@emotion/core'

export const transactionPage = css`

.title {
  color: #34495e;
  text-transform: lowercase;
  font-size: 30px;
  text-align: center;
}

.transaction-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  max-width: 960px;
  margin: 0 auto;
}

.transactions {
  padding-right: 30px;
  margin-bottom: 20px;
}

.add-transaction-form {
  padding-left: 30px;
}
`
