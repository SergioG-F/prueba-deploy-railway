const controller = {};
const cn = require('../bd/conexionmysql.js');

//PRODUCTO LISTAR
controller.productoshow= async(req,res) =>{
    //CALL listproductos ()
//    select * from productos where estado=true order by idproducto desc
    await cn.query(`CALL prueba1 ()`,(err,rows,fields)=>{
        if(!err){
            //aki importante para no enviar doble llave
            //res.json(rows[0]);

           res.json(rows);
           console.log(rows)
            //Para Postgrel..lista
            //res.json(rows.rows);            
        } else {
            console.log(err);
        }
    });
};

//PRODUCTO POR ID
controller.productobyid= async(req,res) =>{
    const {id} = req.params;           
    console.log(id);

    //    select * from productos where estado=true order by idproducto desc
        await cn.query(`select * from productos where idproducto=${id}`,(err,rows,fields)=>{
            if(!err){
                res.json(rows[0])
                //aki importante para no enviar doble llave
                //res.json(rows[0]);
                //Para Postgrel..lista
                //res.json(rows.rows);            
            } else {
                console.log(err);
            }
        });
    };

//||
//PRODUCTO INSERT
controller.productoinsert=async (req,res)=>{
    try{
            const { descripcion,precio_unitario,stock,idcategoria,stock_minimo } = req.body;           
            console.log(req.body);
            const  inser_producto= `CALL inserproduct (?,?,?,?,?)`;
            
            await cn.query(inser_producto,[descripcion,precio_unitario,stock,idcategoria,stock_minimo],(err,rows,fields)=>{
                if(!err){
                     res.json(
                        {message:"PRODUCTO AGREGADO SATISFACTORIAMENTE",
                        body:{
                            producto:{descripcion,precio_unitario,stock,idcategoria,stock_minimo} 
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


//PRODUCTO UPDATE NORMAL
controller.productoupdate=async (req,res)=>{
    try{
        const { idproducto,descripcion,precio_unitario,stock,idcategoria,stock_minimo } = req.body;           
        console.log(req.body);
        const  inser_producto= `CALL updateproducto (?,?,?,?,?,?)`;
        
        await cn.query(inser_producto,[idproducto,descripcion,precio_unitario,stock,idcategoria,stock_minimo],(err,rows,fields)=>{
            if(!err){
                 res.json(
                    {message:"PRODUCTO ACTUALIZADO CORRECTAMENTE",
                    body:{
                        producto:{idproducto,descripcion,precio_unitario,stock,idcategoria,stock_minimo} 
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
/*
//PRODUCTO DELETE NORMAL    BORRA DE LA TABLA
controller.productodeletesss=async(req,res) =>{
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
*/

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
//PRODUCTO DELETE POR ESTADO 
controller.productodelete=async(req,res) =>{
    try{
        const { idproducto } = req.params;
        console.log(idproducto);
    const  delete_producto= `CALL delete_product_for_estado (?)`;
    await cn.query(delete_producto,[idproducto],(err,rows,fields)=>{
         if(!err){
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

module.exports = controller;