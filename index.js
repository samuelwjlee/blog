const express = require('express')
const path = require('path')

const bodyParser = require('body-parser')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')

const wordRouter = require('./server/routes/word-route')
const userRouter = require('./server/routes/user-route')

require('dotenv').config()
const app = express()

const isProduction = process.env.NODE_ENV === 'production'
const origin = {
  origin: isProduction ? 'https://wordful.herokuapp.com/' : '*'
}
app.use(cors(origin))

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

app.use('/words', wordRouter)
app.use('/users', userRouter)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server listening on port: ${process.env.PORT}`)
})
