const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CategorySchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  name: { type: String, default: null },
})

const model = mongoose.model('category', CategorySchema)

module.exports = {
  CategoryModel: model,
  CategorySchema,
  default: CategorySchema
}
