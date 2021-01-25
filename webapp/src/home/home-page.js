import React from 'react'
import PaymentIcon from '@material-ui/icons/Payment'

export function Home () {
  return (
    <div
      style={{
        backgroundImage: `url(https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)`,
        padding: '80px',
        height: '48rem',
        width: '91%',
        marginTop: '-15px',
        marginLeft: '-5px',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div
        style={{
          backgroundColor: 'black',
          padding: '30px',
          margin: '150px',
          display: 'flex',
          justifyContent: 'space-around'
        }}
      >
        <div>
          <h3 style={{ color: 'white', fontSize: '40px' }}>Welcome to Transactions</h3>
          <p style={{ color: 'white', marginTop: '5px' }}>
            Navigate to the transactions tab to see all transactions and add new ones
          </p>
        </div>
        <div>
          <PaymentIcon style={{ color: 'white', fontSize: '80px', marginTop: '50px', marginLeft: '10px' }} />
        </div>
      </div>
    </div>
  )
}
