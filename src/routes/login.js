const express       = require ("express");
const router        = express.Router();
const controller    = require("../controller/login.controller.js");
//login  
router.post('/login',controller.login);

module.exports = router;
        