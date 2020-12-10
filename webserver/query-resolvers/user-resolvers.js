const { UserModel } = require('../data-models/User')
const { packageModel } = require('./utils.js')

async function findUsers (criteria) {
  const query = Object.keys(criteria).length
    ? UserModel.find(criteria)
    : UserModel.find()

  const users = await query.exec()

  return packageModel(users)
}

async function findOneUser (id) {
  const query = UserModel.findById(id)
  const user = await query.exec()

  return packageModel(user)[0] || null
}

module.exports = {
  findUsers,
  findOneUser
}
