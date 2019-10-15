'use strict'
const cors = require('cors')
const ejs = require('ejs')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const httpErrors = require('http-errors')
const path = require('path')
const pino = require('pino')
const pinoHttp = require('pino-http')

module.exports = function main (options, cb) {
  // Set default options
  const ready = cb || function () { }
  const opts = Object.assign(
    {
      // Default options
    },
    options
  )

  // const logger = pino({ prettyPrint: true })
  const logger = pino()

  // Server state
  let server
  let serverStarted = false
  let serverClosing = false

  const MONGO_URI = 'mongodb://localhost:27017/graphql'

  mongoose.Promise = global.Promise
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true
  })

  // Setup error handling
  function unhandledError (err) {
    // Log the errors
    logger.error(err)

    // Only clean up once
    if (serverClosing) {
      return
    }
    serverClosing = true

    // If server has started, close it down
    if (serverStarted) {
      mongoose.disconnect()
      server.close(function () {
        process.exit(1)
      })
    }
  }
  process.on('uncaughtException', unhandledError)
  process.on('unhandledRejection', unhandledError)
  process.on('SIGTERM', unhandledError)
  process.on('SIGINT', unhandledError)

  // Create the express app
  const app = express()

  app.use(express.static(path.join(__dirname, 'public')))

  // Template engine
  app.engine('html', ejs.renderFile)
  app.set('views', path.join(__dirname, 'public'))
  app.set('view engine', 'html')

  // Common middleware
  // app.use(/* ... */)
  app.use(pinoHttp({ logger }))

  // CORS
  const corsOptions = {
    'credentials': true,
    'origin': 'http://localhost:3000',
    'methods': 'GET,POST',
    'preflightContinue': false,
    'optionsSuccessStatus': 200
  }

  app.use(cors(corsOptions))
  app.options('*', cors(corsOptions))

  // Register routes
  // @NOTE: require here because this ensures that even syntax errors
  // or other startup related errors are caught logged and debuggable.
  // Alternatively, you could setup external log handling for startup
  // errors and handle them outside the node process.  I find this is
  // better because it works out of the box even in local development.
  require('./routes')(app, opts)

  app.use(bodyParser)

  // Common error handlers
  app.use(function fourOhFourHandler (req, res, next) {
    next(httpErrors(404, `Route not found: ${req.url}`))
  })
  app.use(function fiveHundredHandler (err, req, res, next) { // eslint-disable-line no-unused-vars
    if (err.status >= 500) {
      logger.error(err)
    }
    res.locals.name = 'divvy-react-challenge'
    res.locals.error = err
    res.status(err.status || 500).render('error')
  })

  // Start server
  server = app.listen(opts.port, opts.host, function (err) {
    if (err) {
      return ready(err, app, server)
    }

    // If some other error means we should close
    if (serverClosing) {
      return ready(new Error('Server was closed before it could start'))
    }

    serverStarted = true
    const addr = server.address()
    logger.info(`Started at ${opts.host || addr.host || 'localhost'}:${addr.port}`)
    ready(err, app, server)
  })
}
