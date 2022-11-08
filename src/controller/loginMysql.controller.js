const controller = {};
const cn = require('../bd/conexionmysql.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//REGISTAR USER
controller.registercliente=async (req,res)=>{
    try{
            //Request que enviamos lo que usuario envia
            const {nombre, apellido, email,passwords,telefono,idrol} = req.body;
            //Encryptamos lo que nos envia el postman o usuario
            console.log(req.body); 
            if(nombre===undefined|| apellido ===undefined|| email===undefined|| passwords===undefined||telefono===undefined||idrol===undefined )  {
                    res.status(400).json({message: "BadRequest porfavor te falta definir una columna"})
                }
            if (email.trim() == null) {
                console.log('Email es requerido');
                return false;
            }      
            
            var encriptarclave = encriptarpass(passwords);
            //console.log(encriptarclave)
            const insertuser = `CALL inser_login2(?,?,?,?,?,?)`;
            const respuesta =(await cn.query(insertuser,[nombre, apellido, email,encriptarclave,telefono,idrol],(err, rows, fields) => {
                var respuestaBd = Object.values(JSON.parse(JSON.stringify(rows[0])));
                //console.log(respuestaBd[0].Codigo);
                //console.log(respuestaBd[0].Respuesta); 
                if(!err){
                jwt.verify(req.token,'millave',(err,data)=>{
                    console.log("ingrese???");
                    if(err){
                        res.sendStatus(403);
                        res.json(respuestaBd[0])
                    }else{
                        res.json({
                            text:"Permitido para Ingresar!",
                            data
                        })
                    }
                    if (respuestaBd[0].Codigo!=1) {
                        res.json(respuestaBd[0]);

                    }


                      
                    })}}));

                // if(!err){
                    
                //     if (respuestaBd[0].Codigo!=1) {
                      
                //        res.json(respuestaBd[0]);
       
                //     } else {
                //         console.log("Error");
                //         res.json(respuestaBd[0]);
                //     }
             
                // }   
                
            // }))
    
             }catch(err){
               throw err; 
             }
            };


//login
controller.login=async (req,res)=>{
    try{
            //Request que enviamos lo que usuario envia
            const {email,contrasena,rol} = req.body;
            //Encryptamos lo que nos envia el postman o usuario
            console.log(req.body);
            //var clavEncryptada = encriptarpass(contrasena);
            //console.log(clavEncryptada);
            const getuserforpass = `CALL usuarioexite(?)`;
            const resp= await (cn.query(getuserforpass,[email],(err, rows, fields) => {
                var resultArray = Object.values(JSON.parse(JSON.stringify(rows[0])));
                //console.log(resultArray);                
                if (bcrypt.compareSync(contrasena, resultArray[0].passwords) ) {
                    //Validamos si lo que envia el usuario existe su contraseña
                   // console.log(contrasena);
                    //Validamos  existe su contraseña en la bd
                   // console.log(resultArray[0].passwords);
                    const get_DataForToken = `CALL getlogintoken(?,?)`;
                     cn.query(get_DataForToken, [email,rol], (err, rows, fields) => {
                         var resultToken = Object.values(JSON.parse(JSON.stringify(rows[0])));
                         console.log("resultado token...",resultToken);

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
                    console.log(resultArray[0].passwords);
                    res.json({
                        status: "ERROR",
                        mensaje: "CORREO O CONTRASEÑA INCORRECTA"
                    });
        
                }
                


            }));
    
             }catch(err){
               throw err; 
             }
            };
//EscriptarPasswords
encriptarpass = function (passwords) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(passwords, salt);
}

//Comprar de la bd y del input que escribe el user
matchPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};



module.exports = controller;
