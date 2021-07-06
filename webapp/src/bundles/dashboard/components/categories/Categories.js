import React from 'react'
import { shape, number, string, bool } from 'prop-types'
import { toDollars } from 'Functions/toDollars'
import { toRoman } from 'Functions/toRoman/toRoman'
import Section, { SECTION_TYPES } from 'Components/section/Section'
import DonutChart from '../donutChart/DonutChart'
import shortId from 'shortid'
import { css } from '@emotion/core'
import { prepareCategories } from '../../functions/prepareCategories'
import * as COLORS from 'Config/colors'

const colors = {
  Food: COLORS.GREEN,
  Services: COLORS.PURPLE,
  Shopping: COLORS.BLUE_LIGHT,
  Health: COLORS.RED,
  Transportation: COLORS.YELLOW,
  Entertainment: COLORS.BLUE_MEDIUM
}

export default function Categories ({ theme, transactions, roman }) {
  const preparedData = prepareCategories(transactions, colors)
  return (
    <Section
      theme={theme}
      title='categories'
      type={SECTION_TYPES.HALF}
    >
      <div>
        <div css={chartWrapperStyles}>
          <DonutChart
            data={preparedData}
            highlightHandler={roman ? toRoman : toDollars}
            theme={theme}
          />
        </div>
        <div css={legendContainerStyles}>
          {
            preparedData.map(data => {
              const { label, color } = data
              return (
                <div css={itemContainer} key={shortId.generate()}>
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

Categories.propTypes = {
  roman: bool.isRequired,
  transactions: shape({
    id: string,
    merchant: string,
    amount: number,
    date: string,
    category: string,
    status: string
  }),
  theme: shape({
    type: string,
    background: string,
    secondary: string,
    color: string,
    accent: string,
    highlight: string
  })
}
