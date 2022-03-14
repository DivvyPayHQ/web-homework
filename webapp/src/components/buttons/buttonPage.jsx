import React from 'react'
import { bool } from 'prop-types'
import { Button } from './funButton'
import { css } from '@emotion/core'
import { gibberishConverter } from '../../utils/i18nConverter'
import { romanNumeralConverter } from '../../utils/romanNumeralConverter'

export function ButtonPage ({ convertRoman }) {
  let text = 'This is mostly to show off this custom button because its fun to click and I was pleased with how the animation turned out. Thanks for fun work!'
  let text2 = '4nd h3r3 15 50m3 73x7 w17h r4nd0m numb3r5 m1x3d 1n 70 b3773r 5h0w 0ff 7h3 r0m4n num3r4l c0nv3r73r.'
  const isI18nEnabled = window.location.search.includes('i18n=true')

  return (
    <div css={buttonContainer}>
      <div className='text'>{gibberishConverter(convertRoman ? text : romanNumeralConverter(text), isI18nEnabled)}</div>
      <Button icon={'+'} />
      <div className='text'>{gibberishConverter(convertRoman ? text2 : romanNumeralConverter(text2), isI18nEnabled)}</div>
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

    .text {
      width: 70%
    }
`
