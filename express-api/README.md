# Express API - Pokemons

API mínima en Express que expone endpoints para consultar y crear Pokémons en una base PostgreSQL.

Endpoints

- GET  /pokemons           -> lista (opcional `?type=fire&limit=6`)
- GET  /pokemons/:id       -> detalle por id
- POST /pokemons           -> crear pokemon

Quick start (Windows PowerShell)

1. Ir a la carpeta del proyecto:

```powershell
cd "c:\Users\Branco\Documents\GitHub\taller-webmovil\express-api"
```

2. Instalar dependencias:

```powershell
npm install
```

3. Crear la tabla en Postgres (usa `pgAdmin` o `psql`) ejecutando `db_init.sql`.

4. Levantar la API (temporalmente usando variables de entorno en PowerShell):

```powershell
$env:DATABASE_URL = "postgres://dev:devpass@localhost:5432/pokedb"
$env:PORT = "3001"
npm start
```

5. Probar:
- `GET http://localhost:3001/pokemons`
- `GET http://localhost:3001/pokemons?type=electric&limit=6`
- `POST http://localhost:3001/pokemons` con body JSON

Notes
- Esta API asume que la base de datos es Postgres y que la tabla `pokemons` existe.
- Para producción, configura variables de entorno permanentemente y gestiona migraciones en lugar de `db_init.sql`.
- Si quieres, puedo agregar `docker-compose` para levantar Postgres + Express automáticamente.

Seed de ejemplo
----------------
Para insertar datos de ejemplo se incluyó el script `seed.js` y un comando npm `npm run seed`.

1) Crea un archivo `.env` en la carpeta `express-api` con la conexión correcta (ejemplo usando tu contenedor):

```
DATABASE_URL=postgres://postgres:1234@localhost:5444/postgres
PORT=3002
```

2) Desde la carpeta `express-api` instala dependencias (si no lo hiciste):

```powershell
npm install
```

3) Ejecuta el seed:

```powershell
npm run seed
```

El script imprimirá en consola los registros insertados. Si la conexión falla, revisa que `DATABASE_URL` apunte al host/puerto correctos y que el usuario/contraseña sean válidos.

Verificación rápida
------------------
- Con la API en ejecución (ej. `npm start`) prueba:

```powershell
curl http://localhost:3002/pokemons
```

- Para ver la tabla desde el contenedor Postgres (opcional):

```powershell
docker exec -it mi_servidor_poke psql -U postgres -d postgres -c "SELECT * FROM pokemons LIMIT 5;"
```

Nota sobre ejecución remota
---------------------------
No puedo ejecutar comandos directamente en tu máquina desde aquí. Puedo editar el repositorio (como ya hice) y darte los comandos exactos; por favor ejecuta `npm run seed` en tu terminal y pega aquí la salida si hay algún error. Si quieres, te ayudo a interpretar los errores.
