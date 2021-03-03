const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  dob: { type: String, default: null }
})

const model = mongoose.model('user', UserSchema)

module.exports = {
  UserModel: model,
  UserSchema,
  default: UserSchema
}
