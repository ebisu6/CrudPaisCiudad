// routes/routes.js
import express from 'express';
import {
    obtenerPaises,
    crearPais,
    actualizarPais,
    eliminarPais
} from '../controllers/PaisController.js';

import {
    obtenerCiudades,
    crearCiudad,
    actualizarCiudad,
    eliminarCiudad
} from '../controllers/CiudadController.js';

const routes = express.Router();

// RUTAS PARA PAISES
routes.get('/paises', obtenerPaises);
routes.post('/paises', crearPais);
routes.put('/paises/:id_pais', actualizarPais);
routes.delete('/paises/:id_pais', eliminarPais);

// RUTAS PARA CIUDADES
routes.get('/ciudades', obtenerCiudades);
routes.post('/ciudades', crearCiudad);
routes.put('/ciudades/:id_ciudad', actualizarCiudad);
routes.delete('/ciudades/:id_ciudad', eliminarCiudad);

export default routes;
