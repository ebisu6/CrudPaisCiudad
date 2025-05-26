// controllers/PaisController.js
import * as PaisModel from '../models/PaisModel.js';

const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,100}$/;
const capitalRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,100}$/;

export const obtenerPaises = async (req, res) => {
    try {
        const paises = await PaisModel.ObtenerPaises();
        res.json(paises);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const crearPais = async (req, res) => {
    try {
        const { nombre, capital, continente } = req.body;

        // Validaciones
        if (!nombreRegex.test(nombre)) {
            return res.status(400).json({ error: 'Nombre inválido. Solo letras, espacios y acentos (2-100 caracteres).' });
        }
        if (!capitalRegex.test(capital)) {
            return res.status(400).json({ error: 'Capital inválida. Solo letras, espacios y acentos (2-100 caracteres).' });
        }

        const pais = await PaisModel.CrearPais(nombre, capital, continente);
        res.status(201).json(pais);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const actualizarPais = async (req, res) => {
    try {
        const { id_pais } = req.params;
        const { nombre, capital, continente } = req.body;

        if (!nombreRegex.test(nombre)) {
            return res.status(400).json({ error: 'Nombre inválido. Solo letras, espacios y acentos (2-100 caracteres).' });
        }
        if (!capitalRegex.test(capital)) {
            return res.status(400).json({ error: 'Capital inválida. Solo letras, espacios y acentos (2-100 caracteres).' });
        }

        const pais = await PaisModel.ActualizarPais(id_pais, nombre, capital, continente);
        res.status(200).json(pais);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const eliminarPais = async (req, res) => {
    try {
        const { id_pais } = req.params;
        const pais = await PaisModel.EliminarPais(id_pais);
        res.status(200).json(pais);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
