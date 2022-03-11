import React, { useState } from 'react'
import { arrayOf, string, bool, number, shape } from 'prop-types'
import { FormContainer } from '../forms/form-container-component'
import { Button } from '../buttons/plusButton'
import { txTableStyles } from './TxTable-styles'
export function TxTable ({ data }) {
  const [hidden, setHidden] = useState(true)

  function toggleForm () {
    setHidden(!hidden)
  }

  const onEdit = () => {

  }

  const onDelete = () => {

  }

  return (
    <div css={txTableStyles}>
      <table>
        <tbody>
          <tr className='header'>
            <th >ID</th>
            <th >User ID</th>
            <th >Description</th>
            <th >Merchant ID</th>
            <th >Debit</th>
            <th >Credit</th>
            <th >Amount</th>
          </tr>
          {
            data.length ? data.map(tx => {
              const { id, user_id: userId, description, merchant_id: merchantId, debit, credit, amount } = tx
              return (
                <tr key={`transaction-${id}`}>
                  <td>{id}</td>
                  <td>{userId}</td>
                  <td>{description}</td>
                  <td>{merchantId}</td>
                  <td>{debit}</td>
                  <td>{credit}</td>
                  <td>{amount}</td>
                </tr>
              )
            })
              : (
                <tr>
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td />
                  <td>
                    <div className='buttons'>
                      <Button icon={'✏️'} onClickfunction={onEdit} />
                      <Button icon={'🗑️'} onClickfunction={onDelete} />
                    </div>
                  </td>
                </tr>
              )
          }
        </tbody>
      </table>
      <Button icon={'+'} onClickfunction={toggleForm} />
      {hidden ? null : <FormContainer />}
    </div>
  )
}

TxTable.propTypes = {
  data: arrayOf(shape({
    id: string,
    user_id: string,
    description: string,
    merchant_id: string,
    debit: bool,
    credit: bool,
    amount: number
  }))
}
