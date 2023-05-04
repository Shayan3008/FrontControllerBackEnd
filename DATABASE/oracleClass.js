class oracleConnectionClass {
    constructor() { }
    async connect() {
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
    async query(connectionObject) {
        try {
            const sucess = await connectionObject.execute(query2)
            if (sucess.rows != null)
                return sucess
            else
                console.log("query done")
        } catch (error) {
            console.log(error)
        }
    }
}
