const controller = {};
const cn = require('../bd/conexionmysql.js');

//PEDIDO SHOW
controller.mostrarpedido=async (req,res)=>{
}

//DETALLE CABECERA PEDIDO
controller.insertpedido=async (req,res)=>{
    try{
        //Request que enviamos lo que usuario envia 
        const {idtipodocumento,NumeroCorrelativo,idcliente,idempleado,estado_pedido,subtotal,igv,total,descuento_totales} = req.body;
        //console.log(idtipodocumento,NumeroCorrelativo,idcliente,idempleado,estado_pedido,subtotal,igv,total,descuento_totales);
        var precioTotal=0.00;
        req.body.CabeceraDetallePedido.forEach(i => {
            precioTotal+=i.cantidad * i.precio_unitario ;

        });
        const inserCabeceraPedido = `CALL pedidoscabecera(?,?,?,?,?,?,?,?,?)`;
        cn.beginTransaction(function(err) {
            if (err) { throw err; }
            var idCabeceraPedido=0;
            cn.query(inserCabeceraPedido,
                [idtipodocumento,NumeroCorrelativo,idcliente,idempleado,estado_pedido,subtotal,igv,precioTotal,descuento_totales],
                (error, rows, fields) => {     
                
                
                res.json({Estado:"carritoPedidoCabecera Registrado"});
                var resultArray = Object.values(JSON.parse(JSON.stringify(rows[0])));
                console.log(resultArray[0].IdPedidoCabecera);
                idCabeceraPedido =resultArray[0].IdPedidoCabecera;
              
                const valor1 = req.body;
                const detallePedidosCompra =  `CALL detallePedidos(?,?,?,?,?,?)`;
                //Antes de agregar recorremos la tabla de detalle para agregar con su idpedido
                    valor1.CabeceraDetallePedido.forEach(i => {
                                                                    //Recorremos la tablaDetallepedidos todos sus campos Por Orden.
                        let dellateProducto                 =i.idproducto;
                        let dellateCantidad                 =i.cantidad;
                        let dellateTotal                    =i.total;
                        let dellatePrecioUnitario           =i.precio_unitario;
                        let dellateDescuentoProducto        =i.descuentoproducto;
                                                            //Enviamos los parametros por orden como este la tabla
    
                    cn.query(detallePedidosCompra,[idCabeceraPedido,dellateProducto,dellateCantidad,dellateTotal,dellatePrecioUnitario,dellateDescuentoProducto],(error,rows,fields)=>{
                        
                        if(!error){
                            var respuestaBd = Object.values(JSON.parse(JSON.stringify(rows[0])));
                          console.log("prueba: "+respuestaBd)  

                            if(respuestaBd[0].Codigo==1){
                                return cn.rollback(function() {
                                    throw err;
                                });
                            }
                            console.log(respuestaBd[0].Codigo);
                        } else {
                            console.log(error);
                            return cn.rollback(function() {
                                throw err;
                            });
                        }
                
                    });
                    });
              
                
            });
           


            cn.commit(function(err) {
                if (err) {
                  return cn.rollback(function() {
                    throw err;
                  });
                }
                console.log('success!');
            });
        });

        /*
        const inserCabeceraPedido = `CALL pedidoscabecera(?,?,?,?,?,?,?,?,?)`;
        const respuesta =(await cn.query(inserCabeceraPedido,
            [idtipodocumento,NumeroCorrelativo,idcliente,idempleado,estado_pedido,subtotal,igv,precioTotal,descuento_totales],
            (err, rows, fields) => {           
            if(!err){
                res.json({Estado:"carritoPedidoCabecera Registrado"});
                var resultArray = Object.values(JSON.parse(JSON.stringify(rows[0])));
                console.log(resultArray[0].IdPedidoCabecera);
                let idCabeceraPedido =resultArray[0].IdPedidoCabecera;
                const valor1 = req.body;
                const detallePedidosCompra =  `CALL detallePedidos(?,?,?,?,?,?)`;
                //Antes de agregar recorremos la tabla de detalle para agregar con su idpedido
                valor1.CabeceraDetallePedido.forEach(i => {
                                                    //Recorremos la tablaDetallepedidos todos sus campos Por Orden.
                    let dellateProducto                 =i.idproducto;
                    let dellateCantidad                 =i.cantidad;
                    let dellateTotal                    =i.total;
                    let dellatePrecioUnitario           =i.precio_unitario;
                    let dellateDescuentoProducto        =i.descuentoproducto;
                                                        //Enviamos los parametros por orden como este la tabla
                // cn.beginTransaction(function(err) {
                //     if (err) { throw err; }
                cn.query(detallePedidosCompra,[idCabeceraPedido,dellateProducto,dellateCantidad,dellateTotal,dellatePrecioUnitario,dellateDescuentoProducto],(err,rows,fields)=>{
                    if(!err){
                      //  console.log(valor1)
                        var respuestaBd = Object.values(JSON.parse(JSON.stringify(rows[0])));
                        console.log(respuestaBd[0].Mensaje);

                    } else {
                        console.log(err);
                        

                    }
            
                });
                });
                      
            }   

        }));*/
         }catch(err){
           throw err; 
         }
}


module.exports = controller;
