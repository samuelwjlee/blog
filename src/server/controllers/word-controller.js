const { pool } = require('../config')

exports.wordsGet = (req, res) => {
  pool.query(
    `SELECT words.id, words.name, words.definition, words.function from words INNER JOIN (SELECT * from user_words WHERE user_id='${req.query.userId}') AS user_words ON words.id=user_words.words_id`,
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    }
  )
}
