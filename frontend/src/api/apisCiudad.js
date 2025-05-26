import axios from 'axios';

// URLs base
const API_CIUDADES = 'http://localhost:3000/api/ciudades';

// ----------- CIUDADES --------------
export const getCiudades = async () => {
    try {
        const response = await axios.get(API_CIUDADES);
        return response.data;
    } catch (error) {
        console.error('Error al obtener ciudades:', error);
        return [];
    }
};

export const agregarCiudad = async (ciudad) => {
    try {
        const response = await axios.post(API_CIUDADES, ciudad);
        return response.data;
    } catch (error) {
        console.error('Error al agregar ciudad:', error);
    }
};

export const actualizarCiudad = async (ciudad) => {
    try {
        const response = await axios.put(`${API_CIUDADES}/${ciudad.id_ciudad}`, ciudad);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar ciudad:', error);
    }
};

export const eliminarCiudad = async (id_ciudad) => {
    try {
        const response = await axios.delete(`${API_CIUDADES}/${id_ciudad}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar ciudad:', error);
    }
};
