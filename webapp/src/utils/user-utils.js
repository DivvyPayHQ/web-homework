export const formatName = user => {
  return `${user.lastName}, ${user.firstName}`
}

export const getAge = dob => {
  const birthDate = new Date(dob)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

export const getUserTableData = users => {
  return users.map(user => {
    return {
      ...user,
      name: formatName(user),
      age: getAge(user.dob),
      totalTransactions: user.transactions?.length || 0
    }
  })
}

export const columnsConfig = [
  {
    field: 'name',
    headerLookup: 'name',
    width: 34
  },
  {
    field: 'age',
    headerLookup: 'age',
    width: 33,
    type: 'number'
  },
  {
    field: 'totalTransactions',
    headerLookup: 'total_transactions',
    width: 33,
    type: 'number'
  }
]
