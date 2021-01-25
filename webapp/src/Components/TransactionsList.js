import React, { useEffect, useState } from 'react'
import { Query, graphql } from 'react-apollo'
import { getTransactionQuery, removeTransaction, updateTransaction } from '../queries/queries'
import AddTransaction, { GetTransactionType } from './AddTransaction'
import Modal from '@material-ui/core/Modal'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import GetNumber from './GetNumber'
import { withRouter } from 'react-router-dom'
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'

const TransactionsList = props => {
  const [editing, setEditing] = useState(false)
  const [transaction, setTransaction] = useState(null)
  const [numberType, setNumberType] = useState('')

  useEffect(() => {
    const search = props.location.search
    const type = new URLSearchParams(search).get('numberType')
    setNumberType(type)
  }, [numberType])

  const deleteTrans = id => {
    props.removeTransaction({
      variables: {
        transactionId: id
      },
      refetchQueries: [{ query: getTransactionQuery }]
    })
  }

  const triggerModal = transaction => {
    setTransaction(transaction)
    setEditing(true)
  }

  const handleClose = () => {
    setEditing(false)
  }

  const ToggleRomanNumerals = () => {
    if (numberType !== 'RN') {
      props.history.push('?numberType=RN')
      setNumberType('RN')
    } else {
      props.history.push('transactions')
      setNumberType('')
    }
  }

  return (
    <Query query={getTransactionQuery}>
      {({ loading, error, data }) => {
        if (loading) return <p>Relax, it is worth the wait...</p>
        if (error) return <p>Looks like we have a problem...</p>

        return (
          <div className='container'>
            <Button
              olor='secondary'
              onClick={ToggleRomanNumerals}
              style={Styles.romanNum}
              type='button'
              variant='contained'
            >
              {numberType === 'RN' ? 'To Numbers' : 'To Roman Numerals'}
            </Button>
            <Modal
              aria-describedby='simple-modal-description'
              aria-labelledby='simple-modal-title'
              onClose={handleClose}
              open={editing}
              style={Styles.modalStyle}
            >
              <AddTransaction editTransaction={editing} handleClose={handleClose} transaction={transaction} />
            </Modal>
            <div style={Styles.parentCard}>
              {data.transactions.map(transaction => (
                <div className='col-sm' key={transaction.id}>
                  <div className='card' style={Styles.cardStyle}>
                    <p>
                      <span style={Styles.spanStyle}>Description:</span> {transaction.description}
                    </p>
                    <p>
                      <span style={Styles.spanStyle}>Amount:</span> ${GetNumber(numberType, transaction.amount)}
                    </p>
                    <p>
                      <span style={Styles.spanStyle}>Debit/Credit:</span> {GetTransactionType(transaction)}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-evenly', marginRight: '10px' }}>
                      <button onClick={e => deleteTrans(transaction.id)} style={{ cursor: 'pointer' }}>
                        <DeleteIcon style={{ color: '#ff9999' }} />
                      </button>
                      <button onClick={() => triggerModal(transaction)} style={{ cursor: 'pointer' }}>
                        <EditIcon />{' '}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }}
    </Query>
  )
}

TransactionsList.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  removeTransaction: PropTypes.func
}

const Styles = {
  modalStyle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    margin: '100px'
  },
  spanStyle: {
    fontWeight: 'bold',
    color: 'black'
  },
  cardStyle: {
    width: '20rem',
    borderStyle: 'solid',
    padding: '10px',
    margin: '10px',
    color: 'black',
    backgroundColor: 'white',
    borderColor: 'white',
    borderRadius: '10px'
  },
  parentCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  romanNum: {
    display: 'flex',
    justifyContent: 'center',

    position: 'absolute',
    right: '10px',
    top: '12px'
  }
}

export default withRouter(
  graphql(removeTransaction, { name: 'removeTransaction' }, updateTransaction, {
    name: 'updateTransaction'
  })(TransactionsList)
)
