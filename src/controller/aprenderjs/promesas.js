const employees =[
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

const salarys =[
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


const getEmployees = (id)=>{
   return  new Promise((resolve,reject)=>{
        const empleado = employees.find( e =>e.id === id)?.name;
        
        (empleado)
            ?  resolve(empleado)
            :  reject( `No existe Empleado con id ${id} No existe`);
        
    });
    }

const getSalary=(id)=>{
    return new Promise((resolve,reject)=>{
        const salary = salarys.find(s => s.id === id) ?.salario;
        (salary)
                ? resolve(salary)
                : reject(`No existe el Salario para el ${id} `);
    })
}
    const id =4;

    // getEmployees(id)
    //     .then(empleado =>console.log(empleado))
    //     .catch(err=>console.log(err));
    
    // getSalarys(id)
    //         .then(salary=>console.log(salary))
    //         .catch(err=>console.log(err));

    // getEmployees(id)
    //     .then(empleado =>{
    //         getSalarys(id)
    //             .then(salario =>{
    //                 console.log("El Empleado",empleado,'tiene ',salario)
    //             })
    //             .catch(err=> console.error(err))
    //     })
    //         .catch(err=>console.log(err))
//MEJORAMIENTO PROMESAS EN CADENA
let nombre;
getEmployees(id)
        .then(e=> {
            nombre = e;
            return getSalary(id)
        })
        .then(s => console.log('El empleado:', nombre, 'tiene un salario de:', s))
        .catch(err=>console.log(err));