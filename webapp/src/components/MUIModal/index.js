import React from 'react'
import { bool, func, object } from 'prop-types'
import { Backdrop, Fade, makeStyles, Modal } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '600px',
    left: 0,
    right: 0,
    margin: 'auto'
  },
  paper: {
    alignContent: 'center',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}))
export default function MUIModal ({ content, handleClose, handleOpen, open }) {
  const classes = useStyles()

  return (
    <Modal
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
      aria-describedby='transition-modal-description'
      aria-labelledby='transition-modal-title'
      className={classes.modal}
      closeAfterTransition
      onClose={handleClose}
      open={open}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          {content}
        </div>
      </Fade>
    </Modal>
  )
}

MUIModal.propTypes = {
  content: object.isRequired,
  handleClose: func.isRequired,
  handleOpen: func.isRequired,
  open: bool.isRequired
}
