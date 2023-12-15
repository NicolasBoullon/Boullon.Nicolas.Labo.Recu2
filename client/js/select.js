const tipos = ["Esqueleto", "Zombie", "Vampiro", "Fantasma", "Bruja", "Hombre Lobo"];

const cargarSelect = (select, tipos)=> {

    tipos.forEach(tipo => {
        const option = document.createElement("option");
        option.setAttribute("name", `${tipo}`);
        option.text = tipo;
        select.appendChild(option);
    });
}

export{
    tipos,    cargarSelect
}