import React, { useState } from 'react'
import { arrayOf, string, bool, number, shape } from 'prop-types'
import { FormContainer } from '../forms/form-container-component'
import { Button } from '../buttons/plusButton'
import { txTableStyles } from './TxTable-styles'
import { romanNumeralConverter } from '../../utils/romanNumeralConverter'
import { gibberishConverter } from '../../utils/i18nConverter'
export function TxTable ({ data, convertRoman }) {
  const [hidden, setHidden] = useState(true)
  const emptyState = {
    'Id': '',
    'user_id': '',
    'description': '',
    'merchant_id': '',
    'debit': '',
    'credit': '',
    'amount': ''
  }
  const isI18nEnabled = window.location.search.includes('i18n=true')
  const [state, setState] = useState(emptyState)
  const [qData, setQData] = useState(data)

  function toggleForm () {
    setHidden(!hidden)
    setState(emptyState)
  }

  function onEdit (params) {
    setHidden(false)
    const result = qData.find(({ id }) => id === params)
    setState({
      'Id': params,
      'user_id': result.user_id,
      'description': result.description,
      'merchant_id': result.merchant_id,
      'debit': result.debit,
      'credit': result.credit,
      'amount': result.amount
    })
  }

  function onDelete () {

  }

  return (
    <div css={txTableStyles}>
      <table>
        <tbody>
          <tr className='header'>
            <th >{gibberishConverter('ID', isI18nEnabled)}</th>
            <th >{gibberishConverter('User ID', isI18nEnabled)}</th>
            <th >{gibberishConverter('Description', isI18nEnabled)}</th>
            <th >{gibberishConverter('Merchant ID', isI18nEnabled)}</th>
            <th >{gibberishConverter('Debit', isI18nEnabled)}</th>
            <th >{gibberishConverter('Credit', isI18nEnabled)}</th>
            <th >{gibberishConverter('Amount', isI18nEnabled)}</th>
          </tr>
          {
            qData.length ? qData.map(tx => {
              const { id, user_id: userId, description, merchant_id: merchantId, debit, credit, amount } = tx
              return (
                <tr key={`transaction-${id}`}>
                  <td>{gibberishConverter(convertRoman ? `${id.substring(0, 8)}...` : `${romanNumeralConverter(id).substring(0, 8)}...`, isI18nEnabled)}</td>
                  <td>{gibberishConverter(convertRoman ? userId : romanNumeralConverter(userId), isI18nEnabled)}</td>
                  <td>{gibberishConverter(convertRoman ? description : romanNumeralConverter(description), isI18nEnabled)}</td>
                  <td>{gibberishConverter(convertRoman ? merchantId : romanNumeralConverter(merchantId), isI18nEnabled)}</td>
                  <td>{debit ? `✔️` : '❌'}</td>
                  <td>{credit ? `✔️` : '❌'}</td>
                  <td>{gibberishConverter(convertRoman ? amount : romanNumeralConverter(amount), isI18nEnabled)}</td>
                  <td>
                    <div className='buttons'>
                      <Button icon={'✏️'} id={id} onClickfunction={onEdit} />
                      <Button icon={'🗑️'} onClickfunction={onDelete} />
                    </div>
                  </td>
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
      {hidden ? null : <FormContainer setHidden={setHidden} setQData={setQData} setState={setState} {...state} />}
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
  })),
  convertRoman: bool
}
