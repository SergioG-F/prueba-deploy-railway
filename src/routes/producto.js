const express       = require ("express");
const router        = express.Router();
const controller    = require("../controller/producto.controller.js");

//PRODUCTO LISTAR
router.get('/productos',controller.productoshow);

//PRODUCTO por ID
router.get('/producto/:id',controller.productobyid);

//PRODUCTO INSERT 
router.post('/producto/insert',controller.productoinsert);


//PRODUCTO UPDATE
router.post('/producto/update',controller.productoupdate);

// PRODUCTO BUSCAR POR ID
// router.get('/producto/:id',controller.search);

//PRODUCTO DELETE
router.get('/producto/delete/:idproducto',controller.productodelete);




// PRODUCTO BUSCAR POR NOMBRE
// router.get('/producto/buscar/:buscar',controller.buscar);

module.exports = router;