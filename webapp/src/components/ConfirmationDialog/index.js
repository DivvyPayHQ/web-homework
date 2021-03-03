import React from 'react'
import { bool, func, number } from 'prop-types'
import { Button, DialogTitle, DialogContent, DialogActions, Dialog } from '@material-ui/core'

export default function ConfirmationDialog ({ onClose, open, selected }) {
  const handleCancel = () => { onClose() }
  const handleOk = () => { onClose(true) }

  return (
    <Dialog
      aria-labelledby='confirmation-dialog-title'
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth='xs'
      open={open}
    >
      <DialogTitle id='confirmation-dialog-title'>Confirm Action</DialogTitle>
      <DialogContent dividers>
        {`Are you sure you want to delete ${selected}${selected > 1 ? ' transactions?' : ' transaction?'}`}
      </DialogContent>
      <DialogActions>
        <Button color='primary' onClick={handleCancel}>
          Cancel
        </Button>
        <Button color='primary' onClick={handleOk}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ConfirmationDialog.propTypes = {
  onClose: func.isRequired,
  open: bool.isRequired,
  selected: number.isRequired
}
