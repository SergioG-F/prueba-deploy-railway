const controller = {};
const cn = require('../../bd/conexionmysql.js');
//carritoCabecera INSER Y UPDATE
controller.insert=(req,res)=>{
    const { persona } = req.body;
    console.log(persona);
    const inserCabeceraCarrito = `CALL inserUpdateCabecera(?)`;
    cn.query(inserCabeceraCarrito, [persona ],(err,rows,fields)=>{
        if(!err){
            res.json({Estado:"carritoCabecera Registrado"});
            var resultArray = Object.values(JSON.parse(JSON.stringify(rows[0])));
            console.log(resultArray[0].IdCabecera);
            let idCabecera =resultArray[0].IdCabecera;
            const {detalleCarrito} = req.body;
            console.log(detalleCarrito);
            const detalleCompra =  `CALL insertDetalleCarrito(?,?,?,?)`;
            detalleCarrito.forEach(iterador => {
                let dellateCantidad =iterador.cantidad;
                let dellatePrecio   =iterador.precio;
                let dellateproducto =iterador.producto;
                cn.query(detalleCompra , [ dellateCantidad,dellateproducto,dellatePrecio,idCabecera],(err,rows,fields)=>{
                    if(!err){
                        console.log(rows[0]);
                    } else {
                        console.log(err);
                    }
            
                });
                
            });
           
        } else {
            console.log(err);
        }
    });
};
module.exports = controller;