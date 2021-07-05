import React from 'react'
import { shape, string, func } from 'prop-types'
import GoodIcon from 'Assets/statusIcons/GoodIcon'
import WarningIcon from 'Assets/statusIcons/WarningIcon'
import BadIcon from 'Assets/statusIcons/BadIcon'
import * as COLORS from 'Config/colors'
import { css } from '@emotion/core'

export const STATUS_TYPES = {
  GOOD: {
    icon: GoodIcon,
    color: COLORS.GREEN
  },
  WARNING: {
    icon: WarningIcon,
    color: COLORS.YELLOW
  },
  BAD: {
    icon: BadIcon,
    color: COLORS.RED
  }
}

export default function StatusIcon ({ statusType, text }) {
  const { icon, color } = statusType
  const Icon = icon
  return (
    <div css={containerStyles}>
      <p css={textStyles} style={{ color }}>{text.toLowerCase()}</p>
      <div css={iconWrapper}>
        <Icon />
      </div>
    </div>
  )
}

const containerStyles = css`
  display: flex;
  align-items: center;
  justify-content: left;
`

const textStyles = css`
  font-weight: 700;
  text-transform: capitalize;
`

const iconWrapper = css`
  width: 20px;
  height: 20px;
  margin-left: 10px;
`

StatusIcon.propTypes = {
  statusType: shape({
    icon: func,
    color: string
  }).isRequired,
  text: string.isRequired
}
