import React, { useState } from 'react'
import { CreateTransaction } from './create-transaction'
import { css } from '@emotion/core'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'

export function TransactionModal () {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  function ModalBody () {
    return (
      <Modal
        aria-describedby='simple-modal-description'
        aria-labelledby='simple-modal-title'
        css={paper}
        onClose={handleClose}
        open={open}
      >
        <CreateTransaction />
      </Modal>
    )
  }

  const MyModal = React.forwardRef((props, ref) => <ModalBody {...props} ref={ref} />)
  MyModal.displayName = 'MyModal'

  return (
    <div>
      <Button css={buttonStyle} onClick={handleOpen} type='button' variant='outlined' >
        Add Transaction
      </Button>
      <div css={paper} >
        {/* <Modal
          aria-describedby='simple-modal-description'
          aria-labelledby='simple-modal-title'
          css={paper}
          onClose={handleClose}
          open={open}
        >
          <CreateTransaction />
        </Modal> */}
        { MyModal }
      </div>
    </div>
  )
}

const paper = css`
  position: absolute;
  top: 50%;
  left: 50%
`

const buttonStyle = css`
  float: right;
`
