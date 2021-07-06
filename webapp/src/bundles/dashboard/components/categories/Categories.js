import React from 'react'
import Section, { SECTION_TYPES } from 'Components/section/Section'
import DonutChart from '../donutChart/DonutChart'
import { css } from '@emotion/core'
import { prepareCategories } from '../../functions/prepareCategories'
import * as COLORS from 'Config/colors'

const data = [
  {
    value: 10,
    label: 'Food'
  },
  {
    value: 10,
    label: 'Food'
  },
  {
    value: 10,
    label: 'Services'
  },
  {
    value: 10,
    label: 'Shopping'
  },
  {
    value: 10,
    label: 'Health'
  },
  {
    value: 12,
    label: 'Transportation'
  },
  {
    value: 12,
    label: 'Entertainment'
  }
]

const colors = {
  Food: COLORS.GREEN,
  Services: COLORS.PURPLE,
  Shopping: COLORS.BLUE_LIGHT,
  Health: COLORS.RED,
  Transportation: COLORS.YELLOW,
  Entertainment: COLORS.BLUE_MEDIUM
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
        <div css={chartWrapperStyles}>
          <DonutChart
            data={preparedData}
            theme={theme}
          />
        </div>
        <div css={legendContainerStyles}>
          {
            preparedData.map(data => {
              const { label, color } = data
              return (
                <div css={itemContainer}>
                  <div css={iconStyles} style={{ background: color }} />
                  <p css={labelStyles} style={{ color }}>{label}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </Section>
  )
}

const containerStyles = css`
`

const chartWrapperStyles = css`
  height: 200px;
  padding: 20px;
`

const legendContainerStyles = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const itemContainer = css`
  display: flex;
  align-items: center;
`

const iconStyles = css`
  height: 5px;
  width: 5px;
  border-radius: 50%;
  margin-right: 10px;
`

const labelStyles = css`
  text-transform: capitalize;
  margin: 0;
`
