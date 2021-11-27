const { table } = require('console');
const fs = require('fs');
let data = fs.readFileSync('./articulos.JSON');
let tienda = JSON.parse(data);

function getExistenciaMayor(fx, eMayor){
    resultado=[];
    consulta=[];
    let cuenta = 0;
    for(let i = 0; i<tienda.length; i++){
        if((tienda[i].cant_existencia) > eMayor){
            cuenta += 1;
            let aux = new Object();
            aux["Descripcion"]  = tienda[i].descripcion;
            aux["cant_existencia"] = tienda[i].cant_existencia;
            consulta[i] = aux;
        }
    }
    resultado[0] = consulta;
    resultado[1] = eMayor;
    resultado[2] = cuenta;
    fx(resultado);
}

function getExistenciaMenor(fx, eMenor){
    consulta=[];
    let resultado=[];
    let cuenta = 0;
    for(let i = 0; i<tienda.length; i++){
        if((tienda[i].cant_existencia) < eMenor){
            cuenta += 1;
            let aux = new Object();
            aux["Descripcion"]  = tienda[i].descripcion;
            aux["cant_existencia"] = tienda[i].cant_existencia;
            consulta[i] = aux;
        }
    }
    resultado[0] = consulta;
    resultado[1] = eMenor;
    resultado[2] = cuenta;
    fx(resultado);
}

function getClasificacionPrecio(fx, precio, clasificacion){
    let resultado=[];
    let j = 0
    for(let i = 0; i<tienda.length; i++){
        if((tienda[i].clasificacion == clasificacion) && (tienda[i].precio > precio)){
            let aux = new Object();
            aux["Descripcion"] = tienda[i].descripcion;
            aux["Precio"] = tienda[i].precio;
            resultado[j] = aux;
            j += 1;
        }
    }
    fx(resultado)
}

function getPrecioIntervalo(fx, inf,sup){
    consulta=[];
    let cuenta = 0;
    let resultado=[];
    for(let i = 0; i<tienda.length; i++){
        if(((tienda[i].precio) > inf) && ((tienda[i].precio)<sup)){
            let aux = new Object();
            aux["Descripcion"]  = tienda[i].descripcion;
            aux["Precio"] = tienda[i].precio;
            consulta[cuenta] = aux;
            cuenta += 1;
        }
    }
    resultado[0] = consulta;
    resultado[1] = inf;
    resultado[2] = sup;
    fx(resultado);

}

function getAgrupadosClasificacion(fx){
    let flag = false;
    let cuentaProductos = 0;
    let indice = 0;
    let arregloAux = [];
    let clasificaciones = ["vacio"];
    let resultados = [];
    let arrayAux = [];
    for(let i = 0; i<tienda.length; i++){
        arregloAux[i] = tienda[i].clasificacion
    }
    arregloAux.forEach((nombre, i)=>{
        for(let j = 0; j<arregloAux.length; j++){
            if(nombre == clasificaciones[j]){
                flag = true;
            }
        }
        if(flag==false){
            clasificaciones[indice] = nombre;
            indice += 1;
        }else{
            flag = false;
        }
    });

    clasificaciones.forEach((clas, i)=>{
        for(let j = 0; j<tienda.length; j++){
            if(clas == tienda[j].clasificacion){
                cuentaProductos += 1;
            }
        }
        arrayAux = [];
        arrayAux["Numero productos"] = cuentaProductos
        resultados[clas] = arrayAux;
        cuentaProductos = 0;
    });

    fx(resultados);
}

console.log("#1");
getExistenciaMayor((resultado)=>{
    console.log("==================================================");
    console.log("Número de productos con existencia mayor a " + resultado[1] + ": " + resultado[2]);
    console.log("==================================================");
    console.table(resultado[0]);
},20);

console.log("");
console.log("#2");
getExistenciaMenor((resultado)=>{
    console.log("==================================================");
    console.log("Número de productos con existencia menor a " + resultado[1] + ": " + resultado[2]);
    console.log("==================================================");
    console.table(resultado[0]);
},15);

let SelecClasificacion = "bebidas alcoholicas";
let precio = 15.50;
console.log("");
console.log("#3");
getClasificacionPrecio((resultado)=>{
    console.log("=========================================================================================");
    console.log("Lista de productos con la misma clasificación ("+ SelecClasificacion +")"+  " y precio mayor a " + precio);
    console.log("=========================================================================================");
    console.table(resultado);
},precio, SelecClasificacion);

console.log("");
console.log("#4");
getPrecioIntervalo((resultado)=>{
    console.log("=========================================================");
    console.log("Lista de productos con precio mayor a "+resultado[1]+"$ y menor a " + resultado[2]+"$");
    console.log("=========================================================");
    console.table(resultado[0]);
},20.30,45);

console.log("");
console.log("#5");
getAgrupadosClasificacion((rs)=>{
    console.log("==================================================");
    console.log("Número de productos agrupados por su clasificación");
    console.log("==================================================");
    console.table(rs);
});