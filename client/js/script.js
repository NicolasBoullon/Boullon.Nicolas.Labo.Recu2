import {actualizarTabla, actualizarTablaFiltros} from "./tabla.js";
import { Monstruo } from "./monstruo.js";
import { tipos,cargarSelect} from "./select.js";
import {getMonstruos,postMonstruo,updateMonstruo} from "./ajax.js";
import {deleteMonstruo} from "./axios.js";

// const ctx = document.getElementById('myChart').getContext('2d');
const loader = document.querySelector("#loader");
const select = document.getElementById("select-tipo");
const selectFiltro = document.getElementById("filtro-tipo");
const $filtroTipos = document.getElementById("section-filtrado");
actualizarStorage("tipos",tipos);
const tiposMonstruos = JSON.parse(localStorage.getItem("tipos")) || [];
cargarSelect(select, tiposMonstruos);
cargarSelect(selectFiltro, tiposMonstruos);

const $seccionTabla = document.getElementById("tabla");
const $seccionTablaFiltros = document.getElementById("tabla-filtros");
// const monstruos = JSON.parse(localStorage.getItem("monstruos")) || [];
const monstruos = await getMonstruos();
//console.log(DeserializeLocalStorage("monstruos"));
const $formulario = document.forms[0];
// actualizarTabla($seccionTabla,monstruos);
const cargarCabeceras = (cabeceras) =>{
    if(cabeceras.length == 0){
        return;
    }
    const $checkboxs = document.querySelectorAll(".ch");
    
    cabeceras.forEach(element => {
        $checkboxs.forEach(ckb =>{
            if(element === ckb.value)
            {
                ckb.checked = true;
            }
        })
    });
}

const cargarTipo = (Tipo) =>{
    
    const $tipo = document.getElementById("filtro-tipo");
    $tipo.value = Tipo;
}

const cabeceras = JSON.parse(localStorage.getItem("cabeceras")) || [];
cargarCabeceras(cabeceras);

const tipo = JSON.parse(localStorage.getItem("tipo")) || [];
cargarTipo(tipo);



$filtroTipos.addEventListener("change", (e) => { //checkbox
    e.preventDefault();
    
    const $arrayFiltros = obtenerValoresChecked();
    
    actualizarStorage("cabeceras",$arrayFiltros);
    const $tipo = document.getElementById("filtro-tipo");

    actualizarStorage("tipo",$tipo.value);

    const dataFiltrada = Filtrar($arrayFiltros);
    dataFiltrada
    .then((res) =>{
        console.log(res);
        actualizarTablaFiltros($seccionTablaFiltros, res);
    }).catch((err)=>{
        console.error(err);
    })

    // actualizarTabla($seccionTablaFiltros,arrayProcesado);


});



const GetCabeceras = (listaCabeceras, data) =>{
    const claves = Object.keys(data[0]);

    const cabeceras = ['id'];
    claves.forEach(clave =>{
        listaCabeceras.forEach(element=>{
            if(clave == element)
            {
                cabeceras.push(element);
            }
        });
    })

    return cabeceras;
}

const Filtrar = async (listaCabeceras) => {
    let data = await getMonstruos();
    const cabeceras = GetCabeceras(listaCabeceras, data);
    const selector = document.getElementById("filtro-tipo");
    if(selector.value !== "todos")
    {
        data = data.filter(d => d.tipo == selector.value);
        console.log(data);
    }

    CalcularPromedio(data);

    const resultadosFiltrados = data.map(objeto => {
        const valoresFiltrados = {};
        for (const clave of cabeceras) {
            valoresFiltrados[clave] = objeto[clave];
        }

        return valoresFiltrados;
    });

    return resultadosFiltrados;
}





const CalcularPromedio = (lista) =>{
    const listaMiedo = [];

    lista.forEach(element =>{

        listaMiedo.push(parseInt(element["miedo"]));

    })

    const suma = listaMiedo.reduce((acumulador, numero) => {
        return acumulador + numero;
    }, 0);

    const minimo = Math.min(...listaMiedo.map(el => el));
    const maximo = Math.max(...listaMiedo.map(el => el));
    const promedio = suma / listaMiedo.length;

    const miedoPromedio = document.getElementById("label-promedio");
    const miedoMinimo = document.getElementById("label-minimo");
    const miedoMaximo = document.getElementById("label-maximo");
    if(promedio >= 0)
    {
        miedoPromedio.value = promedio;
    }else{
        miedoPromedio.value = 0;
    }
    if(minimo <= 0 || minimo == "Infinity")
    {
        miedoMinimo.value = 0;
    }else{
        miedoMinimo.value = minimo;
    }

    if(maximo >= 0)
    {
        miedoMaximo.value = maximo;
    }else{
        miedoMaximo.value = 0;
    }
}


