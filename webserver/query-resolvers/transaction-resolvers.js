const { TransactionModel } = require('../data-models/Transaction')
const { packageModel } = require('./utils.js')

async function find(criteria) {
  const query = Object.keys(criteria).length
    ? TransactionModel.find(criteria)
    : TransactionModel.find()

  const transactions = await query.exec()

  return packageModel(transactions)
}

async function findOne(id) {
  const query = TransactionModel.findById(id)
  const transaction = await query.exec()

  return packageModel(transaction)[0] || null
}

async function deleteOne (id) {
  const query = TransactionModel.findOneAndDelete({ _id: id })
  const deleted = await query.exec()
  return packageModel(deleted)[0] || null
}

async function update (transaction) {
  const query = TransactionModel.findByIdAndUpdate(transaction.id, { $set: transaction })
  return transaction
}


module.exports = {
  find,
  findOne,
  deleteOne,
  update 
}
