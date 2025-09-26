const apiUrl = "https://huachitos.cl/api/animales";

function Animalito (animalito) {

    const {id, nombre, estado, edad, imagen, region} = animalito;
    const contenedorDeAnimalitos = document.querySelector(".animalitos-en-adopcion");

    const title = document.createElement("h5");
    //label nombre
    const label = document.createElement("span");
    label.textContent = "Nombre: ";
    label.className = "text-blue-600";

    const valorNombre = document.createElement("span");
    valorNombre.textContent = nombre;
    valorNombre.className = "text-black-600";
    
    title.appendChild(label);
    title.appendChild(valorNombre);
    ///

    //estado del animalito
    const estadoAnimalito = crearTextoColor("Estado", estado);

    ///imagen del animalito

    const imagenAnimalito = document.createElement("img");
    imagenAnimalito.src = imagen;
    imagenAnimalito.className = "w-full h-60 sm:h-48 md:h-56 lg:h-60 object-cover rounded-lg mb-2";
    ///

    const regionAnimalito = crearTextoColor("Región", region);

    const cartaAnimalito = document.createElement("div");
    cartaAnimalito.appendChild(imagenAnimalito);
    cartaAnimalito.appendChild(title);
    cartaAnimalito.appendChild(estadoAnimalito);
    cartaAnimalito.appendChild(regionAnimalito);


    contenedorDeAnimalitos.appendChild(cartaAnimalito);
}

function crearTextoColor (labelText, valorText){

    const p = document.createElement("p");

    const label = document.createElement("span");
    label.textContent = labelText + ": ";
    label.className = "text-gray-700 font-semibold";

    const valor = document.createElement("span");
    if (valorText.toLowerCase() === "perdido") {

        valor.className = "text-red-600 font-bold";
    }else if (valorText.toLowerCase() === "adopcion"){

        valor.textContent = "En "
        valor.className = "text-green-600 font-bold";
    }else {

        valor.className = "text-black-600 font-bold";
    }
    valor.textContent += valorText;

    p.appendChild(label);
    p.appendChild(valor);

    return p;
}

async function getAnimalitos () {

    try {
        const response = await fetch(apiUrl);
        const resultados = await response.json();
        const animales = resultados.data;

        const contenedor = document.querySelector(".animalitos-en-adopcion");
        contenedor.innerHTML = "";

        animales.forEach(animal => Animalito(animal));

        const filtroActivo = document.getElementById("filtro-activo");
        filtroActivo.textContent = "Mostrando todos los animales";
        
    } catch (error) {
        console.error(error);
    }
};
async function filtrarPor(campo, valor) {
  
    try {
    
    const response = await fetch(`https://huachitos.cl/api/animales/${campo}/${valor}`);
    const resultados = await response.json();
    const animales = resultados.data;

    const contenedor = document.querySelector(".animalitos-en-adopcion");
    contenedor.innerHTML = "";

    const filtroActivo = document.getElementById("filtro-activo");
    let textoFiltro = "";
    if (campo === "region") {textoFiltro = `Mostrando animales de la región: ${nombreRegion(valor)}`;
}
    else if (campo === "tipo") textoFiltro = valor.toLowerCase() === "roedor" ? "Mostrando roedores" : `Mostrando ${valor}s`;
    else textoFiltro = `Filtrando por ${campo}: ${valor}`;
    filtroActivo.textContent = textoFiltro;

    animales.forEach(animal => Animalito(animal));
  } catch (error) {
    console.error(error);
  }
}
function inicializarMenus(menus) {
    menus.forEach(({ btn, menu }) => {
        const btnElement = document.getElementById(btn);
        const menuElement = document.getElementById(menu);

        if (!btnElement || !menuElement) return;


        btnElement.addEventListener("click", (e) => {
            e.stopPropagation(); 
            menuElement.classList.toggle("hidden");
        });

        document.addEventListener("click", (event) => {
            if (!btnElement.contains(event.target) && !menuElement.contains(event.target)) {
                menuElement.classList.add("hidden");
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    getAnimalitos();
    inicializarMenus([{ btn: "btn-region", menu: "menu-region" }, { btn: "btn-tipo", menu: "menu-tipo" }, { btn: "btn-comuna", menu: "menu-comuna" },]);
});


const regiones = {
    1: "Arica y Parinacota",
    2: "Tarapacá",
    3: "Antofagasta",
    4: "Atacama",
    5: "Coquimbo",
    6: "Valparaíso",
    7: "Metropolitana",
    8: "O'Higgins",
    9: "Maule",
    10: "Ñuble",
    11: "Biobío",
    12: "La Araucanía",
    13: "Los Ríos",
    14: "Los Lagos",
    15: "Aysén",
    16: "Magallanes"
};

function nombreRegion(id) {
    return regiones[id] || "Desconocida";
}