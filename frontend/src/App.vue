<template>
  <el-container style="min-height: 100vh">
    <!-- ENCABEZADO -->
    <el-header style="background-color: #409EFF; color: white; font-size: 22px; text-align: center;">
      Gestión de Países y Ciudades
    </el-header>

    <el-main>
      <el-tabs v-model="activeTab" type="card" tab-position="top" class="custom-tabs">
        <el-tab-pane label="PAISES" name="paises">
          <AgregarPais @pais-agregado="actualizarPaises" />
          <ListadoPais ref="refPais" />
        </el-tab-pane>

        <el-tab-pane label="🏙️ CIUDADES" name="ciudades">
          <AgregarCiudad @ciudad-agregada="actualizarCiudades" />
          <ListadoCiudad ref="refCiudad" />
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref } from 'vue';

// Componentes
import AgregarPais from './components/AgregarPaisModal.vue';
import ListadoPais from './components/ListadoPais.vue';
import AgregarCiudad from './components/AgregarCiudadModal.vue';
import ListadoCiudad from './components/ListadoCiudad.vue';

const activeTab = ref('paises');

const refPais = ref(null);
const refCiudad = ref(null);

// Métodos para recargar datos
const actualizarPaises = () => {
  refPais.value?.cargarPaises();
};

const actualizarCiudades = () => {
  refCiudad.value?.cargarCiudades();
};
</script>

<style scoped>
.custom-tabs {
  margin-top: 20px;
}
</style>
