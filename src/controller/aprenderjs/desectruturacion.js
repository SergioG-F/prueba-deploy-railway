const deadpool={
    name:"Wade ",
    firtsname:"Windstons ",
    power:"Regeneration ",
    edad:50,
    getName:function(){
        return `${this.name} ${this.firtsname} ${this.power}`;
    }
}

// const name1= deadpool.name;
// const firtsname1= deadpool.firtsname;
// const power1 = deadpool.power;
// const {name1,firtsname1,power1} = deadpool;
// console.log(name1,firtsname1,power1);

function imprimirHeroe( {name,firtsname,power,edad}){
     //const {name,firtsname,power,edad} = deadpool;
     name="Sergio";
    console.log(name,firtsname,power,edad);
}
imprimirHeroe(deadpool);
const heroes = ['Deapol','Super','Batman','George'];

// const h3= heroes[3];
// const [ h1, h2, h3] = heroes;
// console.log(h3);
