/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import { css } from '@emotion/core'

const TableHeader = () => {
  return (
    <div css={grid}>
      <div css={gridCol1}>AMOUNT</div>
      <div css={gridCol2}>USER</div>
      <div css={gridCol3}>MERCHANT</div>
      <div css={gridCol4}>CATEGORY</div>
      <div css={gridCol5}>DESCRIPTION</div>
      <div css={gridCol6}>TYPE</div>
    </div>
  )
}
export default TableHeader
const grid = css`
display: grid;
grid-template-columns: 9% 22% 13% 13% 28% 9% 6%;
border-bottom: 1px solid #F2ECF3;
height: 35px;
align-items: center;
font-size: 14px;
color: #857888;
`
const gridCol1 = css`
grid-column: 1;
`
const gridCol2 = css`
grid-column: 2;
`
const gridCol3 = css`
grid-column: 3;
`
const gridCol4 = css`
grid-column: 4;
`
const gridCol5 = css`
grid-column: 5;
`
const gridCol6 = css`
grid-column: 6;
`
