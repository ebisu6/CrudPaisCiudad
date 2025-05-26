<template>
  <el-button type="primary" plain @click="dialogFormVisible = true">Agregar nuevo país</el-button>
  <el-dialog v-model="dialogFormVisible" title="Agregar país" width="500">
    <el-form :model="form" @submit.prevent="enviarPais()">
      <el-form-item label="Nombre:" :label-width="formLabelWidth">
        <el-input v-model="form.nombre" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Capital:" :label-width="formLabelWidth">
        <el-input v-model="form.capital" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Continente:" :label-width="formLabelWidth">
        <el-input v-model="form.continente" autocomplete="off" />
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
import { agregarPais } from '../api/apisPais.js';
import { useToast } from 'vue-toastification';

const dialogFormVisible = ref(false);
const formLabelWidth = '140px';
const emit = defineEmits(['pais-agregado']);
const toast = useToast();

const form = reactive({
  nombre: '',
  capital: '',
  continente: ''
});

const enviarPais = async () => {
  try {
    await agregarPais({ ...form });
    dialogFormVisible.value = false;
    emit('pais-agregado');
    toast.success("País agregado correctamente", { 
      position: "top-center",
      timeout: 3000 });
  } catch (error) {
    console.error(error);
    toast.error("Error al agregar país");
  }
};
</script>
