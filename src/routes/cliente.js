const express       = require ("express");
const router        = express.Router();
const controller    = require("../controller/cliente.controller.js");

//cliente LISTAR
router.get('/cliente',controller.clienteshow);

//cliente INSERT 
router.post('/cliente/register',controller.clienteRegister);


//cliente UPDATE
//router.put('/cliente/update/:id',controller.clienteupdate);

// cliente BUSCAR POR ID
// router.get('/cliente/:id',controller.search);

//cliente DELETE
//router.post('/cliente/delete',controller.clientedelete);




// cliente BUSCAR POR NOMBRE
// router.get('/cliente/buscar/:buscar',controller.buscar);

module.exports = router;
        