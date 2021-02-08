'use strict'
const exGraphql = require('express-graphql')
const graphqlSchema = require('./schema/schema.js')
const path = require('path')

module.exports = function (app, opts) {
  // Setup routes, middleware, and handlers
  app.get('/', (req, res) => {
    res.locals.name = 'Divvy React Challenge'
    res.render('index')
  })

  // GraphQL routes
  app.use(
    '/graphql',
    exGraphql({
      schema: graphqlSchema,
      graphiql: true,
      pretty: true
    })
  )

  app.use(/(?!\/graphql)/, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
  })
}
