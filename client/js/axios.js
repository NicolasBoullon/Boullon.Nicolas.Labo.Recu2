
const loader = document.querySelector("#loader");

const URL = "http://localhost:3000/monstruos";

function getMonstruos(){

    loader.classList.remove("oculto");
    axios.get(URL) //esta hecho en ajax el axios
    // .then((res)=>{
    //     console.log(res.data);
    // })
    // .catch((err)=>{
    //     console.log(err);
    // })
    .then(({data})=>{
        console.log(data); 
    })
    .catch(({message})=>{
        console.log(message);
    })
    .finally(()=> loader.classList.add("oculto"));

}

function getMonstruo(id){
    loader.classList.remove("oculto");
    axios.get(URL + "/" + id) 
    .then(({data})=>{
        console.log(data); 
    })
    .catch(({message})=>{
        console.log(message);
    })
    .finally(()=> loader.classList.add("oculto"));
}

function postMonstruo(new_monstruo){


    loader.classList.remove("oculto");
    axios.post(URL,new_monstruo) 
    .then(({data})=>{
        console.log(data); 
    })
    .catch(({message})=>{
        console.log(message);
    })
    .finally(()=> loader.classList.add("oculto"));
}

function deleteMonstruo(id){
    
    loader.classList.remove("oculto");
    axios
    .delete(URL + "/" + id) 
    .then(({data})=>{
        console.log(data); 
    })
    .catch(({message})=>{
        console.log(message);
    })
    .finally(()=> loader.classList.add("oculto"));
}

function updateMonstruo(updated_monstruo){

    loader.classList.remove("oculto");
    axios
    .put(URL + "/" + updated_monstruo.id, updated_monstruo) 
    .then(({data})=>{
        console.log(data); 
    })
    .catch(({message})=>{
        console.log(message);
    })
    .finally(()=> loader.classList.add("oculto"));
}

export {deleteMonstruo}
