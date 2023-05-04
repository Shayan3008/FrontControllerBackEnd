const express = require('express')
const router = express.Router()
const categoryController = require('../controller/categoryController')
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router.get('/', categoryController.getCategory)

module.exports = router