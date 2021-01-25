import React, { useState } from 'react'
import TransactionsList from './TransactionsList'
import AddTransaction from './AddTransaction'
import Modal from '@material-ui/core/Modal'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'

export function Transactions () {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div
      style={{
        padding: '80px',
        height: 'auto',
        width: '91%',
        marginTop: '-15px',
        marginLeft: '-5px',
        backgroundImage: 'linear-gradient(to right, #d7d2cc 0%, #304352 100%)'
      }}
    >
      <h1 style={Styles.title}>Transactions</h1>
      <Button color='primary' onClick={handleOpen} style={Styles.addButton} type='button' variant='contained'>
        <AddIcon />
        Add Transaction
      </Button>
      <Modal
        aria-describedby='simple-modal-description'
        aria-labelledby='simple-modal-title'
        onClose={handleClose}
        open={open}
        style={Styles.modalStyle}
      >
        <AddTransaction handleClose={handleClose} />
      </Modal>
      <TransactionsList />
    </div>
  )
}

const Styles = {
  modalStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    margin: '100px'
  },
  title: {
    textAlign: 'center',
    marginTop: '-60px',
    color: 'white'
  },
  addButton: {
    margin: '0 auto',
    display: 'block'
  }
}
