const { pool } = require('../config')

exports.getUser = (req, res) => {
  /**
   * create user if user not in db
   */
  pool.query(
    `SELECT email FROM users WHERE email='${req.query.id}'`,
    (error, results) => {
      if (error) {
        throw error
      }

      res.status(200).json(results.rows[0])
    }
  )
}
