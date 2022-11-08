const controller = {}
const cn = require('../../bd/conexionmysql.js');

controller.show = (req, res) => {
    const{idusuario} = req.params;
    const listarCarritos='CALL getCarritoByUser(?)'
    cn.query(listarCarritos,[idusuario], (err, rows, fields) => {
        if (!err) {
            res.json(rows[0]);
        } else {
            console.log(err);
        }
    });
}

// controller.insert = (req, res) => {
//     const { IDPedido, TotalPedido, Precio_Unitario, SubTotal, Igv, Total, Documento, 
//         Tipo_Documento, Usuario_Creacion, Fecha_Creacion, Estado, Doc_Serie, Doc_Numero, IdUsuarios, IdProducto,
//         IdPago, IdDetalle_Pedido } = req.body;
//     const insertar = `CALL insert_update_pedido(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
//     cn.query(insertar, [IDPedido, TotalPedido, Precio_Unitario, SubTotal, Igv, Total, Documento, 
//         Tipo_Documento, Usuario_Creacion, Fecha_Creacion, Estado, Doc_Serie, Doc_Numero, IdUsuarios, IdProducto,
//         IdPago, IdDetalle_Pedido], (err, rows) => {
//             if (!err) {
//                 res.json({ Estado: "Pedido Registrado" });
//             } else {
//                 console.log(err);
//             }
//         });
// }

// controller.search = (req, res) => {
//     const { id } = req.params;
//     const buscar = `CALL search_by_id_pedido(?)`;
//     cn.query(buscar, [id], (err, rows, fields) => {
//         if (!err) {
//             res.json(rows[0][0]);
//         } else {
//             console.log(err);
//         }
//     });
// }

// controller.delete = (req, res) => {
//     const { IDPedido, Estado } = req.body;
//     const borrar = `CALL delete_pedido(?,?)`;
//     cn.query(borrar, [IDPedido, Estado], (err, rows, fields) => {
//         if (!err) {
//             console.log(IDPedido,Estado);
//             res.json({ Estado: "Pedido Estado Actualizado" });
//         } else {
//             console.log(err);
//         }
//     });
// }

module.exports = controller;