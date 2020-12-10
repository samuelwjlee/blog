const { pool } = require('../config')

exports.userGetAll = (req, res) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

exports.userGetWords = (req, res) => {
  // select from user word association table
  // pool.query('SELECT * FROM words', (error, results) => {
  //   if (error) { throw error }
  //   const userId = req.query.userId
  //   res.status(200).json(results.rows)
  // })
}
