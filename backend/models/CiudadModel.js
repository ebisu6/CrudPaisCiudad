// models/CiudadModel.js
import conexion from '../config/db.js';

// Obtener todas las ciudades
export const ObtenerCiudades = async () => {
    const [ciudades] = await conexion.query('SELECT * FROM ciudad');
    return ciudades;
};

// Crear una nueva ciudad
export const CrearCiudad = async (nombre, poblacion, region, id_pais) => {
    const [ciudad] = await conexion.query(
        'INSERT INTO ciudad(nombre, poblacion, region, id_pais) VALUES (?, ?, ?, ?)',
        [nombre, poblacion, region, id_pais]
    );
    return { id: ciudad.insertId, nombre, poblacion, region, id_pais };
};

// Actualizar ciudad
export const ActualizarCiudad = async (id_ciudad, nombre, poblacion, region, id_pais) => {
    await conexion.query(
        'UPDATE ciudad SET nombre = ?, poblacion = ?, region = ?, id_pais = ? WHERE id_ciudad = ?',
        [nombre, poblacion, region, id_pais, id_ciudad]
    );
    return { message: 'Ciudad actualizada correctamente' };
};

// Eliminar ciudad
export const EliminarCiudad = async (id_ciudad) => {
    await conexion.query('DELETE FROM ciudad WHERE id_ciudad = ?', [id_ciudad]);
    return { message: 'Ciudad eliminada correctamente' };
};
