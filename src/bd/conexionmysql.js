const mysql = require('mysql');
const {DB_HOST,DB_USER,DB_PASSWORD,DB_NAME,DB_PORT} = require('../config/bd/configbd.js');
const  poolmysql =  mysql.createPool ( { 
    // host:DB_HOST,
    // user:DB_USER,
    // password:DB_PASSWORD,
    // database:DB_NAME,
    // port:DB_PORT,

    host:'containers-us-west-86.railway.app',
    user:'root',
    password:'vR4JgrPuOQg94b9FpeVP',
    database:'railway',
    port:'7766',

    multipleStatements: true
  } ) ;
  console.log("BADE DE DATOS  MYSQL ONLINE");

  

module.exports = poolmysql;