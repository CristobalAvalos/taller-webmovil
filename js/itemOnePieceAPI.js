const apiUrl = "https://api.api-onepiece.com/v2/luffy-gears/en";

function Gear(gear) {
    const { name, description, count_technique } = gear;
    const contenedorDeGears = document.querySelector(".gearsLuffy");

    const title = document.createElement("h4");
    title.textContent = name;
    title.className = "tituloGear";

    const descripcionGear = document.createElement("p");
    descripcionGear.textContent = `Descripción: ${description}`;
    descripcionGear.className = "textoGear";

    const cartaGear = document.createElement("div");
    cartaGear.className = "bg-white shadow-xl rounded-lg p-4 mb-4";
    cartaGear.appendChild(title);
    cartaGear.appendChild(descripcionGear);
    cartaGear.appendChild(document.createElement("br"));

    contenedorDeGears.appendChild(cartaGear);
}

async function getGears() {
    try {
        const response = await fetch(apiUrl);
        const gears = await response.json(); // La respuesta es un array

        for (let i = 0; i < gears.length; i++) {
            Gear(gears[i]);
        }
        console.log(gears);
    } catch (error) {
        console.error(error);
    }
}

getGears();
