const express = require('express')
const path = require('path')

const bodyParser = require('body-parser')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')

const wordRouter = require('./routes/word-route')
const userRouter = require('./routes/user-route')

require('dotenv').config()
const app = express()

const isProduction = process.env.NODE_ENV === 'production'
const origin = {
  origin: isProduction ? 'https://wordful.herokuapp.com/' : '*'
}
app.use(cors(origin))
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')))
//production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))
  //
  app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname, 'client/build/index.html'))
  })
}

app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/words', wordRouter)
app.use('/users', userRouter)

app.listen(process.env.EXPRESS_SERVER_PORT, () => {
  console.log(`Server listening on port: ${process.env.EXPRESS_SERVER_PORT}`)
})
