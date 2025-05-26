<template>
  <!-- Buscador -->
  <el-input
    v-model="busqueda"
    placeholder="Buscar por nombre ciudad ..."
    prefix-icon="Search"
    clearable
    style="width: 300px; margin-bottom: 20px ; margin: 10px"
  />

  <!-- Tabla -->
  <el-table :data="ciudadesFiltradasPaginadas" style="width: 100%">
    <el-table-column prop="id_ciudad" label="ID" width="70" />
    <el-table-column prop="nombre" label="Nombre" />
    <el-table-column prop="poblacion" label="Población" />
    <el-table-column prop="region" label="Region" />
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

  <!-- Diálogo -->
  <el-dialog v-model="dialogVisible" title="Editar Ciudad">
    <el-form :model="form" label-width="120px">
      <el-form-item label="Nombre">
        <el-input v-model="form.nombre" />
      </el-form-item>
      <el-form-item label="Población">
        <el-input v-model="form.poblacion" />
      </el-form-item>
      <el-form-item label="Region">
        <el-input v-model="form.region" />
      </el-form-item>
      <el-form-item label="ID País">
        <el-input v-model="form.id_pais" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialogVisible = false">Cancelar</el-button>
      <el-button type="primary" @click="actualizar">Actualizar</el-button>
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

const form = reactive({
  id_ciudad: null,
  nombre: '',
  poblacion: '',
  region:'',
  id_pais: ''
});

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

const actualizar = async () => {
  form.poblacion = Number(form.poblacion);
  form.region = Number(form.region);
  form.id_pais = Number(form.id_pais);
  await actualizarCiudad(form);
  dialogVisible.value = false;
  toast.success("Ciudad actualizada correctamente");
  cargarCiudades();
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
