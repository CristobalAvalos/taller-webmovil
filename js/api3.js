const apiUrl = 'https://jsonplaceholder.typicode.com';

async function cargarPerfiles() {
    const grid = document.querySelector('.grid');
    const res = await fetch(`${apiUrl}/users`);
    const users = await res.json();

    users.forEach(user => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded shadow p-4 m-2';
        card.innerHTML = `
            <h2 class="font-bold text-lg mb-2">${user.name}</h2>
            <p class="text-gray-700">${user.email}</p>
            <p class="text-gray-500">${user.username}</p>
            <p class="text-gray-400">${user.website}</p>
        `;
        grid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', cargarPerfiles);