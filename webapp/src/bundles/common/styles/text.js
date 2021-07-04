import { css } from '@emotion/core'
import { defaultFont } from '../config/fonts'

export const baseLabel = css`
  font-family: ${defaultFont};
  font-weight: 600;
  font-size: 15px;
  width: 100%;
  text-align: left;
  text-transform: capitalize;
  margin: 0 0 5px;
`

export const baseValue = css`
  font-family: ${defaultFont};
  font-size: 15px;
  font-weight: 300;
  margin: 0;
`
