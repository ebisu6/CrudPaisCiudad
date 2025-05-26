import express from 'express';
import cors from 'cors';
import rutas from './routes/routes.js'; // Este archivo maneja ambas rutas: /paises y /ciudades

const app = express();
app.use(cors());
app.use(express.json());

// Prefijo de API para todas las rutas
app.use('/api', rutas);
// las rutas quedaran como:
// GET     /api/paises
// POST    /api/paises
// PUT     /api/paises/:id
// DELETE  /api/paises/:id
// Y lo mismo para /api/ciudades

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
