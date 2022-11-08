const controller = {};
const cn = require('../../bd/conexionmysql.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//USUARIOS Insertar 
controller.insert = (req, res) => {    
    const { id, Email, Nombres,
            Apellidos,Contrasena, Direccion,
            Fecha_Creacion,Telefono , Estado } = req.body;
    console.log(id, Email, Nombres, Apellidos,
        Contrasena, Direccion, Fecha_Creacion,Telefono , Estado );

    if (Email.trim() == null) {
        console.log('Email es requerido');
        return false;
    }
    var ce = encriptarpass(Contrasena);
    console.log(ce);
    const insert_update_usuarios = `CALL insert_update_usuarios(?,?,?,?,?,?,?,?,?)`;
    cn.query(insert_update_usuarios, [id, Email, Nombres, Apellidos,ce, Direccion, Fecha_Creacion,Telefono,Estado]
                , (err, rows, fields) => {
                    var respuestaBd = Object.values(JSON.parse(JSON.stringify(rows[0])));
                    let mensaje=respuestaBd[0].mensaje
                    let estado=respuestaBd[0].respuesta;                   

            if (!err) {
                

                res.json(respuestaBd[0]);

            } else {
                console.log(err);
            }
        });
};
controller.login = (req, res) => {
    const { Email, Contrasena } = req.body;
    var cc = encriptarpass(Contrasena);
    const get_contrasenaUser = `CALL get_contrasenaUser(?)`;
    cn.query(get_contrasenaUser, [Email], (err, rows, fields) => {
        var resultArray = Object.values(JSON.parse(JSON.stringify(rows[0])));
        if (bcrypt.compareSync(Contrasena, resultArray[0].contrasena)) {
            console.log(Contrasena);
            console.log(resultArray[0].contrasena);
            const get_DataForToken = `CALL get_DataForToken(?)`;
            cn.query(get_DataForToken, [Email], (err, rows, fields) => {
                var resultToken = Object.values(JSON.parse(JSON.stringify(rows[0])));
                const token = jwt.sign({ resultToken }, 'millave', {//'mi llave' se tiene que manejar en .env
                    expiresIn: 3600 // Token está en segundos ( 24 veces * 60 segundos)
                });
                res.json({
                    status: "ok",
                    mensaje: 'Autenticación correcta',
                    token: token
                });
            });
        } else {
            console.log(resultArray[0].contrasena);
            res.json({
                status: "error",
                mensaje: "Usuario o contraseña incorrectos"
            });

        }
    });
};

encriptarpass = function (password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

matchPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = controller;