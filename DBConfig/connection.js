

    const Pool = require('pg').Pool

    const connection = new Pool({
        user: 'postgres',
        host: '49.0.198.122',
        database: 'DBWeblottery',
        password: 'password',
        port: 5432,
        connectionLimit : 10,              
        multipleStatements : true

        //  user: 'postgres',
        // host: 'localhost',
        // database: 'DBWeblottery',
        // password: '12345',
        // port: 5432,
        // connectionLimit : 10,              
        // multipleStatements : true
        
    });


    module.exports = connection

  