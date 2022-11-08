const controller = {};
const cn = require('../bd/conexionmysql.js');
const bcrypt = require('bcrypt');
//cliente LISTAR
controller.clienteshow= async(req,res) =>{
    await cn.query('CALL listClientes ()',(err,rows,fields)=>{
        if(!err){
            //aki importante para no enviar doble llave
            res.json(rows[0]);            
        } else {
            console.log(err);
        }
    });
};

//REGISTAR USER CON MYSQL 
controller.clienteRegister=async (req,res)=>{
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
                if(!err){
                    
                    if (respuestaBd[0].Codigo!=1) {
                      
                       res.json(respuestaBd[0]);
       
                    } else {
                        console.log("Error");
                        res.json(respuestaBd[0]);
                    }
             
                }   
                
            }))            
    
             }catch(err){
               throw err; 
             }
            };


/*            
//||
//cliente INSERT PARA POSTGREL
controller.clienteinsert=async (req,res)=>{
    try{
            //Campos de la bd
            const { nombres,apellidos,email,passwords,telefono,idrol } = req.body;
            console.log(req.body);
            var clavEncryptada = encriptarpass(passwords);
            console.log(clavEncryptada);
            const  inser_cliente= `CALL insercliente ($1,$2,$3,$4,$5,$6)`;
            await cn.query(inser_cliente,[nombres,apellidos,email,clavEncryptada,telefono,idrol],(err,rows,fields)=>{
                if(!err){
                                    
                     res.json(
                        {message:"cliente AGREGADO SATISFACTORIAMENTE",
                        body:{
                            product:{nombres,apellidos,email,passwords,telefono,idrol}  
                        }
                        }
                        );
                 } else {
                     console.log(err);
                 }
             });
             }catch(err){
                console.log(err.message);
            }
            };
//EscriptarPasswords
encriptarpass = function (password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

//cliente UPDATE NORMAL
controller.clienteupdate=async (req,res)=>{
    try{
            const {id} = req.params;
            const { name } = req.body;            
            console.log(id,name);
            const update_product= `CALL updateproduct ($1,$2)`;
           // const response= await cn.query(update_product,[id,name]);
            //console.log(response);
            //Msj en en el Posman como tipo console
            //res.send("UPDATE PRODUCT");
            const response= await cn.query(update_product,[id,name],(err,rows,fields)=>{
                if(!err){
                     res.json(
                        {message:"PRODUCT UPDATE SUCCESSFULLY",
                        body:{
                            
                            id:{id} ,
                            nombre:{name}
                        }
                        }
                        );
                 } else {
                     console.log(err);
                 }
             });
             }catch(err){
                console.log(err.message);
            }
            };

//cliente DELETE NORMAL
controller.clientedeletesss=async(req,res) =>{
   try{
   const { id } = req.params;
   //const  delete_cliente="select eliminaralumno("+id+")";
   const  delete_cliente= `CALL deleteproduct (${id})`;

        console.log(delete_cliente);
     await cn.query(delete_cliente,(err,rows,fields)=>{
        if(!err){
            //console.log(rows[0]);
            res.json({
                
                Estado:"cliente ELIMINADO"});
        } else {
            console.log(err);
        }
    
    });
 
    }catch(err){
       console.log(err.message);
   }
};

// Eliminar Persona
// app.delete('/persona/:idpersona', function(req,res){
//     var parameters={
//       idpersona: req.params.idpersona,
//     }
//     console.log(parameters);
//     var query =" delete from persona where id=:idpersona ";
//       db.sequelize.query(query, {replacements:parameters,type: db.sequelize.QueryTypes.UPDATE})
//       .then((result)=>{
//           res.json({'respuesta':'success', 'result':result})
//       })
//       .catch((e)=>{
//           res.json({'respuesta':'error','result':e});
//       })
//   });



//cliente DELETE POR ESTADO 
controller.clientedelete=async(req,res) =>{
    try{
        const { idcliente } = req.body;
        console.log(req.body);
    const  delete_cliente= `CALL delete_product ($1)`;
    await cn.query(delete_cliente,[idcliente],(err,rows,fields)=>{
         if(!err){
             res.json({
                 
                 Estado:"cliente ELIMINADO"});
         } else {
             console.log(err);
         }
     
     });
  
     }catch(err){
        console.log(err.message);
    }
 };

 */

module.exports = controller;