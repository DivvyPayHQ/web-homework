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

async function deleteOne (id) {
  const query = TransactionModel.deleteOne({ _id: id })
  const result = await query.exec()
  return result
}

// eslint-disable-next-line camelcase
async function updateOne (id, user_id, description, merchant_id, debit, credit, amount) {
  const query = TransactionModel.updateOne({ _id: id },
    {
      user_id: user_id,
      description: description,
      merchant_id: merchant_id,
      debit: debit,
      credit: credit,
      amount: amount
    })

  await query.exec()
  return { id: id }
}

module.exports = {
  find,
  findOne,
  deleteOne,
  updateOne
}
