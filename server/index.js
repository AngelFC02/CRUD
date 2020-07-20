/* eslint-disable import/order */
const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookiesMiddleware = require('universal-cookie-express')
const server = require('http').createServer(app)

// Import and Set Nuxt.js options
const nuxtCfg = require('../nuxt.config.js')
const config = require('./config')
const router = require('./routes')
nuxtCfg.dev = !(process.env.NODE_ENV === 'production')

async function start () {
  mongoose.connect(
    config.db,
    (err, res) => {
      if (err) {
        console.log('Error en conectar la base de datos')
        console.log(err)
        console.log('err')
      } else {
        console.log('Conexion a la base de datos')
      }
    }
  )

  const forceSsl = function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(['https://', req.get('Host'), req.url].join(''))
    }
    return next()
  }

  if (config.isProd === 'production') {
    app.use(forceSsl)
  }

  app.use(cookiesMiddleware())

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  app.use(cors())
  app.use('/api/', router)
  // Init Nuxt.js
  const nuxt = new Nuxt(nuxtCfg)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build only in dev mode
  if (nuxtCfg.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  server.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
