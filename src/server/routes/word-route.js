const express = require('express')
const router = express.Router()
const wordController = require('../controllers/word-controller')

router.get('/user', wordController.getUserWords)
router.get('/all', wordController.getAllWords)
router.get('/', wordController.getQueriedWords)
router.post('/claim', wordController.claimWord)
router.delete('/unclaim', wordController.unClaimWord)

module.exports = router
