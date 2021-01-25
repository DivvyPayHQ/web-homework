'use strict'
const exGraphql = require('express-graphql')
const graphqlSchema = require('./schema/schema.js')
const path = require('path')
const {seedTransactions} = require('./seed-transactions')
const bodyParser = require('body-parser');

module.exports = function (app, opts) {
  // Setup routes, middleware, and handlers
  // app.get('/', (req, res) => {
  //   res.locals.name = 'Divvy React Challenge'
  //   res.render('index')
  // })
  var jsonParser = bodyParser.json();

  app.post('/seed', jsonParser, async (req, res) => {
    const result = await seedTransactions(req.body.count || 5)
    res.json(result)
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
