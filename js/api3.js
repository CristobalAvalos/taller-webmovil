// Usaremos Open-Meteo para obtener el clima de algunas ciudades
const cities = [
    { name: 'Santiago', lat: -33.45, lon: -70.66 },
    { name: 'Ovalle', lat: -30.601, lon: -71.200 },
    { name: 'Vallenar', lat: -28.576, lon: -70.758 },
    { name: 'Coquimbo', lat: -29.953, lon: -71.343 },
    { name: 'La Serena', lat: -29.904, lon: -71.244 },
    { name: 'Antofagasta', lat: -23.650, lon: -70.400 },
    { name: 'Valparaíso', lat: -33.047, lon: -71.612 },
    { name: 'Concepción', lat: -36.827, lon: -73.050 },
    { name: 'Temuco', lat: -38.735, lon: -72.590 },
    { name: 'Puerto Montt', lat: -41.469, lon: -72.942 },
    { name: 'Maipú', lat: -33.513, lon: -70.761 },
    { name: 'Puente Alto', lat: -33.614, lon: -70.575 },
    { name: 'Ñuñoa', lat: -33.456, lon: -70.604 },
    { name: 'Providencia', lat: -33.426, lon: -70.617 },
    { name: 'Las Condes', lat: -33.408, lon: -70.567 },
    { name: 'Buenos Aires', lat: -34.61, lon: -58.38 },
    { name: 'Lima', lat: -12.04, lon: -77.03 },
    { name: 'Bogotá', lat: 4.71, lon: -74.07 }
];


async function cargarClima() {
    const grid = document.querySelector('.grid');
    for (const city of cities) {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`);
        const data = await res.json();
        const weather = data.current_weather;
        const card = document.createElement('div');
        card.className = 'bg-white rounded shadow p-4 m-2';
        card.innerHTML = `
            <h2 class="font-bold text-lg mb-2">${city.name}</h2>
            <p class="text-gray-700">Temperatura: ${weather.temperature}°C</p>
            <p class="text-gray-500">Viento: ${weather.windspeed} km/h</p>
            <p class="text-gray-400">Clima: ${getWeatherDescription(weather.weathercode)}</p>
        `;
        grid.appendChild(card);
    }
}

// Traducción de weathercode a texto legible
function getWeatherDescription(code) {
    const codes = {
        0: 'Despejado',
        1: 'Principalmente despejado',
        2: 'Parcialmente nublado',
        3: 'Nublado',
        45: 'Niebla',
        48: 'Niebla con escarcha',
        51: 'Llovizna ligera',
        53: 'Llovizna moderada',
        55: 'Llovizna densa',
        56: 'Llovizna congelante ligera',
        57: 'Llovizna congelante densa',
        61: 'Lluvia ligera',
        63: 'Lluvia moderada',
        65: 'Lluvia intensa',
        66: 'Lluvia congelante ligera',
        67: 'Lluvia congelante intensa',
        71: 'Nieve ligera',
        73: 'Nieve moderada',
        75: 'Nieve intensa',
        77: 'Granos de nieve',
        80: 'Chubascos ligeros',
        81: 'Chubascos moderados',
        82: 'Chubascos intensos',
        85: 'Chubascos de nieve ligeros',
        86: 'Chubascos de nieve intensos',
        95: 'Tormenta',
        96: 'Tormenta con granizo ligero',
        99: 'Tormenta con granizo intenso'
    };
    return codes[code] || 'Desconocido';
}

document.addEventListener('DOMContentLoaded', cargarClima);