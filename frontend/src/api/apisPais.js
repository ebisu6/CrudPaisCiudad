import axios from 'axios';

// URLs base
const API_PAISES = 'http://localhost:3000/api/paises';

// ----------- PAISES --------------
export const getPaises = async () => {
    try {
        const response = await axios.get(API_PAISES);
        return response.data;
    } catch (error) {
        console.error('Error al obtener países:', error);
        return [];
    }
};

export const agregarPais = async (pais) => {
    try {
        const response = await axios.post(API_PAISES, pais);
        return response.data;
    } catch (error) {
        console.error('Error al agregar país:', error);
    }
};

export const actualizarPais = async (pais) => {
    try {
        const response = await axios.put(`${API_PAISES}/${pais.id_pais}`, pais);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar país:', error);
    }
};

export const eliminarPais = async (id_pais) => {
    try {
        const response = await axios.delete(`${API_PAISES}/${id_pais}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar país:', error);
    }
};


