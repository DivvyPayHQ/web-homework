const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MerchantSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  merchantName: { type: String, default: null }
})

const model = mongoose.model('merchant', MerchantSchema)

module.exports = {
  MerchantModel: model,
  MerchantSchema,
  default: MerchantSchema
}
