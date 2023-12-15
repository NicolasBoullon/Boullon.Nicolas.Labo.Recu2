

const loader = document.querySelector("#loader");

const URL = "http://localhost:3000/monstruos";


function getMonstruos(){


    loader.classList.remove("oculto");
    // // setear el evento ready state change. Tiene cinco valores. si vale 4, significa q
    // recibimos la respuesta del sv
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
    
        xhr.open('GET', URL, true);
    
        xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            // La solicitud fue exitosa, resolvemos la promesa con la respuesta JSON
            resolve(JSON.parse(xhr.responseText));
        } else {
            // La solicitud no fue exitosa, rechazamos la promesa con un mensaje de error
            reject(`Error en la solicitud. Código de estado: ${xhr.status}`);
        }
        loader.classList.add("oculto");
    };
    
    xhr.onerror = function () {
        // Se produce un error de red
        reject('Error de red al intentar hacer la solicitud.');
    };
    
    xhr.send();
    });
}

function getMonstruo(id){
    
    const xhr =  new XMLHttpRequest(); // el xhr puede variar, podria ser "peticion" por ej

    loader.classList.remove("oculto");
    //setear el evento ready state change. Tiene cinco valores. si vale 4, significa q
    //recibimos la respuesta del sv
    xhr.onreadystatechange = ()=>
    {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
            }
            else{
                console.error(`Error ${xhr.status}: ${xhr.statusText}`);
            }
            loader.classList.add("oculto");
        }
    }
    
    xhr.open("GET", URL + `/${id}`, true); //true para q sea asincrona, y si no pongo nada tambien es asincrona
    //open de la peticion, se configura

    //enviar la peticion
    try { // por si falla otra cosa
        xhr.send();
    } catch (err) {
        console.error(err)
    }
}

function postMonstruo(new_monstruo){

    const xhr =  new XMLHttpRequest(); // el xhr puede variar, podria ser "peticion" por ej

    loader.classList.remove("oculto");
    //setear el evento ready state change. Tiene cinco valores. si vale 4, significa q
    //recibimos la respuesta del sv
    xhr.onreadystatechange = ()=>
    {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
            }
            else{
                console.error(`Error ${xhr.status}: ${xhr.statusText}`);
            }
        }
        loader.classList.add("oculto");
    }

    xhr.open("POST", URL, true);
    
    //seteo la cabecera
    xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    
    //enviar la peticion
    try { // por si falla otra cosa
        xhr.send(JSON.stringify(new_monstruo));
    } catch (err) {
        console.error(err)
    }
}

function deleteMonstruo(id){
    const xhr =  new XMLHttpRequest(); // el xhr puede variar, podria ser "peticion" por ej

    loader.classList.remove("oculto");
    //setear el evento ready state change. Tiene cinco valores. si vale 4, significa q
    //recibimos la respuesta del sv
    xhr.onreadystatechange = ()=>
    {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
            }
            else{
                console.error(`Error ${xhr.status}: ${xhr.statusText}`);
            }
            loader.classList.add("oculto");
        }
    }
    
    xhr.open("DELETE", URL + `/${id}`, true); //true para q sea asincrona, y si no pongo nada tambien es asincrona
    //open de la peticion, se configura

    //enviar la peticion
    try { // por si falla otra cosa
        xhr.send();
    } catch (err) {
        console.error(err)
    }
}

function updateMonstruo(new_monstruo){

    const xhr =  new XMLHttpRequest(); // el xhr puede variar, podria ser "peticion" por ej

    loader.classList.remove("oculto");
    //setear el evento ready state change. Tiene cinco valores. si vale 4, significa q
    //recibimos la respuesta del sv
    xhr.onreadystatechange = ()=>
    {
        if(xhr.readyState == 4)
        {
            if(xhr.status >= 200 && xhr.status < 300)
            {
                const data = JSON.parse(xhr.responseText);
                console.log(data);
            }
            else{
                console.error(`Error ${xhr.status}: ${xhr.statusText}`);
            }
        }
        loader.classList.add("oculto");
    }

    xhr.open("PUT", URL + "/" + new_monstruo.id, true);
    
    //seteo la cabecera
    xhr.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    
    //enviar la peticion
    try { // por si falla otra cosa
        xhr.send(JSON.stringify(new_monstruo));
    } catch (err) {
        console.error(err)
    }
}

export {getMonstruos,postMonstruo,updateMonstruo}

