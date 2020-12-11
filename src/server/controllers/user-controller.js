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
  // const userId = req.query.userId
  // pool.query('some JOIN sql query', (error, results) => {
  //   if (error) { throw error }
  //   res.status(200).json(results.rows)
  // })
}
