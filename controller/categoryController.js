// const oracle = require('../DATABASE/oraclequery')
// const connection = require('../DATABASE/oracleConnection')
// const category = require('../backend_models/category')
const file = require('fs')
const getCategory = async (req, res) => {
  // const temp = []
  // const respo = await oracle('select * from category')
  // for(var i = 0 ; i < respo.rows.length; i++)
  //   temp.push(new category(respo.rows[i][0],respo.rows[i][1]))

  // res.send(JSON.stringify(temp))
  const json = file.readFile('./static/category.json', (err, data) => {
    res.send(JSON.parse(data))
  })

}

module.exports = { getCategory }