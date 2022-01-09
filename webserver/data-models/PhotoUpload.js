const mongoose = require('mongoose')
const Schema = mongoose.Schema

const photoUploadSchema = new Schema({
  userId: { type: Schema.Types.ObjectId },
  photo: { type: String, default: null }
})

const model = mongoose.model('user', photoUploadSchema)

module.exports = {
  PhotoUploadModel: model,
  photoUploadSchema,
  default: photoUploadSchema
}
