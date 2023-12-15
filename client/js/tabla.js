import {getMonstruos} from "./ajax.js";


const crearTabla = (data)=>{
    console.log(data);
    if(!Array.isArray(data)) return null;
    
    const tabla = document.createElement("table");
    tabla.classList.add("table");
    tabla.appendChild(crearCabecera(data[0]));
    tabla.appendChild(crearCuerpo(data));

    return tabla;
}

const crearCabecera = (elemento)=>
{
    const tHead = document.createElement("thead");
    // tHead.setAttribute('id',"thead-lista");
    const headRow = document.createElement("tr");
    for (const key in elemento) {
        if(key === "id") continue;
        const th = document.createElement("th");
        th.setAttribute("scope","col");
        th.setAttribute("id","th-lista");
        th.textContent = key;
        headRow.appendChild(th);
    }

    tHead.appendChild(headRow);

    return tHead;
}


const crearCuerpo = (data)=>{

    if(!Array.isArray(data)) return null;

    const tBody = document.createElement("tbody");
    data.forEach((elemento,index)=>
    {
        const tr = document.createElement("tr");
        tr.setAttribute("scope","row");
    
        // if(index % 2 === 0)
        // {
        //     tr.classList.add("rowPar")
        // }
        for (const key in elemento) {
            if(key === "id")
            {
                tr.dataset.id = elemento[key];
            }
            else
            {
                const td = document.createElement("td");
                td.textContent = elemento[key];
                // console.log( elemento[key]);
                tr.appendChild(td);
            }
        }
        tBody.appendChild(tr);
    })
    return tBody;
}



export const actualizarTabla = async (contenedor, data)=>{
    while(contenedor.hasChildNodes())
    {
        contenedor.removeChild(contenedor.firstElementChild);
    }
    const monstruos = await getMonstruos();
    contenedor.appendChild(crearTabla(monstruos));
}

export const actualizarTablaFiltros = (contenedor, data)=>{
    while(contenedor.hasChildNodes())
    {
        contenedor.removeChild(contenedor.firstElementChild);
    }
    contenedor.appendChild(crearTabla(data));
}

