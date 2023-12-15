const $sectionCards = document.getElementById("cards");


export const crearArticulo = (data)=>{

    if(!Array.isArray(data)) return null;
    console.log(data + "xD");

    crearCuerpo(data)

}


const crearCuerpo = (data)=>{
    data.forEach(element => {
        const articulo = document.createElement("article");
        for (const key in element) {
            if(key === "id") continue;
            const li = document.createElement("li")
            li.textContent = (`${key.toUpperCase()} : ${element[key]}`);
            articulo.appendChild(li);
        }
        $sectionCards.appendChild(articulo);
    });

}