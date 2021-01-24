const { TransactionModel } = require('../data-models/Transaction')
const { packageModel } = require('./utils.js')

async function find (criteria) {
  const query = Object.keys(criteria).length
    ? TransactionModel.find(criteria)
    : TransactionModel.find()

  const transactions = await query.exec()

  return packageModel(transactions)
}

async function addOne({ user_id, description, merchant_id, debit, credit, amount }) {
  const transaction = await new TransactionModel({ user_id, description, merchant_id, debit, credit, amount }).save();
  return packageModel(transaction)[0];
}

async function update({ id, ...rest }) {
  let doc = await TransactionModel.findByIdAndUpdate(id, rest);
  return findOne(id)
}

async function findOne (id) {
  const query = TransactionModel.findById(id)
  const transaction = await query.exec()

  return packageModel(transaction)[0] || null
}

async function deleteOne(args) {
  const query = TransactionModel.findByIdAndRemove(args.id)
  const transaction = await query.exec();

  return packageModel(transaction)[0];
}

module.exports = {
  find,
  findOne,
  deleteOne,
  addOne,
  update,
}
