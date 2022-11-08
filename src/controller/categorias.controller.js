const controller = {};
const cn = require('../bd/conexionmysql.js');

//CATEGORIA LISTAR
controller.categoriashow= async(req,res) =>{

  //  await cn.query(`CALL selectproduct`,(err,rows,fields)=>{

    await cn.query('select * from categorias',(err,rows,fields)=>{
        if(!err){
            //aki importante para no enviar doble llave
            res.json(rows);
            
        } else {
            console.log(err);
        }
    });
};
//||
//CATEGORIA INSERT
controller.categoriainsert=async (req,res)=>{
    try{
            const { idcategoria,descripcion,foto_producto} = req.body;
            console.log(req.body);
            //const response= await cn.query("INSERT INTO alumnos (name) VALUES ($1)",[name]);
            const  inser_categoria= `CALL insertcategoria ($1,$2,$3)`;
            //const resultado = await cn.query(inser_producto,[name]);
            await cn.query(inser_categoria,[idcategoria,descripcion,foto_producto],(err,rows,fields)=>{
                if(!err){
                     res.json(
                        {message:"CATEGORIA AGREGADO SATISFACTORIAMENTE",
                        body:{
                            categoria:{idcategoria,descripcion,foto_producto} 
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


//CATEGORIA UPDATE NORMAL
controller.categoriaupdate=async (req,res)=>{
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

//CATEGORIA DELETE NORMAL
controller.categoriadelete=async(req,res) =>{
   try{
   const { id } = req.params;
   //const  delete_producto="select eliminaralumno("+id+")";
   const  delete_producto= `CALL deleteproduct (${id})`;

        console.log(delete_producto);
     await cn.query(delete_producto,(err,rows,fields)=>{
        if(!err){
            //console.log(rows[0]);
            res.json({
                
                Estado:"PRODUCTO ELIMINADO"});
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
module.exports = controller;