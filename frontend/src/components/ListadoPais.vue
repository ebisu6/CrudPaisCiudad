<template>
  <!-- Buscador -->
  <el-input
    v-model="busqueda"
    placeholder="Buscar por nombre pais ..."
    prefix-icon="Search"
    clearable
    style="width: 300px; margin-bottom: 40px; margin: 10px"
  />

  <!-- Tabla -->
  <el-table :data="paisesFiltradosPaginados" style="width: 100%">
    <el-table-column prop="id_pais" label="ID" width="70" />
    <el-table-column prop="nombre" label="Nombre" />
    <el-table-column prop="capital" label="Capital" />
    <el-table-column prop="continente" label="Continente" />
    <el-table-column label="Acciones" width="200">
      <template #default="scope">
        <el-button icon="Edit" size="small" type="success" @click="mostrarFormulario(scope.row)">Editar</el-button>
        <el-button icon="Delete" size="small" type="danger" @click="confirmarEliminarPais(scope.row.id_pais)">Eliminar</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- Paginación -->
  <el-pagination
    v-if="paisesFiltrados.length > 0"
    background
    layout="prev, pager, next"
    :total="paisesFiltrados.length"
    :page-size="pageSize"
    :current-page="paginaActual"
    @current-change="paginaActual = $event"
    style="margin-top: 20px; text-align: right"
  />

  <!-- Diálogo -->
  <el-dialog v-model="dialogVisible" title="Editar País">
    <el-form :model="form" label-width="120px">
      <el-form-item label="Nombre">
        <el-input v-model="form.nombre" />
      </el-form-item>
      <el-form-item label="Capital">
        <el-input v-model="form.capital" />
      </el-form-item>
      <el-form-item label="Continente">
        <el-input v-model="form.continente" />
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
import { getPaises, actualizarPais, eliminarPais} from '../api/apisPais.js';
import { useToast } from 'vue-toastification';
import { ElMessage, ElMessageBox } from 'element-plus';

const paises = ref([]);
const busqueda = ref('');
const paginaActual = ref(1);
const pageSize = 5;

const dialogVisible = ref(false);
const toast = useToast();
const labelWidth = '120px';

const form = reactive({
  id_pais: null,
  nombre: '',
  capital: '',
  continente: ''
});

const cargarPaises = async () => {
  paises.value = await getPaises();
};

const paisesFiltrados = computed(() =>
  paises.value.filter(p => p.nombre.toLowerCase().includes(busqueda.value.toLowerCase()))
);

const paisesFiltradosPaginados = computed(() =>
  paisesFiltrados.value.slice((paginaActual.value - 1) * pageSize, paginaActual.value * pageSize)
);

const mostrarFormulario = (pais) => {
  Object.assign(form, pais);
  dialogVisible.value = true;
};

const actualizar = async () => {
  await actualizarPais(form);
  dialogVisible.value = false;
  toast.success("País actualizado correctamente");
  cargarPaises();
};

const confirmarEliminarPais = async (id_pais) => {
  ElMessageBox.confirm('¿Eliminar este país?', 'Advertencia', {
    confirmButtonText: 'Sí',
    cancelButtonText: 'No',
    type: 'warning'
  }).then(async () => {
    await eliminarPais(id_pais);
    toast.success("País eliminado");
    cargarPaises();
  }).catch(() => ElMessage({ type: 'info', message: 'Eliminación cancelada' }));
};

onMounted(cargarPaises);
defineExpose({ cargarPaises });
</script>
