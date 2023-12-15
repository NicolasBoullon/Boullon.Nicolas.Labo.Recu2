import { crearArticulo } from "./cards.js";
import {getMonstruosCards} from "./fetch.js";


// const monstruos = JSON.parse(localStorage.getItem("monstruos")) || [];
const monstruos = await getMonstruosCards();
crearArticulo(monstruos);