const oracle = require('../DATABASE/oraclequery')
const connection = require('../DATABASE/oracleConnection')
const order = require('../backend_models/order')
const item = require('../backend_models/item')
const json = require('jsonfile')
const file = require('fs')
var months = [undefined, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const orderPlace = async (req, res) => {
    // let orderId2
    // let dateObj = new Date()
    // let date = String(dateObj.getDate()).padStart(2, '0') + `-${months[dateObj.getMonth() + 1]}-` + dateObj.getFullYear()
    // let temp = date.split('-')
    // let date2 = String((parseInt(temp[0]) + 10) % 31).padStart(2, '0') + `-${months[dateObj.getMonth() + 1]}-` + dateObj.getFullYear()
    // let orderId
    // let data = req.body
    // let price = 0

    // for (var i = 0; i < req.body.length; i++)
    //     price = price + (req.body[i].price * req.body[i].count)
    // let sucess = false
    // try {

    //     const query = await connection()
    //     const success2 = await query.execute('INSERT INTO ORDERS(userId,orderDate,price) VALUES(:id,:productId,:status)', [req.params['user'], date, price])
    //     const tempRows = await oracle('SELECT * FROM ORDERS')
    //     if (tempRows.rows.length == 0)
    //         orderId = 1
    //     else
    //         orderId = tempRows.rows[tempRows.rows.length - 1][1]
    //     console.log('order done')
    //     await query.execute('INSERT INTO SHIP(orderId,dateToShip) values (:id,:shipDate)', {
    //         id: orderId,
    //         shipDate: date2
    //     })
    //     const tempRows2 = await oracle('SELECT * FROM SHIP')
    //     if (tempRows2.rows.length == 0)
    //         orderId2 = 1
    //     else
    //         orderId2 = tempRows2.rows[tempRows2.rows.length - 1][0]
    //     for (var i = 0; i < req.body.length; i++) {
    //         const success2 = await query.execute('INSERT INTO ORDERITEM VALUES(:id,:productId,:catId,:count)', [orderId, req.body[i].id, req.body[i].catId, req.body[i].count])
    //         console.log('Add ' + success2)
    //     }
    //     sucess = true

    //     res.status(200).json({ "oId": orderId, 'shipId': orderId2 })
    // } catch (error) {
    //     console.log(error)
    //     res.status(400).json({ "response": sucess })
    // }
    json.readFile('./static/order.json', (err, data) => {
        let data1 = []
        var jsonObject = {}
        console.log(req.body)
        if (data)
            data1 = JSON.parse(data)
        jsonObject = {
            order: req.body,
            userId: req.params['user'],
            id: data1.length === 0 ? 1 : data1[data1.length - 1].id + 1
        }


        data1.push(jsonObject)
        json.writeFile('./static/order.json', JSON.stringify(data1), (err) => {
            if (!err) res.send('done')
        })
    })
}

const getAllOrders = async (req, res) => {
    // try {
    //     let temp = []
    //     const query = await connection()
    //     const success = await query.execute('SELECT * FROM ORDERS where USERID = :id', { id: req.params['user'] })
    //     for (var i = 0; i < success.rows.length; i++)
    //         temp.push(new order(success.rows[i][0], success.rows[i][1], success.rows[i][2], success.rows[i][3]))
    //     const json = JSON.stringify(temp)
    //     res.status(200).send(json)
    // } catch (error) {
    //     res.status(400).send(error)
    // }
    json.readFile('./static/order.json', (err, data) => {
        let data1 = []
        let result = []
        if (data)
            data1 = JSON.parse(data)
        console.log(data1)
        for (var i = 0; i < data1.length; i++) {
            if (data1[i].userId === req.params['user']) {
                result.push(data1[i])
            }
        }
        res.send({ order: result })
    })

}

const getSingleOrder = async (req, res) => {
    try {
        let temp = []
        const query = await connection()
        const success = await query.execute('SELECT P.*,O.count FROM ORDERITEM O,PRODUCT P where O.ORDERID = :id AND O.PID = P.ID AND O.catId = P.catID', { id: req.params['oId'] })
        for (var i in success.rows)
            temp.push(new item(success.rows[i][0], success.rows[i][1], success.rows[i][2], success.rows[i][3], success.rows[i][4], success.rows[i][6], success.rows[i][5]))
        const json = JSON.stringify(temp)
        res.status(200).send(json)
    } catch (error) {
        res.status(400).send(error)
    }
}

const getOrderShip = async (req, res) => {
    try {
        const query = await connection()
        const success = await query.execute('select * from ship where orderId=:id', { id: req.params["oId"] })
        let row = success.rows[0][2]
        let date2 = new Date()
        if (date2 < row)
            console.log("Hlelo")

        console.log(String(row))
        res.status(200).json({ 'date': row })
    } catch (error) {
        console.log(error)
        res.status(400).end()
    }


}
module.exports = { orderPlace, getAllOrders, getSingleOrder, getOrderShip }