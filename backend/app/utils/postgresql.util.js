const pgp = require('pg-promise')();
const config = require('../config')

const db = pgp(config.db.uri);
if (db) {
    console.log("Connect database successfully!!!");
}
else 
    console.log("Connect failure!!!")

module.exports = db;