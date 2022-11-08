setTimeout(()=>{
    console.log("Hello Word1");
},3000)

const getUserById=(id,callback)=>{
    const user ={
        id,
        name:"Sergio"

    }
    setTimeout(()=>{
        // console.log(user)
        callback(user)
    },1500);

}

getUserById(10,( usuario)=>{
    console.log(usuario.id);
    console.log(usuario.name.toUpperCase());
});