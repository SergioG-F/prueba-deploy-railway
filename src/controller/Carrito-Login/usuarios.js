const express       = require ("express");
const router        = express.Router();
const controller    = require('../controller/usuarios.controller');

//USUARIOS LISTAR
router.get('/usuarios',controller.show);

 
//USUARIOS Insertar 
router.post('/usuarios/insert',controller.insert);

//USUARIOS UPDATE
router.post('/usuario/update',controller.update);


//USUARIOS login
router.post('/usuarios/login',controller.login);

//USUARIOS BUSCAR POR ID

router.get('/usuarios/:id',controller.search);

//USUARIOS DELETE

router.get('/usuarios/delete/:id',controller.delete);

module.exports = router;
