import React, { useState } from 'react'
import { css } from '@emotion/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import InfoIcon from '@material-ui/icons/Info'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteForever from '@material-ui/icons/DeleteForever'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_TRANSACTION, GET_ALL_TRANSACTIONS } from '../graphql/transactions'

// eslint-disable-next-line react/prop-types
export function TransactionTable ({ transactions, roman }) {
  const [i18n] = useState(!window.location.search.includes('false'))
  const creditOrDebit = (credit) => {
    return credit === true ? 'Credit' : 'Debit'
  }

  const gibberish = '~†bø)‚žá¨H~¶vø&ÂšÑ«Ià6ÈÖŽÞäXKz·c6©ÖþÞÀXP:¼1ÍÔUŸ(˜j†¯"üÊàW>†bì)Þå˜K*·_6¸òŽÅ¤S;}ÓaèiŽ®ä|Ka÷hF®²üuçJ˜7*–Ÿ.è N‰ôfÇjÒ¯±ÆôRÇ}’¡­¸}²¡µ¸w2¦•ºï3ÅÏÏE”3/UÜ?Ð'
  function getRandomInt (max) {
    return Math.floor(Math.random() * Math.floor(max))
  }

  const getGibberish = (i18n, word) => {
    const wordLength = word.length
    const gibberishLength = gibberish.length
    const range = getRandomInt(gibberishLength)

    if (range + wordLength > gibberishLength && range - wordLength > 0) {
      return i18n === true ? gibberish.substr(range - word.length, range) : word
    } else if (range - wordLength < 0 && range + wordLength < gibberishLength) {
      return i18n === true ? gibberish.substr(range, range + word.length) : word
    } else if (range - wordLength > 0 || range + wordLength < gibberishLength) {
      return i18n === true ? gibberish.substr(range, range + wordLength) : word
    }
    return word
  }

  function convertToRoman (num, isRoman) {
    if (!isRoman) { return num }
    let dict = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, I: 1 }
    let roman = ''
    for (let i in dict) {
      while (num >= dict[i]) {
        roman += i
        num -= dict[i]
      }
    }
    return roman
  }

  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, { refetchQueries: [{ query: GET_ALL_TRANSACTIONS }] })

  return (
    <TableContainer component={Paper} css={tableContainerStyle}>
      <Table aria-label='simple table' css={tableStyle}>
        <TableHead>
          <TableRow>
            <TableCell align='left' css={tableHeaderCellStyle}>{getGibberish(i18n, 'Amount')}</TableCell>
            <TableCell align='left' css={tableHeaderCellStyle}>{getGibberish(i18n, 'Credit or Debit')}</TableCell>
            <TableCell align='left' css={tableHeaderCellStyle}>{getGibberish(i18n, 'Merchant')}</TableCell>
            <TableCell align='left' css={tableHeaderCellStyle}>{getGibberish(i18n, 'User')}</TableCell>
            <TableCell align='center' css={[tableHeaderCellStyle, descriptionCellStyle]}>{getGibberish(i18n, 'Description')}</TableCell>
            <TableCell align='center' css={noBorderCell}> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell align='left' css={noBorderCell}>{convertToRoman(String(transaction.amount), roman)}</TableCell>
              <TableCell align='left' css={noBorderCell}>{creditOrDebit(transaction.credit)}</TableCell>
              <TableCell align='left' css={noBorderCell}>{transaction.merchant.name}</TableCell>
              <TableCell align='left' css={noBorderCell}>{transaction.user.firstName} {transaction.user.lastName}</TableCell>
              <TableCell align='center' css={[noBorderCell, descriptionCellStyle]}><Tooltip title={transaction.description}><InfoIcon /></Tooltip></TableCell>
              <TableCell align='center' css={[noBorderCell, descriptionCellStyle]}><DeleteForever css={deleteIconStyle} onClick={() => { deleteTransaction({ variables: { id: transaction.id } }) }} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const tableContainerStyle = css`
    box-shadow: none;
    display: inline-block;
    float: right;
    margin: 0px 20px;
    width: 70%;
`
const tableStyle = css`
    min-width: 650px;
`
const noBorderCell = css`
    border-bottom: none;
`
const descriptionCellStyle = css`
    width: 10%;
`

const tableHeaderCellStyle = css`
    font-weight: 600;
`
const deleteIconStyle = css`
    color: indianred;
`
