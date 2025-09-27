// Usaremos Open-Meteo para obtener el clima de algunas ciudades
const cities = [
    { name: 'Santiago', lat: -33.45, lon: -70.66, region: 'Región Metropolitana', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
    { name: 'Ovalle', lat: -30.601, lon: -71.200, region: 'Coquimbo', img: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80' },
    { name: 'Vallenar', lat: -28.576, lon: -70.758, region: 'Atacama', img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
    { name: 'Coquimbo', lat: -29.953, lon: -71.343, region: 'Coquimbo', img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80' },
    { name: 'La Serena', lat: -29.904, lon: -71.244, region: 'Coquimbo', img: 'https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=400&q=80' },
    { name: 'Antofagasta', lat: -23.650, lon: -70.400, region: 'Antofagasta', img: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80' },
    { name: 'Valparaíso', lat: -33.047, lon: -71.612, region: 'Valparaíso', img: 'https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=400&q=80' },
    { name: 'Concepción', lat: -36.827, lon: -73.050, region: 'Biobío', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
    { name: 'Temuco', lat: -38.735, lon: -72.590, region: 'Araucanía', img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
    { name: 'Puerto Montt', lat: -41.469, lon: -72.942, region: 'Los Lagos', img: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80' },
    { name: 'Maipú', lat: -33.513, lon: -70.761, region: 'Región Metropolitana', img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80' },
    { name: 'Puente Alto', lat: -33.614, lon: -70.575, region: 'Región Metropolitana', img: 'https://images.unsplash.com/photo-1465156799763-2c087c332922?auto=format&fit=crop&w=400&q=80' },
    { name: 'Ñuñoa', lat: -33.456, lon: -70.604, region: 'Región Metropolitana', img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
    { name: 'Providencia', lat: -33.426, lon: -70.617, region: 'Región Metropolitana', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
    { name: 'Las Condes', lat: -33.408, lon: -70.567, region: 'Región Metropolitana', img: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80' }
];


async function cargarClima() {
    const grid = document.querySelector('.grid');
    let expandedCard = null;
    let filteredCities = cities;
    function renderCities(list) {
        grid.innerHTML = '';
        for (const city of list) {
            const res = city._weatherData;
            const weather = res ? res.current_weather : null;
            const card = document.createElement('div');
            card.className = 'bg-white rounded shadow p-2 m-2 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col';
            card.style.maxWidth = '100%';
            card.innerHTML = `
                <img src="${city.img}" alt="${city.name}" class="rounded w-full h-40 object-cover mb-2 card-img" style="transition: all 0.3s;" />
                <div class="flex-1">
                    <h2 class="font-bold text-lg mb-1 card-title">${city.name}</h2>
                    <p class="text-gray-700 card-temp">Temperatura: ${weather ? weather.temperature + '°C' : 'Cargando...'}</p>
                    <p class="text-gray-500 card-wind">Viento: ${weather ? weather.windspeed + ' km/h' : ''}</p>
                    <p class="text-gray-400 card-desc">Clima: ${weather ? getWeatherDescription(weather.weathercode) : ''}</p>
                    <div class="extra-details hidden mt-2">
                        <p class="text-gray-600">Latitud: ${city.lat}</p>
                        <p class="text-gray-600">Longitud: ${city.lon}</p>
                        <p class="text-gray-600">Región: ${city.region}</p>
                        <p class="text-gray-600">Código clima: ${weather ? weather.weathercode : ''}</p>
                    </div>
                </div>
            `;
            card.addEventListener('click', function(e) {
                if (expandedCard && expandedCard !== card) {
                    expandedCard.classList.remove('fixed', 'inset-0', 'z-50', 'overflow-y-auto');
                    expandedCard.style.width = '';
                    expandedCard.style.height = '';
                    expandedCard.style.left = '';
                    expandedCard.style.top = '';
                    expandedCard.style.right = '';
                    expandedCard.style.bottom = '';
                    expandedCard.style.position = '';
                    expandedCard.style.background = '';
                    expandedCard.querySelector('.card-img').classList.remove('h-64');
                    expandedCard.querySelector('.card-title').classList.remove('text-3xl');
                    expandedCard.querySelector('.card-temp').classList.remove('text-xl');
                    expandedCard.querySelector('.card-wind').classList.remove('text-lg');
                    expandedCard.querySelector('.card-desc').classList.remove('text-lg');
                    expandedCard.querySelector('.extra-details').classList.add('hidden');
                    expandedCard = null;
                }
                const extra = card.querySelector('.extra-details');
                if (card.classList.contains('fixed')) {
                    card.classList.remove('fixed', 'inset-0', 'z-50', 'overflow-y-auto');
                    card.style.width = '';
                    card.style.height = '';
                    card.style.left = '';
                    card.style.top = '';
                    card.style.right = '';
                    card.style.bottom = '';
                    card.style.position = '';
                    card.style.background = '';
                    card.querySelector('.card-img').classList.remove('h-64');
                    card.querySelector('.card-title').classList.remove('text-3xl');
                    card.querySelector('.card-temp').classList.remove('text-xl');
                    card.querySelector('.card-wind').classList.remove('text-lg');
                    card.querySelector('.card-desc').classList.remove('text-lg');
                    extra.classList.add('hidden');
                    expandedCard = null;
                } else {
                    card.classList.add('fixed', 'inset-0', 'z-50', 'overflow-y-auto');
                    card.style.width = '100vw';
                    card.style.height = '100vh';
                    card.style.left = '0';
                    card.style.top = '0';
                    card.style.right = '0';
                    card.style.bottom = '0';
                    card.style.position = 'fixed';
                    card.style.background = '#e0f2fe';
                    card.querySelector('.card-img').classList.add('h-64');
                    card.querySelector('.card-title').classList.add('text-3xl');
                    card.querySelector('.card-temp').classList.add('text-xl');
                    card.querySelector('.card-wind').classList.add('text-lg');
                    card.querySelector('.card-desc').classList.add('text-lg');
                    extra.classList.remove('hidden');
                    expandedCard = card;
                }
                e.stopPropagation();
            });
            grid.appendChild(card);
        }
    }
    // Fetch weather data for all cities and render
    Promise.all(cities.map(async city => {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`);
        city._weatherData = await res.json();
    })).then(() => renderCities(filteredCities));
    // Filtro por comuna/region
    window.filtrarClima = function(valor) {
        valor = valor.toLowerCase();
        filteredCities = cities.filter(c => c.name.toLowerCase().includes(valor) || c.region.toLowerCase().includes(valor));
        renderCities(filteredCities);
    }
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`);
        const data = await res.json();
        const weather = data.current_weather;
        const card = document.createElement('div');
        card.className = 'bg-white rounded shadow p-2 m-2 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col';
        card.style.maxWidth = '100%';
        card.innerHTML = `
            <img src="${city.img}" alt="${city.name}" class="rounded w-full h-40 object-cover mb-2 card-img" style="transition: all 0.3s;" />
            <div class="flex-1">
                <h2 class="font-bold text-lg mb-1 card-title">${city.name}</h2>
                <p class="text-gray-700 card-temp">Temperatura: ${weather.temperature}°C</p>
                <p class="text-gray-500 card-wind">Viento: ${weather.windspeed} km/h</p>
                <p class="text-gray-400 card-desc">Clima: ${getWeatherDescription(weather.weathercode)}</p>
                <div class="extra-details hidden mt-2">
                    <p class="text-gray-600">Latitud: ${city.lat}</p>
                    <p class="text-gray-600">Longitud: ${city.lon}</p>
                    <p class="text-gray-600">Código clima: ${weather.weathercode}</p>
                </div>
            </div>
        `;
        card.addEventListener('click', function(e) {
            // Evitar que se expanda si ya está expandida
            if (expandedCard && expandedCard !== card) {
                // Contraer la anterior
                expandedCard.classList.remove('fixed', 'inset-0', 'z-50', 'overflow-y-auto');
                expandedCard.style.width = '';
                expandedCard.style.height = '';
                expandedCard.style.left = '';
                expandedCard.style.top = '';
                expandedCard.style.right = '';
                expandedCard.style.bottom = '';
                expandedCard.style.position = '';
                expandedCard.style.background = '';
                expandedCard.querySelector('.card-img').classList.remove('h-64');
                expandedCard.querySelector('.card-title').classList.remove('text-3xl');
                expandedCard.querySelector('.card-temp').classList.remove('text-xl');
                expandedCard.querySelector('.card-wind').classList.remove('text-lg');
                expandedCard.querySelector('.card-desc').classList.remove('text-lg');
                expandedCard.querySelector('.extra-details').classList.add('hidden');
                expandedCard = null;
            }
            const extra = card.querySelector('.extra-details');
            if (card.classList.contains('fixed')) {
                // Contraer
                card.classList.remove('fixed', 'inset-0', 'z-50', 'overflow-y-auto');
                card.style.width = '';
                card.style.height = '';
                card.style.left = '';
                card.style.top = '';
                card.style.right = '';
                card.style.bottom = '';
                card.style.position = '';
                card.style.background = '';
                card.querySelector('.card-img').classList.remove('h-64');
                card.querySelector('.card-title').classList.remove('text-3xl');
                card.querySelector('.card-temp').classList.remove('text-xl');
                card.querySelector('.card-wind').classList.remove('text-lg');
                card.querySelector('.card-desc').classList.remove('text-lg');
                extra.classList.add('hidden');
                expandedCard = null;
            } else {
                // Expandir
                card.classList.add('fixed', 'inset-0', 'z-50', 'overflow-y-auto');
                card.style.width = '100vw';
                card.style.height = '100vh';
                card.style.left = '0';
                card.style.top = '0';
                card.style.right = '0';
                card.style.bottom = '0';
                card.style.position = 'fixed';
                card.style.background = '#e0f2fe';
                card.querySelector('.card-img').classList.add('h-64');
                card.querySelector('.card-title').classList.add('text-3xl');
                card.querySelector('.card-temp').classList.add('text-xl');
                card.querySelector('.card-wind').classList.add('text-lg');
                card.querySelector('.card-desc').classList.add('text-lg');
                extra.classList.remove('hidden');
                expandedCard = card;
            }
            e.stopPropagation();
        });
        grid.appendChild(card);
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