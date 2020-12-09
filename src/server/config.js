const { Pool } = require('pg')

/**
 * TODO: move these vars to .env
 */
const pool = new Pool({
  user: 'api_user',
  host: 'localhost',
  database: 'words_api',
  password: 'password',
  port: 5432
})

module.exports = { pool }

// https://www.taniarascia.com/node-express-postgresql-heroku/
