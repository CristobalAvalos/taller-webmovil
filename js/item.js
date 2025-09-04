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

    try{    

        const response = await fetch(apiUrl);
        const resultados = await response.json();

        const animales = resultados.data;

        for(let i = 0; i< animales.length; i++){

            Animalito(animales[i]);
        }
        console.log(animales);
    } catch (error) {

        console.error(error);
    }

}

getAnimalitos();  