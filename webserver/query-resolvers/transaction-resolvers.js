const { TransactionModel } = require('../data-models/Transaction')
const { packageModel } = require('./utils.js')

async function find (criteria) {
  const query = Object.keys(criteria).length
    ? TransactionModel.find(criteria)
    : TransactionModel.find()

  const transactions = await query.exec()

  return packageModel(transactions)
}

async function findOne (id) {
  const query = TransactionModel.findById(id)
  const transaction = await query.exec()

  return packageModel(transaction)[0] || null
}

async function addOne ({ user_id, description, merchant_id, debit, credit, amount }) {
  const query = new TransactionModel({ user_id, description, merchant_id, debit, credit, amount })
  const transaction = await query.save()

  return packageModel(transaction)[0] || null
}

module.exports = {
  find,
  findOne,
  addOne
}
