import React from 'react'
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'
import { useTokens } from '@kyper/tokenprovider'

import ROUTES from 'src/constants/Routes'

export function TxModal (props) {
  const navigate = useNavigate()
  const tokens = useTokens()
  const styles = getStyles(tokens)

  return (
    <Modal isOpen
      onRequestClose={() => {
        navigate(ROUTES.TRANSACTIONS)
      }}
      style={styles}
    >
      Hello World
    </Modal>
  )
}

const getStyles = tokens => ({
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  content: {
    background: tokens.Color.Neutral900,
    border: 'none'
  }
})
