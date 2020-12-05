const express = require('express')

const wordController = require('../controllers/word-controller')

const router = express.Router()

router.get('/', wordController.wordsGet)

module.exports = router
