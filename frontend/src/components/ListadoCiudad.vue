<template>
  <!-- Buscador -->
  <el-input
    v-model="busqueda"
    placeholder="Buscar por nombre ciudad ..."
    prefix-icon="Search"
    clearable
    style="width: 300px; margin-bottom: 20px; margin: 10px"
  />

  <!-- Tabla -->
  <el-table :data="ciudadesFiltradasPaginadas" style="width: 100%">
    <el-table-column prop="id_ciudad" label="ID" width="70" />
    <el-table-column prop="nombre" label="Nombre" />
    <el-table-column prop="poblacion" label="Población" />
    <el-table-column prop="region" label="Región" />
    <el-table-column prop="id_pais" label="ID País" />
    <el-table-column label="Acciones" width="200">
      <template #default="scope">
        <el-button type="success" icon="Edit" size="small" @click="mostrarFormulario(scope.row)">Editar</el-button>
        <el-button icon="Delete" size="small" type="danger" @click="confirmarEliminarCiudad(scope.row.id_ciudad)">Eliminar</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- Paginación -->
  <el-pagination
    v-if="ciudadesFiltradas.length > 0"
    background
    layout="prev, pager, next"
    :total="ciudadesFiltradas.length"
    :page-size="pageSize"
    :current-page="paginaActual"
    @current-change="paginaActual = $event"
    style="margin-top: 20px; text-align: right"
  />

  <!-- Diálogo con validación -->
  <el-dialog v-model="dialogVisible" title="Editar Ciudad">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
      <el-form-item label="Nombre" prop="nombre">
        <el-input v-model="form.nombre" />
      </el-form-item>
      <el-form-item label="Población" prop="poblacion">
        <el-input v-model="form.poblacion" />
      </el-form-item>
      <el-form-item label="Región" prop="region">
        <el-input v-model="form.region" />
      </el-form-item>
      <el-form-item label="ID País" prop="id_pais">
        <el-input v-model="form.id_pais" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">Cancelar</el-button>
      <el-button type="primary" @click="validarYActualizar">Actualizar</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { getCiudades, actualizarCiudad, eliminarCiudad as eliminarCiudadApi } from '../api/apisCiudad.js';
import { useToast } from 'vue-toastification';
import { ElMessage, ElMessageBox } from 'element-plus';

const ciudades = ref([]);
const busqueda = ref('');
const paginaActual = ref(1);
const pageSize = 5;

const dialogVisible = ref(false);
const toast = useToast();
const formRef = ref(null);

const form = reactive({
  id_ciudad: null,
  nombre: '',
  poblacion: '',
  region: '',
  id_pais: ''
});

// Validaciones
const soloTexto = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,100}$/;
const soloTextot = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{4,100}$/;
const soloNumero = /^[0-9]+$/;

const rules = {
  nombre: [
    { required: true, message: 'El nombre es obligatorio', trigger: 'blur' },
    { pattern: soloTexto, message: 'Solo letras y espacios (3–100 caracteres)', trigger: 'blur' }
  ],
  poblacion: [
    { required: true, message: 'La población es obligatoria', trigger: 'blur' },
    { pattern: soloNumero, message: 'Debe ser un número entero positivo', trigger: 'blur' }
  ],
  region: [
    { required: true, message: 'La región es obligatoria', trigger: 'blur' },
    { pattern: soloTextot, message: 'Solo letras y espacios (4–100 caracteres)', trigger: 'blur' }
  ],
  id_pais: [
    { required: true, message: 'El ID del país es obligatorio', trigger: 'blur' },
    { pattern: soloNumero, message: 'Debe ser un número entero positivo', trigger: 'blur' }
  ]
};

const validarYActualizar = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) {
      toast.warning("Corrige los errores del formulario", { position: "top-center" });
      return;
    }

    try {
      form.poblacion = Number(form.poblacion);
      form.id_pais = Number(form.id_pais);
      await actualizarCiudad(form);
      dialogVisible.value = false;
      toast.success("Ciudad actualizada correctamente");
      cargarCiudades();
    } catch (error) {
      console.error(error);
      toast.error("Error al actualizar ciudad");
    }
  });
};

const cargarCiudades = async () => {
  ciudades.value = await getCiudades();
};

const ciudadesFiltradas = computed(() =>
  ciudades.value.filter(c => c.nombre.toLowerCase().includes(busqueda.value.toLowerCase()))
);

const ciudadesFiltradasPaginadas = computed(() =>
  ciudadesFiltradas.value.slice((paginaActual.value - 1) * pageSize, paginaActual.value * pageSize)
);

const mostrarFormulario = (ciudad) => {
  Object.assign(form, ciudad);
  dialogVisible.value = true;
};

const confirmarEliminarCiudad = async (id_ciudad) => {
  ElMessageBox.confirm('¿Eliminar esta ciudad?', 'Advertencia', {
    confirmButtonText: 'Sí',
    cancelButtonText: 'No',
    type: 'warning'
  }).then(async () => {
    await eliminarCiudadApi(id_ciudad);
    toast.success("Ciudad eliminada");
    cargarCiudades();
  }).catch(() => ElMessage({ type: 'info', message: 'Eliminación cancelada' }));
};

onMounted(cargarCiudades);
defineExpose({ cargarCiudades });
</script>