const cargarTablaLocal = () =>{
    const $arrayFiltros = obtenerValoresChecked();
    actualizarStorage("cabeceras",$arrayFiltros);
    const $tipo = document.getElementById("filtro-tipo");
    actualizarStorage("tipo",$tipo.value);

    const dataFiltrada = Filtrar($arrayFiltros);
    dataFiltrada
    .then((res) =>{
        actualizarTablaFiltros($seccionTablaFiltros, res);
    }).catch((err)=>{
        console.error(err);
    })
}


cargarTablaLocal();

const cargarLocalStorageCharts = (id) =>{

    const idMasVisitados = JSON.parse(localStorage.getItem("idClickeados")) || [];
    idMasVisitados.push(id);
    actualizarStorage("idClickeados",idMasVisitados);
}




const $botonGuardar = document.getElementById("botonGuardar");
const $botonCancelar = document.getElementById("botonCancelar");
// const idAux = -1;
window.addEventListener("click", async (e)=>{
    if(e.target.matches("td"))
    {
        const monstruos = await getMonstruos();
        $botonGuardar.value = "Modificar";
        const id = e.target.parentElement.dataset.id;

        cargarLocalStorageCharts(id);
        const selectedMonstruo = monstruos.find((Monstruo)=> Monstruo.id == id);
   
        cargarFormMonstruo($formulario,selectedMonstruo);

        const $idClickeados = JSON.parse(localStorage.getItem("idClickeados")) || [];

        const ctx = document.getElementById('myChart').getContext('2d');


        if (window.myChart instanceof Chart) {
            window.myChart.destroy();
        }
        const idFrequencies = $idClickeados.reduce((acc, id) => {
            acc[id] = (acc[id] || 0) + 1;
            return acc;
        }, {});

        const sortedFrequencies = Object.entries(idFrequencies)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);

        const top3IDs = sortedFrequencies.map(([id]) => id);
        const top3Frequencies = sortedFrequencies.map(([_, frequency]) => frequency);

        const $id1 = document.getElementById("id1");
        const $id2 = document.getElementById("id2");
        const $id3 = document.getElementById("id3");
        $id1.value = top3IDs[0]; 
        $id2.value = top3IDs[1]; 
        $id3.value = top3IDs[2];

        const data = {
            labels: top3IDs,
            datasets: [{
                label: 'Frecuencia de ID',
                data: top3Frequencies,
                backgroundColor: ['red', 'orange', 'yellow'],
                borderColor: ['red', 'orange', 'yellow'],
                borderWidth: 1
            }]
        };

        const options = {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };


        window.myChart = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options
        });
    }
    else if(e.target.matches("input[value='Eliminar']"))
    {   
        const {txtNombre, txtAlias ,txtId} = $formulario;
        if(txtNombre.value !== "" && txtAlias.value !== "")
        {
            loader.classList.remove("oculto");
            await deleteMonstruo($formulario.txtId.value);
        
            $botonGuardar.value = "Guardar";
            actualizarTabla($seccionTabla,monstruos);
            // actualizarTablaFiltros($seccionTablaFiltros, res);
            $formulario.txtId.value = "";
            $formulario.reset();
            loader.classList.add("oculto");
            await cargarTablaLocal();
        }   
    }
})



if(monstruos.length) actualizarTabla($seccionTabla,monstruos);
// if(monstruos.length) actualizarTabla($seccionTablaFiltros,monstruos);



