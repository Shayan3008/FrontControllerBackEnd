const express = require('express');
const router = express.Router()
const app = express()
const loginController = require('../controller/login')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router.post('/',loginController.login)
router.post('/signup',loginController.signUp)

module.exports = router