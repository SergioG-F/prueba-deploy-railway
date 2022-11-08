const express       = require ("express");
const router        = express.Router();
const controller    = require("../controller/categorias.controller.js");

//CATEGORIA LISTAR
router.get('/categorias',controller.categoriashow);

//CATEGORIA INSERT 
router.post('/categoria/insert',controller.categoriainsert);


//CATEGORIA UPDATE
router.put('/categoria/update/:id',controller.categoriaupdate);

// PRODUCTO BUSCAR POR ID
// router.get('/producto/:id',controller.search);

//CATEGORIA DELETE
router.delete('/categoria/delete/:id',controller.categoriadelete);




// CATEGORIA BUSCAR POR NOMBRE
// router.get('/producto/buscar/:buscar',controller.buscar);

module.exports = router;
        