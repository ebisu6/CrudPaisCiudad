// controllers/CiudadController.js
import * as CiudadModel from '../models/CiudadModel.js';

const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,100}$/;
const regionRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{4,100}$/;

export const obtenerCiudades = async (req, res) => {
    try {
        const ciudades = await CiudadModel.ObtenerCiudades();
        res.json(ciudades);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const crearCiudad = async (req, res) => {
    try {
        const { nombre, poblacion, region, id_pais } = req.body;

        // Validaciones
        if (!nombreRegex.test(nombre)) {
            return res.status(400).json({ error: 'Nombre inválido. Solo letras, espacios y acentos (3-100 caracteres).' });
        }
        if (!regionRegex.test(region)) {
            return res.status(400).json({ error: 'Región inválida. Solo letras, espacios y acentos (4-100 caracteres).' });
        }
        if (isNaN(poblacion) || poblacion < 0) {
            return res.status(400).json({ error: 'Población debe ser un número entero positivo.' });
        }

        const ciudad = await CiudadModel.CrearCiudad(nombre, poblacion, region, id_pais);
        res.status(201).json(ciudad);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const actualizarCiudad = async (req, res) => {
    try {
        const { id_ciudad } = req.params;
        const { nombre, poblacion, region, id_pais } = req.body;

        if (!nombreRegex.test(nombre)) {
            return res.status(400).json({ error: 'Nombre inválido. Solo letras, espacios y acentos (3-100 caracteres).' });
        }
        if (!regionRegex.test(region)) {
            return res.status(400).json({ error: 'Región inválida. Solo letras, espacios y acentos (4-100 caracteres).' });
        }
        if (isNaN(poblacion) || poblacion < 0) {
            return res.status(400).json({ error: 'Población debe ser un número entero positivo.' });
        }

        const ciudad = await CiudadModel.ActualizarCiudad(id_ciudad, nombre, poblacion, region, id_pais);
        res.status(200).json(ciudad);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const eliminarCiudad = async (req, res) => {
    try {
        const { id_ciudad } = req.params;
        const ciudad = await CiudadModel.EliminarCiudad(id_ciudad);
        res.status(200).json(ciudad);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
