const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')

const wordRouter = require('./routes/word-route')
const userRouter = require('./routes/user-route')

const app = express()

app.use(cors())
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/words', wordRouter)
app.use('/users', userRouter)

/**
 * TODO:
 * 1. split client and server code
 * 2. host server and db
 */
app.listen(process.env.EXPRESS_SERVER_PORT, () => {
  console.log(`Server listening on port: ${process.env.EXPRESS_SERVER_PORT}`)
})
