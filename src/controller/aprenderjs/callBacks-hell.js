const employes =[
    {
        id:1,
        name:"Sergio"
    },
    {
        id:2,
        name:"Linda"
    },
    {
        id:3,
        name:"Karen"
    }
];

const salary =[
    {
        id:1,
        salario:1500
    },
    {
        id:2,
        salario:2000
    },
    {
        id:3,
        salario:10005
    }
];


const getEmployees = (id,callback)=>{
    const empleados = employes.find( e =>
        e.id === id)?.name;
        if(empleados){
            callback(null,empleados);
        }else{
            callback( `Empleado con id ${id} No existe`);
        }
        
    }
const getSalario=(id,callback)=>{
    const salarios = salary.find(s=>s.id === id)?.salario;
        if(salarios){
            callback(null,salarios);
        }else{
            callback(`El Salario con id ${id} No existe`);
        }
};

const id=1;

    getEmployees(id,(err,parametroempleado)=>{
    if(err){
        console.log("Error");
        return console.log(err);
    }
    
    getSalario(id,(err,salarioparametro)=>{
        if(err){
            return console.log(err);
        }
        console.log("El empleado : ",parametroempleado.name, "Tiene un Salario de : ",salarioparametro);

    })

});



