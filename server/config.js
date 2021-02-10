const { Pool } = require('pg')

require('dotenv').config()

/**
 * TODO: add Knex and migration
 */
const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DATABASE_URL,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
})

module.exports = { pool }
