const { TransactionModel } = require('../data-models/Transaction')
const { packageModel } = require('./utils.js')

async function findTransactions (criteria) {
  const query = Object.keys(criteria).length
    ? TransactionModel.find(criteria)
    : TransactionModel.find()

  const transactions = await query.exec()

  return packageModel(transactions)
}

async function findOneTransaction (id) {
  const query = TransactionModel.findById(id)
  const transaction = await query.exec()

  return packageModel(transaction)[0] || null
}

async function editTransaction (criteria) {
  const query = TransactionModel.findByIdAndUpdate(criteria.id, criteria, { new: true })
  const transaction = await query.exec()

  return packageModel(transaction)
}

module.exports = {
  findTransactions,
  findOneTransaction,
  editTransaction
}
