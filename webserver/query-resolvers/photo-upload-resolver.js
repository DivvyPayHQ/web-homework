const { PhotoUploadModel } = require('../data-models/Transaction')
const { packageModel } = require('./utils.js')

async function find (criteria) {
  const query = Object.keys(criteria).length
    ? PhotoUploadModel.find(criteria)
    : PhotoUploadModel.find()

  const photos = await query.exec()

  return packageModel(transactions)
}

async function findOne (id) {
  const query = PhotoUploadModel.findById(id)
  const photo = await query.exec()

  return packageModel(photo)[0] || null
}

module.exports = {
  find,
  findOne
}
