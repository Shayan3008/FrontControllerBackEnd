const express = require('express');
const router = express.Router()
const app = express()
const orderController = require('../controller/order')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router.post('/:user', orderController.orderPlace)
router.get('/:user', orderController.getAllOrders)
router.get('/single/:oId', orderController.getSingleOrder)
router.get('/ship/:oId',orderController.getOrderShip)

module.exports = router