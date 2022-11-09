const express   =   require ("express");
const cords     =   require("cors");
const path      =   require('path');
const app       =   express();


//Settings

app.set('port',process.env.PORT || 3000);

//Servir como contenido estatico para los html
//MiddLewares
app.use(express.static(path.join(__dirname,'public')));

app.use(cords());
app.use(express.json());
//Datos de un formulario lo comvierte en objeto;
//app.use(express.urlencoded({extended:false}));
//PARA VALIDAR CON TOKEN RUTAS
// const authToken= require('./middleawers/AuthToken.js');
// app.use(authToken);

//Routes
app.use(require('./routes/producto.js'));
// app.use(require('./routes/categorias'));
// app.use(require('./routes/cliente'));
// app.use(require('./routes/loginMysql'));
// app.use(require('./routes/pedidoMysql')); 
//

// app.get('*',(req,res)=>{
//    // res.send('404 | Page Not Found');
//    res.sendFile(__dirname+'/public/404.html');
// })

app.listen(app.get('port'),()=>{
    console.log('TIENDA ANGIE EN ANDROID PUERTO LISTEN: ',app.get('port'));

});