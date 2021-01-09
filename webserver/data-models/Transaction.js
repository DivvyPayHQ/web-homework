const { model, Schema, SchemaTypes } = require('mongoose')

const TransactionSchema = new Schema({
  id: { type: SchemaTypes.ObjectId },
  user_id: { type: String, default: null },
  amount: { type: Number, default: null },
  credit: { type: Boolean, default: null },
  debit: { type: Boolean, default: null },
  description: { type: String, default: null },
  category: { type: String, enum : ['GROCERIES','HOUSEHOLD', 'UTILITIES', 'FOOD', 'OTHERS'], default: 'OTHERS'},
  transaction_date: { type: Date }
})

const TransactionModel = model('transaction', TransactionSchema)

module.exports = {
  TransactionModel,
  TransactionSchema,
  default: TransactionSchema
}
