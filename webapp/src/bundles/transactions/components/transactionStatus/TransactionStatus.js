import React from 'react'
import { shape, string } from 'prop-types'
import { resolveTransactionStatus } from '../../functions/resolveTransactionStatus'
import StatusIcon from 'Components/statusIcon/StatusIcon'
import { baseLabel } from 'Styles/text'
import { css } from '@emotion/core'

export default function TransactionStatus ({ theme, status }) {
  const statusType = resolveTransactionStatus(status)
  return (
    <div css={containerStyles}>
      <p css={baseLabel} style={{ color: theme.color }}>status</p>
      <StatusIcon
        statusType={statusType}
        text={status}
      />
    </div>

  )
}

const containerStyles = css`
  display: flex;
  flex-direction: column;
`

TransactionStatus.propTypes = {
  theme: shape().isRequired,
  status: string.isRequired
}
