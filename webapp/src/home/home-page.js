import React, { Fragment, useState } from 'react'
import gql from 'graphql-tag'
import Transactions from '../Components/Transactions'
import AddTransaction from '../Components/AddTransaction'
import EditTransactionForm from '../Components/EditTransactionForm'
import Modal from '@material-ui/core/Modal'

export function Home () {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Fragment>
      {/* <Link to='/another'>Another route</Link> */}
      {/* <button></button> */}
      <button onClick={handleOpen} type='button'>
        Add Transaction
      </button>
      <Modal
        aria-describedby='simple-modal-description'
        aria-labelledby='simple-modal-title'
        onClose={handleClose}
        open={open}
      >
        <AddTransaction />
      </Modal>
      <Transactions />
    </Fragment>
  )
}