$formulario.addEventListener("submit",  (e)=>{    
    e.preventDefault();
    
    const {txtId,txtNombre, txtAlias, slcTipo, rngMiedo, rdoDefensa} = $formulario;
    // console.log(ckbComida);
    // loader.classList.remove("oculto");

        if(txtId.value === "")
        {
            if(txtNombre.value !== "" && txtAlias.value !== "")
            {
                const newMonstruo = new Monstruo(
                Date.now(),
                txtNombre.value,
                slcTipo.value,
                txtAlias.value,
                parseInt(rngMiedo.value),
                rdoDefensa.value,
                );

                // newMonsrtuo.fechaCreacion = Date.now();
                 postMonstruo(newMonstruo);
                 cargarTablaLocal();
                // cargarTablaLocal();
                // actualizarTabla($seccionTabla,monstruos);
            }
        }
        else
        {
            if(txtNombre.value !== "" && txtAlias.value !== "")
            {
                //update Monstruo
                const updatedMonstruo = new Monstruo(
                txtId.value,
                txtNombre.value,
                slcTipo.value,
                txtAlias.value,
                parseInt(rngMiedo.value),
                rdoDefensa.value
                );
                 updateMonstruo(updatedMonstruo);
                 cargarTablaLocal();
                 // actualizarTabla($seccionTabla,monstruos);
            }
        }
        // loader.classList.add("oculto");
        
        $botonGuardar.value = "Guardar";
        $formulario.txtId.value = "";
        $formulario.reset();
        actualizarTabla($seccionTabla,monstruos);
        
})

// $botonGuardar.addEventListener("click",(e)=>{
//     e.target.parentElement.dataset.id = "";
// })

$botonCancelar.addEventListener("click",(e)=>{
    e.preventDefault();
    $botonGuardar.value = "Guardar";
    $formulario.txtId.value = "";
    $formulario.reset();
    // e.target.parentElement.dataset.id = "";
})

// function handlerCreate(nuevoMonstruo)
// {
//     monstruos.push(nuevoMonstruo);
//     // actualizarStorage("monstruos",monstruos);
//     actualizarTabla($seccionTabla,monstruos);
// }

// function handlerUpdate(editMonstruo)
// {
//     let index = monstruos.findIndex((mon)=> mon.id == editMonstruo.id);
//     monstruos.splice(index,1,editMonstruo);
//     // actualizarStorage("monstruos",monstruos);
//     actualizarTabla($seccionTabla,monstruos);
// }

// function handlerDelete(id)
// {
//     let index = monstruos.findIndex((mon) => mon.id == id);

    
//     monstruos.splice(index, 1);

//     // console.log(personas[index]);
//     // actualizarStorage("monstruos",monstruos);
//     actualizarTabla($seccionTabla,monstruos);
// }

function cargarFormMonstruo(formulario,monstruo)
{
    // id,nombre,tipo,alias,miedo,defensa
    formulario.txtId.value = monstruo.id;
    formulario.txtNombre.value = monstruo.nombre;
    formulario.slcTipo.value = monstruo.tipo;
    formulario.txtAlias.value = monstruo.alias;
    formulario.rngMiedo.value = monstruo.miedo;
    formulario.rdoDefensa.value = monstruo.defensa;
}

function actualizarStorage(clave,data)
{
    localStorage.setItem(clave,JSON.stringify(data));
}



// function obtenerValoresChecked()
// {
//     const $checkbox = document.querySelectorAll("input[type='checkbox']:checked");
//     const valores = [];
//     $checkbox.forEach((e)=>{
//         valores.push(e.value);
//     })

//     return valores;
// }

function obtenerValoresChecked() {
    const $checkbox = document.querySelectorAll("input[type='checkbox']:checked");
    const valores = Array.from($checkbox).map(e => e.value);

    return valores;
}

const cargarCanvas = () =>{

    const $idClickeados = JSON.parse(localStorage.getItem("idClickeados")) || [];
    const ctx = document.getElementById('myChart').getContext('2d');


    if (window.myChart instanceof Chart) {
        window.myChart.destroy();
    }
    const idFrequencies = $idClickeados.reduce((acc, id) => {
        acc[id] = (acc[id] || 0) + 1;
        return acc;
    }, {});

    const sortedFrequencies = Object.entries(idFrequencies)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

    const top3IDs = sortedFrequencies.map(([id]) => id);
    const top3Frequencies = sortedFrequencies.map(([_, frequency]) => frequency);

    const $id1 = document.getElementById("id1");
    const $id2 = document.getElementById("id2");
    const $id3 = document.getElementById("id3");
    $id1.value = top3IDs[0]; 
    $id2.value = top3IDs[1]; 
    $id3.value = top3IDs[2];
    // const $fecha1 = document.getElementById("fecha1");
    // const $fecha2 = document.getElementById("fecha2");
    // const $fecha3 = document.getElementById("fecha3");
    

    const data = {
        labels: top3IDs,
        datasets: [{
            label: 'Frecuencia de ID',
            data: top3Frequencies,
            backgroundColor: ['red', 'orange', 'yellow'],
            borderColor: ['red', 'orange', 'yellow'],
            borderWidth: 1
        }]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };


    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: options
    });
}

cargarCanvas();