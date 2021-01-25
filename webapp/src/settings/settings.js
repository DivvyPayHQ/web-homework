import React, { useState } from 'react'
import { Panel, Toggle } from 'rsuite'
import { css } from '@emotion/core'

export default function Settings (props) {

  const [roman, setRoman] = useState(JSON.parse(localStorage.getItem('romanNumeral')))
  const toggleRoman = val => {
    localStorage.setItem('romanNumeral', val)
    setRoman(val)
  }

  const toggleStyle = css`
    margin-right: 10px;
  `

  return (
    <Panel bordered header="Settings">
      <Toggle checked={roman} css={toggleStyle} id="roman" onChange={toggleRoman} />
      <label htmlFor="roman">Roman Numerals</label>
    </Panel>
  );

}