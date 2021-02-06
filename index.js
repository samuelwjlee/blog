const express = require('express')
const path = require('path')
const postgrator = require('postgrator')
const bodyParser = require('body-parser')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')

require('dotenv').config()

const app = express()
const wordRouter = require('./server/routes/word-route')
const userRouter = require('./server/routes/user-route')

const isProduction = process.env.NODE_ENV === 'production'
const origin = {
  origin: isProduction ? 'https://wordful.herokuapp.com/' : '*'
}
app.use(cors(origin))

app.use('/words', wordRouter)
app.use('/users', userRouter)

if (isProduction) {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'client/build/index.html'))
  })
}

app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

/*
 * Migrate database before listening for requests
 */
postgrator.setConfig({
  migrationDirectory: './server/migrations',
  driver: 'pg',
  username: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})
postgrator.migrate('max', (err, migrations) => {
  if (err) {
    console.error('Database migration failed!')
    console.error(err)
    process.exit(1)
  } else {
    console.log(migrations)
  }

  postgrator.endConnection(() => {
    console.log('Database migrated successfully.')

    /*
     * Database has been migrated, all is good to go!
     */
    const port = process.env.PORT || 8080
    app.listen(port, () => {
      console.log(`Server listening at ${port}`)
    })
  })
})
