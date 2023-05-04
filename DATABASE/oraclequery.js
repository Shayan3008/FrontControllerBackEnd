const connection = require('../DATABASE/oracleConnection')

const runQuery =async (query2)=>{
    try {
        const  query = await connection()
        const sucess = await query.execute(query2)
        if(sucess.rows != null)
            return sucess
        else
            console.log("query done")
        
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = runQuery