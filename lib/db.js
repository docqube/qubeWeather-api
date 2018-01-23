const mysql = require('mysql'),
    config = require('../config/config.json');

let dbconn = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.dbname
});
dbconn.connect((err) => {
    if(err){
        console.error("[DB] " + err.stack);
        process.exit(1);
    }
});
module.exports = dbconn;
