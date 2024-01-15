//Chaining operator, nullish coalescence operator, proxies y desestructuring.
//Chaining operator.
//Antes de ECMAScript2015 cuando en JavaScript se trabajaba con propiedades de un objeto que podían existir o no, en muchas ocasiones la evaluación provocaba 
//errores que el desarrollador al realizar operaciones con esa propiedad, no advertía.
//Ejemplo:
const userone = {
    name: "Juan",
    surname: "Pérez Conde",
    address: {
        city: "Madrid",
        street: "Paseo de La Castellana, 10"
    }
}

const usertwoo = {
    name: "Pedro",
    surname: "Martín Torres",
/*    address: {
        city: "Madrid",
        street: "Paseo de La Castellana, 10" // (Descomentar para ver el ejemplo).
    }*/
}

let city1 = userone.address.city;
console.log(city1);
//let city2 = usertwoo.address.city; //(Descomentar para ver el ejemplo).
//console.log(city2);//(Descomentar para ver el ejemplo). Esta línea nos arroja un error en consola, la propiedad city no existe en el usuario 2.
//La forma de solucionar este problema consistía en introducir estructuras condicionales según si existía la propiedad.
//Ejemplo:
if(usertwoo.address){
    city2 = usertwoo.address.city;
}
//Esta solución tiene un problema, cada vez se vuelve más compleja en función de los niveles de anidamiento de los objetos, 
//lo que implica un código cada vez mas ilegible y de difícil mantenimiento.

//Para resolver esto, ECMAScript2015 incorpora el chaining operator, que usa como sintaxis el símbolo de interrogación;
//este indica al intérprete que solo ejecute la sentencia en caso de que exista la propiedad a evaluar.
//Ejemplo:
const iveco = {
    name: "Tranporte público",
    surname: "Pérez Conde",
    loadCap: {
        heigth: "5m.",
        weight: "5000kg"
    }
}

const clio = {
    name: "utilitario",
    surname: "Martín Torres",
}

let ivecoLoad = iveco.loadCap?.weight;
console.log(ivecoLoad);
let clioLoad = clio.loadcap?.weight;
console.log(clioLoad); //no se mostrará


//Nullish coalescence operator.
//Es un nuevo operador para JavaScript de la especificación ECAMScript2015 muy útil para asignar valores por defecto en programas.
//Su énfasis consiste en asignar el valor a la derecha del operador, el cual usa doble símbolo de interrogación,
//cuando el valor de la izquierda de la expresión sea "null" o "undefined".
//Ejemplo:
let plane1 = {
    name: "Boeing-747",
    fuel: "Queroseno",
    tank: "Empty",
}

let boarding = plane1.ready ?? "No embarcando";
console.log(boarding); //No embarcando. 


//Proxies en JavaScript.
//Incorporados en ECMASCcript2015 permiten, en general, implementar metaprogramación en JavaScript.
//Uno de sus usos más frecuentes es la validación de propiedades en objetos.

let plane2 = {
    name: "",
    fuel: "",
    tank: 0,
    ready:""
}
const handlerPlane = {
    set(obj, prop, value){ //la ventaja del proxy es que podemos introducir las validaciones que necesitemos en el método "set" de la funcion validadora "handlerProduct",
                           //por ejemplo, para comprobarlos tipos de datos de las propiedades y que no existen propiedades desconocidas.
    if(Object.keys(obj).indexOf(prop) === -1){
        return console.error("Propiedad inexistente.");
    }
    if(prop === "tank" && typeof value!== Int){
        return console.error("Combustible debe ser un valor numérico.");
    }
    if(prop === "name" && typeof value !== "string"){
        return console.error("El nombre debe ser un valor alfanumérico");
    }
    }
}
const readyPlane = new Proxy(plane2,{});
readyPlane.name = "Boeing-747";
readyPlane.fuel = "Queroseno";
readyPlane.tank = 50;
if(plane2.tank === 100){
    readyPlane.ready = "ready";
}else{
    readyPlane.ready = "not ready";
}
console.log(plane2);


// Desestructuring en JavaScript
//Es una de las funcionalidades de ECAMAscript2015 que más éxito ha tenido y ha sido rápidamente adoptada.
//Consiste en extraer (de ahí su nombre) los valores de las propiedades de un array u objeto, con la particularidad de que se extrae el valor y no la referencia,
//y deja inmutable el objeto de origen.
//Ejemplo con arrays:
let values = [10, 20, 30, 40, 50,];
let [value1, value2, value3, ...restValues] = values;

console.log(value1);
value1 = 15;
console.log(values);
console.log(value2);
console.log(value3);
console.log(restValues);
restValues[0] = 45;
console.log(values);
//Ejemplo con objetos:
let newUser = {
    name: "Pilar",
    surname: "Fernández López",
    age: 40
}
let {surname, age} = newUser;
console.log(surname);
surname = "García";
console.log(age);
console.log(newUser);
//En este caso también se produce el paso por referencia; de hecho si asignamos un nuevo valor a la variable "surname", 
//podemos comprobar en la consola que el objeto original "user" ha permanecido inmutable.