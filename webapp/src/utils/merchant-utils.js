export const getMerchantTableData = merchants => {
  return merchants.map(merchant => {
    return {
      ...merchant,
      totalTransactions: merchant.transactions?.length || 0
    }
  })
}

export const columnsConfig = [
  {
    field: 'name',
    headerLookup: 'name',
    width: 50
  },
  {
    field: 'totalTransactions',
    headerLookup: 'total_transactions',
    width: 50,
    type: 'number'
  }
]
