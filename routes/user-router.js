const express = require('express')

const UserCtrl = require('../controllers/user-ctrl')
const authenticate = require('../middleware/authentication')

const router = express.Router()

router.post('/login', UserCtrl.loginUser)
router.post('/signup', UserCtrl.createUser)
router.put('/store-data', authenticate, UserCtrl.updateUser)
router.get('/profile', authenticate, UserCtrl.getUserById)

module.exports = router
