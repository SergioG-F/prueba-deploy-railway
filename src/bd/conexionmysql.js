const mysql = require('mysql2/promise');
const {DB_HOST,DB_USER,DB_PASSWORD,DB_NAME,DB_PORT} = require('../config/bd/configbd.js');
const  poolmysql =  mysql.createPool ( { 
    host:DB_HOST,
    user:DB_USER,
    password:DB_PASSWORD,
    database:DB_NAME,
    port:DB_PORT,
    multipleStatements: true
  } ) ;
  console.log("BADE DE DATOS  MYSQL ONLINE");

  

module.exports = poolmysql;