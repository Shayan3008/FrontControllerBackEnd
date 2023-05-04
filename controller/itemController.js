const oracle = require('../DATABASE/oraclequery')
const connection = require('../DATABASE/oracleConnection')
const item = require('../backend_models/item')
const file = require('fs')
const getItem = async (req, res) => {
    try {
        // const temp = []
        // const sucess = await oracle("SELECT * FROM PRODUCT")
        // for (var i in sucess.rows)
        //     temp.push(new item(sucess.rows[i][0], sucess.rows[i][1], sucess.rows[i][2], sucess.rows[i][3], sucess.rows[i][4], 1, sucess.rows[i][5]))
        // const json = JSON.stringify(temp)
        // res.send(json)item(1, 'boot', 1, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=80', 200, 1, 'This is boot', true), new item(3, 'boot', 1, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=80', 200, 1, 'This is boot', false)
        const json = file.readFile('./static/item.json', (err, data) => {
            if (data)
                res.send(JSON.parse(data))
        })
    } catch (error) {
        console.log(error)
        res.status(400)
        res.end("SERVER ERROR")
    }
}

const getItemWithCategory = async (req, res) => {
    try {
        const temp = []
        const query = await connection()
        const sucess =
            await query.execute('SELECT P.* FROM PRODUCT P , CATEGORY C WHERE C.CATID = P.CATID AND P.CATID = :id', [req.params['catId']])
        for (var i in sucess.rows)
            temp.push(new item(sucess.rows[i][0], sucess.rows[i][1], sucess.rows[i][2], sucess.rows[i][3], sucess.rows[i][4], 1, sucess.rows[i][5]))
        const json = JSON.stringify(temp)
        res.send(json)
    } catch (error) {
        console.log(error)
        res.end('error')
    }

}

const getItemPriceSorted = async (req, res) => {
    try {
        const temp = []
        const sucess = await oracle('SELECT * FROM PRODUCT ORDER BY price ASC')
        for (var i in sucess.rows)
            temp.push(new item(sucess.rows[i][0], sucess.rows[i][1], sucess.rows[i][2], sucess.rows[i][3], sucess.rows[i][4], 1, sucess.rows[i][5]))
        const json = JSON.stringify(temp)
        res.send(json)

    } catch (error) {
        console.log(error)
        res.status(400)
        res.send("An error Occured")
    }
}

const getItemPriceSortedWithCategory = async (req, res) => {
    try {
        const temp = []
        const query = await connection()
        const sucess =
            await query.execute('SELECT P.* FROM PRODUCT P , CATEGORY C WHERE C.CATID = P.CATID AND P.CATID = :id ORDER BY P.price asc', [req.params['catId']])
        for (var i in sucess.rows)
            temp.push(new item(sucess.rows[i][0], sucess.rows[i][1], sucess.rows[i][2], sucess.rows[i][3], sucess.rows[i][4], 1, sucess.rows[i][5]))
        const json = JSON.stringify(temp)
        res.send(json)
    } catch (error) {
        console.log(error)
        res.end('error')
    }
}

const addToFavourite = async (req, res) => {
    let sucess = false
    try {
        const { userId, catId, productId } = req.body
        console.log(catId, productId)
        const query = await connection()
        const success2 = await query.execute('INSERT INTO FAVOURITE VALUES(:id,:catId,:productId)', [userId, catId, productId])
        console.log('Add ' + success2)
        sucess = true
        res.status(200).json({ "response": sucess })
    } catch (error) {
        console.log(error)
        res.status(400).json({ "response": sucess })
    }
}

const deleteFromFavourite = async (req, res) => {
    let sucess = false
    try {
        const { userId, catId, productId } = req.body
        console.log(catId, productId)
        const query = await connection()
        const sucess1 = await query.execute('DELETE FROM FAVOURITE WHERE USERID = :id1 AND CATID = :id2 AND PID = :id3', [userId, catId, productId])
        console.log(sucess1)
        sucess = true
        res.status(200).json({ "response": sucess })
    } catch (error) {
        console.log(error)
        res.status(400).json({ "response": sucess })
    }
}

const getUserFavourite = async (req, res) => {
    try {
        const temp = []
        const query = await connection()
        const sucess =
            await query.execute('SELECT P.* FROM PRODUCT P, FAVOURITE F WHERE P.ID = F.PID AND P.CATID = F.CATID AND F.USERID = :id', [req.params['userId']])
        for (var i in sucess.rows)
            temp.push(new item(sucess.rows[i][0], sucess.rows[i][1], sucess.rows[i][2], sucess.rows[i][3], sucess.rows[i][4], 1, sucess.rows[i][5]))
        const json = JSON.stringify(temp)
        res.send(json)
    } catch (error) {
        console.log(error)
        res.status(400)
        res.end("SERVER ERROR")
    }
}

const singleitem = async (req, res) => {
    try {
        let temp = []
        const query = await connection()
        const sucess =
            await query.execute('select * from product  where id=:id and catid=:catId', {
                id: req.params['id'],
                catId: req.params['cid']
            })
        for (var i in sucess.rows)
            temp.push(new item(sucess.rows[i][0], sucess.rows[i][1], sucess.rows[i][2], sucess.rows[i][3], sucess.rows[i][4], 1, sucess.rows[i][5]))
        const json = JSON.stringify(temp)
        res.send(json)
    } catch (error) {
        console.log(error)
        res.end('error')
    }

}

module.exports = { getItem, getItemWithCategory, getItemPriceSorted, getItemPriceSortedWithCategory, addToFavourite, deleteFromFavourite, getUserFavourite, singleitem }