const { pool } = require('../config')

exports.getUserWords = (req, res) => {
  pool.query(
    `SELECT words.id, words.name, words.definition, words.function from words INNER JOIN (SELECT * from user_words WHERE user_id='${req.query.id}') AS user_words ON words.id=user_words.words_id`,
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    }
  )
}

exports.getAllWords = (req, res) => {
  pool.query('SELECT * from words', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}

exports.claimWord = (req, res) => {
  const { userId, wordId } = req.body

  pool.query(
    `INSERT INTO user_words (user_id, words_id) VALUES ('${userId}', ${wordId})`,
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(201).json(results.rows)
    }
  )
}

exports.unClaimWord = (req, res) => {
  const { userId, wordId } = req.body

  pool.query(
    `DELETE FROM user_words WHERE user_id='${userId}' AND words_id=${wordId}`,
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    }
  )
}
