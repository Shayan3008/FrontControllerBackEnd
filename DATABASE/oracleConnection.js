const oracledb = require('oracledb');

oracledb.autoCommit = true

const runQuery = async () => {
    try {
      let connection = await oracledb.getConnection({
        user: 'db',
        password: '123',
        connectString: 'localhost'
      })
      return connection;
      
    } catch (error) {
      console.log(error)
    }
  }

module.exports = runQuery