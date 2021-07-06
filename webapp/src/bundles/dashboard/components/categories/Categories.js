import React from 'react'
import Section, { SECTION_TYPES } from 'Components/section/Section'
import DonutChart from '../donutChart/DonutChart'
import { css } from '@emotion/core'
import { prepareCategories } from '../../functions/prepareCategories'
import * as COLORS from 'Config/colors'

const data = [
  {
    value: 10,
    label: 'two'
  },
  {
    value: 10,
    label: 'one'
  },
  {
    value: 10,
    label: 'one'
  },
  {
    value: 10,
    label: 'two'
  },
  {
    value: 10,
    label: 'one'
  },
  {
    value: 12,
    label: 'three'
  }
]

const colors = {
  one: COLORS.GREEN,
  two: COLORS.PURPLE,
  three: COLORS.BLUE_LIGHT
}

export default function Categories ({ theme }) {
  const preparedData = prepareCategories(data, colors)
  return (
    <Section
      theme={theme}
      title='categories'
      type={SECTION_TYPES.HALF}
    >
      <div css={containerStyles}>
        <DonutChart
          data={preparedData}
          theme={theme}
        />
      </div>
    </Section>
  )
}

const containerStyles = css`
  height: 200px;
  padding: 20px 0;
`
