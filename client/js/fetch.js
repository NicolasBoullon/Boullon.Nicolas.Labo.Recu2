
const loader = document.querySelector("#loader");

const URL = "http://localhost:3000/monstruos";

const getMonstruos = async () => {
    loader.classList.remove("oculto");
    try {
        const res = await fetch(URL);
        if (!res.ok) throw res;
        const data = await res.json();
        return data;
    } catch (res) {
        console.error(`Error ${res.status}: ${res.statusText}`);
    } finally {
        loader.classList.add("oculto");
    }
}

const getMonstruosCards = async () => {
    try {
        const res = await fetch(URL);
        if (!res.ok) throw res;
        const data = await res.json();
        return data;
    } catch (res) {
        console.error(`Error ${res.status}: ${res.statusText}`);
    } 
}

async function getMonstruo(id) {
    loader.classList.remove("oculto");
    try {
        const res = await fetch(URL + "/" + id);
        if (!res.ok) throw res;
        const data = await res.json();
        console.log(data);
    } catch (res) {
        console.error(`Error ${res.status}: ${res.statusText}`);
    } finally {
        loader.classList.add("oculto");
    }
}

async function postMonstruo(new_monstruo) {
    loader.classList.remove("oculto");
    try {
        const res = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify(new_monstruo),
        });
        if (!res.ok) throw res;
        const data = await res.json();
        console.log(data);
    } catch (res) {
        console.error(`Error ${res.status}: ${res.statusText}`);
    } finally {
        loader.classList.add("oculto");
    }
}

async function deleteMonstruo(id) {
    loader.classList.remove("oculto");
    try {
        const res = await fetch(URL + "/" + id, {
            method: "DELETE",
        });
        if (!res.ok) throw res;
        const data = await res.json();
        console.log(data);
    } catch (res) {
        console.error(`Error ${res.status}: ${res.statusText}`);
    } finally {
        loader.classList.add("oculto");
    }
}

async function updateMonstruo(updated_monstruo) {
    loader.classList.remove("oculto");
    try {
        const res = await fetch(URL + "/" + updated_monstruo.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify(updated_monstruo),
        });
        if (!res.ok) throw res;
        const data = await res.json();
        console.log(data);
    } catch (res) {
        console.error(`Error ${res.status}: ${res.statusText}`);
    } finally {
        loader.classList.add("oculto");
    }
}

export { getMonstruosCards };
