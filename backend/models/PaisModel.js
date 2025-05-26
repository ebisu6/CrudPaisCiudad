// models/PaisesModel.js
import conexion from '../config/db.js';

// Obtener todos los países
export const ObtenerPaises = async () => {
    const [paises] = await conexion.query('SELECT * FROM pais');
    return paises;
};

// Crear un nuevo país
export const CrearPais = async (nombre, capital, continente) => {
    const [pais] = await conexion.query(
        'INSERT INTO pais(nombre, capital, continente) VALUES (?, ?, ?)',
        [nombre, capital, continente]
    );
    return { id_pais: pais.insertId, nombre, capital, continente };
};

// Actualizar un país por ID
export const ActualizarPais = async (id_pais, nombre, capital, continente) => {
    await conexion.query(
        'UPDATE pais SET nombre = ?, capital = ?, continente = ? WHERE id_pais = ?',
        [nombre, capital, continente, id_pais]
    );
    return { message: 'País actualizado correctamente' };
};

// Eliminar un país por ID
export const EliminarPais = async (id_pais) => {
    await conexion.query('DELETE FROM pais WHERE id_pais = ?', [id_pais]);
    return { message: 'País eliminado correctamente' };
};
