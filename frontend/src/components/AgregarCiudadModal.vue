<template>
  <el-button type="primary" plain @click="dialogFormVisible = true">Agregar nueva ciudad</el-button>
  <el-dialog v-model="dialogFormVisible" title="Agregar ciudad" width="500">
    <el-form :model="form" @submit.prevent="enviarCiudad()">
      <el-form-item label="Nombre:" :label-width="formLabelWidth">
        <el-input v-model="form.nombre" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Población:" :label-width="formLabelWidth">
        <el-input v-model="form.poblacion" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Region:" :label-width="formLabelWidth">
        <el-input v-model="form.region" autocomplete="off" />
      </el-form-item>
      <el-form-item label="ID del País:" :label-width="formLabelWidth">
        <el-input v-model="form.id_pais" autocomplete="off" />
      </el-form-item>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancelar</el-button>
        <el-button type="primary" native-type="submit">Confirmar</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { agregarCiudad } from '../api/apisCiudad.js';
import { useToast } from 'vue-toastification';

const dialogFormVisible = ref(false);
const formLabelWidth = '130px';
const emit = defineEmits(['ciudad-agregada']);
const toast = useToast();

const form = reactive({
  nombre: '',
  poblacion: '',
  id_pais: ''
});

const enviarCiudad = async () => {
  try {
    const ciudadData = {
      ...form,
      poblacion: Number(form.poblacion),
      id_pais: Number(form.id_pais)
    };
    await agregarCiudad(ciudadData);
    dialogFormVisible.value = false;
    emit('ciudad-agregada');
    toast.success("Ciudad agregada correctamente", { position: "top-center", timeout: 3000 });
  } catch (error) {
    console.error(error);
    toast.error("Error al agregar ciudad");
  }
};
</script>
