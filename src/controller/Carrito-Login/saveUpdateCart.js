const express = require ("express");
const router = express.Router();

const controller = require("../controller/saveUpdateCart.controller");

router.get('/cabeceracarrito',controller.show);

router.post('/saveUpdateCart/insert',controller.insert);





module.exports = router;
