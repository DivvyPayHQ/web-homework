const { model, Schema, SchemaTypes } = require('mongoose')

const TransactionSchema = new Schema({
  id: { type: SchemaTypes.ObjectId },
  user_id: { type: String, default: null },
  amount: { type: Number, default: null },
  credit: { type: Boolean, default: null },
  debit: { type: Boolean, default: null },
  description: { type: String, default: null },
  merchant_id: { type: String, default: null }
})

const TransactionModel = model('transaction', TransactionSchema)

module.exports = {
  TransactionModel,
  TransactionSchema,
  default: TransactionSchema
}
