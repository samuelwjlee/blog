const express = require('express')
const router = express.Router()
const wordController = require('../controllers/word-controller')

router.get('/user', wordController.getUserWords)
router.get('/all', wordController.getAllWords)

module.exports = router
