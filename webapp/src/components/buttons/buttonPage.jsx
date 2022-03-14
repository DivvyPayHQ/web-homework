import React from 'react'
import { bool } from 'prop-types'
import { Button } from './funButton'
import { css } from '@emotion/core'
import { gibberishConverter } from '../../utils/i18nConverter'
import { romanNumeralConverter } from '../../utils/romanNumeralConverter'

export function ButtonPage ({ convertRoman }) {
  let text = 'Some words here'
  const isI18nEnabled = window.location.search.includes('i18n=true')

  return (
    <div css={buttonContainer}>
      <div>{gibberishConverter(convertRoman ? text : romanNumeralConverter(text), isI18nEnabled)}</div>
      <Button icon={'+'} />
    </div>
  )
}

ButtonPage.propTypes = {
  convertRoman: bool
}

const buttonContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
`
