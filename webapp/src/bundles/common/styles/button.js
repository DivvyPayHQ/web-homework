import { css } from '@emotion/core'
import * as COLORS from 'Config/colors'
import { defaultFont } from 'Config/fonts'

export const baseButton = css`
  width: 100%;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-family: ${defaultFont};
  font-size: 13px;
  font-weight: 700;
  color: ${COLORS.WHITE};
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;

  &:focus {
    outline: none;
  }

  &:hover {
    opacity: 0.8;
  }
`
