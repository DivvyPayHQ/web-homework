import { formatName } from './user-utils'
import { translate } from './translate'

export const getTransactionTableData = transactions => {
  return transactions.map(transaction => {
    return {
      ...transaction,
      name: formatName(transaction.user),
      merchantName: transaction.merchant.name,
      categoryName: transaction.category.name,
      creditDebit: transaction.debit ? translate('debit') : translate('credit')
    }
  })
}

export const formatCurrency = amount => {
  if (Number.isNaN(amount) || amount == null) {
    amount = 0
  }

  const localStorage = window.localStorage
  const locale = localStorage.getItem('divvyLocale')
  const currencyCode = locale === 'en' ? 'USD' : 'EUR'

  const formatter = new Intl.NumberFormat(locale, { style: 'currency', currency: currencyCode })
  const formattedAmount = formatter.format(Math.abs(amount))

  return amount < 0 ? `(${formattedAmount})` : formattedAmount
}

export const getTotal = rows => {
  return rows.reduce((total, row) => {
    const newValue = total += row.amount
    return newValue
  }, 0)
}

export const columnsConfig = [
  {
    field: 'date',
    headerLookup: 'date',
    type: 'date',
    width: 12
  },
  {
    field: 'name',
    headerLookup: 'name',
    width: 16
  },
  {
    field: 'merchantName',
    headerLookup: 'merchant',
    width: 16
  },
  {
    field: 'description',
    headerLookup: 'description',
    width: 18
  },
  {
    field: 'categoryName',
    headerLookup: 'category',
    width: 14
  },
  {
    field: 'creditDebit',
    headerLookup: 'credit_or_debit',
    width: 12
  },
  {
    field: 'amount',
    headerLookup: 'amount',
    width: 12,
    type: 'currency'
  }
]
