const { pool } = require('../config')

exports.wordsGet = (req, res) => {
  pool.query('SELECT * FROM words', (error, results) => {
    if (error) {
      throw error
    }
    const userId = req.query.userId
    res.status(200).json(results.rows)
  })
}
