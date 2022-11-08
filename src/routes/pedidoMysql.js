const express       = require ("express");
const router        = express.Router();
const controller    = require("../controller/pedidoMysql.controller.js");
//PEDIDO CABECERA
router.get('/cabeceracarrito',controller.mostrarpedido);

router.post('/saveUpdatePedido/insert',controller.insertpedido);

module.exports = router;
        