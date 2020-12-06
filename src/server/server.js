const express = require('express')

const wordRouter = require('./routes/word-route')

const bodyParser = require('body-parser')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')

const PORT = 8080
const app = express()

app.use(cors())
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/words', wordRouter)

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
})

// https://blog.alexdevero.com/build-react-app-express-api/
