function packageModel(model) {
  const models = [].concat(model)
  const results = []

  models.forEach(m => {
    if (!m) {
      return true
    }

    const resultObject = m.toObject({ virtuals: true })

    /* Some bad mix of mongoose/express-graphql doesn't map the _id to id (backwards)? */
    if (!resultObject.id) {
      resultObject.id = resultObject._id.toString()
    }

    results.push(resultObject)
  })

  return results
}

module.exports = {
  packageModel
}
