const oracle = require('../DATABASE/oraclequery')
const connection = require('../DATABASE/oracleConnection')
const category = require('../backend_models/category')
const users = require('../backend_models/user')
const json = require('jsonfile')
const file = require('fs')
const login = async (req, res) => {
   // try {
   //    const { user, pass } = req.body
   //    const query = await connection()
   //    const success2 = await query.execute('SELECT * FROM USERS WHERE EMAIL = :email AND PASSWORD = :pass', {
   //       email: user,
   //       pass: pass
   //    })
   //    let temp = []
   //    if (success2.rows.length == 0)
   //       res.status(404).send({ 'msg': "NO USER AVAILABLE" })
   //    else {
   //       for (var i in success2.rows)
   //          temp.push(new users(success2.rows[i][0], success2.rows[i][1], success2.rows[i][2], success2.rows[i][3], success2.rows[i][4], success2[i][5]))

   //       res.status(200).send(JSON.stringify(temp))
   //    }

   // } catch (error) {
   //    console.log(error)
   //    res.status(400).end()
   // }
   const { user, pass } = req.body
   let auth = false
   let data1 = []
   let id;
   json.readFile('./static/user.json', (err, data) => {

      if (data) {
         data1 = JSON.parse(data)
         console.log(data1.length)
         for (var i = 0; i < data1.length; i++) {
            console.log(data1[i])
            if (data1[i].name === user && data1[i].password === pass) {
               console.log('HELLO WORLD')
               auth = true
               id = data1[i].id
               break
            }
         }
         console.log(auth)
         if (auth) res.send({
            id: id
         })
      }
   })

}

const signUp = async (req, res) => {
   try {
      // let userId
      // const { Fname, Lname, Password, Email, Phone, Address } = req.body
      // console.log(req.body)
      // const query = await connection()
      // const success2 = await query.execute('INSERT INTO USERS(FNAME,LNAME,phone,EMAIL,PASSWORD,ADDRESS) VALUES(:Fname,:Lname,:Phone,:Email,:Password,:address)', {
      //    Fname: Fname,
      //    Lname: Lname,
      //    Phone: Phone,
      //    Email: Email,
      //    Password: Password,
      //    address: Address
      // })
      // const tempRows = await oracle('SELECT * FROM USERS')
      // if (tempRows.rows.length == 0)
      //    userId = 1
      // else
      //    userId = tempRows.rows[tempRows.rows.length - 1][0]

      // let user = new users(userId, Lname, Fname, Phone, Email, Password, Address)
      // let temp = []
      // temp.push(user)
      // let json = JSON.stringify(temp)
      // res.send(json)
      json.readFile('./static/user.json', (err, data) => {
         let data1 = []
         var id
         if (data)
            data1 = JSON.parse(data)
         if (data1.length === 0)
            id = 1
         else
            id = data1[data1.length - 1].id + 1
         req.body.id = id
         data1.push(req.body)
         json.writeFile('./static/user.json', JSON.stringify(data1), (err) => {
            if (!err) res.send({
               id: id
            })
         })
      })

   } catch (error) {
      res.status(400).send({ 'msg': 'SERVER DOWN TRY AGAIN LATER' })
   }

}

module.exports = { login, signUp }