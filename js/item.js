const apiUrl = "https://huachitos.cl/api/animales";

function Animalito (animalito) {

    const {id, nombre, estado, edad, imagen} = animalito;
    const contenedorDeAnimalitos = document.querySelector(".animalitos-en-adopcion");

    const title = document.createElement("h5");
    title.textContent = nombre;
    
    const estadoAnimalito = document.createElement("p");
    estadoAnimalito.textContent = estado;

    const imagenAnimalito = document.createElement("img");
    imagenAnimalito.src = imagen;
    imagenAnimalito.width = 200;

    const cartaAnimalito = document.createElement("div");
    cartaAnimalito.appendChild(title);
    cartaAnimalito.appendChild(estadoAnimalito);
    cartaAnimalito.appendChild(imagenAnimalito);

    contenedorDeAnimalitos.appendChild(cartaAnimalito);
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