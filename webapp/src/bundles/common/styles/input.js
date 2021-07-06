import { css } from '@emotion/core'
import { defaultFont } from 'Config/fonts'

export const baseInput = css`
  border-radius: 5px;
  border: solid 1px;
  box-sizing: border-box;
  font-family: ${defaultFont};
  padding: 5px;
  font-size: 14px;
  min-width: 0;
  &:focus {
    outline: none;
  }
`
