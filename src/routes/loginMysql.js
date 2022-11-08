const express       = require ("express");
const router        = express.Router();
const controller    = require("../controller/loginMysql.controller.js");
const prueba2       =require("../middleawers/AuthToken.js");
//login  
router.post('/loginmysql',controller.login);
//Protegiendo Rutas...!
router.post('/registermysql',prueba2,controller.registercliente);


module.exports = router;
        