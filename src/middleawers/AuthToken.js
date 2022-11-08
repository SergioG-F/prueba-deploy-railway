const jwt = require('jsonwebtoken');
//metodo para proteger las urls
const prueba =function ensureToken(req,res,next){
    //Cabecera que envia la peticion este caso con postman..
    const bearerHeader =req.headers['authorization'];
    //da undefined cuando no enviamos token
   // .split(' ')
    if(typeof bearerHeader !=='undefined'){
        const bearer=bearerHeader.split(' ');
        const bearerToken= bearer[1];
        req.token= bearerToken;
        console.log("Usuario envia Postman.."+bearerToken)
        next();        
        }else{
            //403 = no permitido
            res.sendStatus(403);
        }

}
module.exports= prueba;
/*
 //const jwt= require('jsonwebtoken');
// module.exports=function(req,res,next){
//     if(req.path != '/loginmysql'){
//         if(req.headers.authorization){
//             //let token=req.headers.authorization.split(' ')[1];
//             //console.log(token);
//             const user={id:3};
//             const token = jwt.sign({user},"my_secret_key");
//             res.json({token});
//             //jwt.verify(token,CONFIG)

//             next();

//     }
    
//     }else{
//         res.status(403).send({message:"No tiene Permisos Suficientes.."})
//     }

// }

//Login con Token
app.post('api/login',(req,res)=>{
    const user ={id:3};
    const token = jwt.sign({user},'my_secret_key');
    res.json({
        token
    });
});

//protegemos las url
app.get('/api/login/protectec',ensureToken,(req,res)=>{
    //verificar el token que me envia la peticion postman
    //req.token la peticion del login /con su llave
    jwt.verify(req.token,'my_secret_key',(err,data)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                text:"Restringido",
                data
            })
        }
    })
})
//metodo para proteger las urls
function ensureToken(req,res,next){
    //Cabecera que envia la peticion este caso con postman..
    const bearerHeader =req.headers['authorization'];
    //da undefined cuando no enviamos token
    console.log(bearerHeader)
    
    if(typeof bearerHeader !=='undefined'){
        const bearer=bearerHeader.split(" ");
        const bearerToken= bearer[1];
        req.token= bearerToken;
        next();
    }else{
        //403 = no permitido
        res.sendStatus(403);
    }

}*/