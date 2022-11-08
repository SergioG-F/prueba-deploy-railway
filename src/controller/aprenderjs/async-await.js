const empleados =[
    {
        id:1,
        nombre:"Sergio"
    },
    {
        id:2,
        nombre:"Linda"
    },
    {
        id:3,
        nombre:"Karen"
    }
];

const salarios =[
    {
        id:1,
        salariototal:1500
    },
    {
        id:2,
        salariototal:2000
    },
    {
        id:3,
        salariototal:10005
    }
];


const getEmpleado = (id)=>{
   return  new Promise((resolve,reject)=>{
        const empleado = empleados.find( e =>e.id === id)?.nombre;
        
        (empleado)
            ?  resolve(empleado)
            :  reject( `No existe Empleado con id ${id} No existe`);
        
    });
    }

const getSalario=(id)=>{
    return new Promise((resolve,reject)=>{
        const salarioempleado = salarios.find(s => s.id === id) ?.salariototal;
        (salarioempleado)
                ? resolve(salarioempleado)
                : reject(`No existe el Salario para el ${id} `);
    })
}
    

const getInfoUser= async()=>{
    try{
        const empleado = await getEmpleado(id);
        const salario = await getSalario(id);
    
        return `El salario del empleado  ${empleado} es de ${salario}`;
    
    }catch(error){
        throw error;

    }
    

}
const id =5;
getInfoUser(id)
    .then(msg=>{
        console.log("Todo Verigood")
        console.log(msg)
    })
    .catch(err=>{
        console.log("all fuck")
        console.log(err)
    });



    