<template>
  <el-button type="primary" plain @click="dialogFormVisible = true">Agregar nueva ciudad</el-button>
  <el-dialog v-model="dialogFormVisible" title="Agregar ciudad" width="500">
    <el-form :model="form" :rules="rules" ref="formRef" @submit.prevent="enviarCiudad">
      <el-form-item label="Nombre:" prop="nombre" :label-width="formLabelWidth">
        <el-input v-model="form.nombre" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Población:" prop="poblacion" :label-width="formLabelWidth">
        <el-input v-model="form.poblacion" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Región:" prop="region" :label-width="formLabelWidth">
        <el-input v-model="form.region" autocomplete="off" />
      </el-form-item>
      <el-form-item label="ID del País:" prop="id_pais" :label-width="formLabelWidth">
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
const formRef = ref(null);

// Expresiones regulares para validar texto
const regexTexto = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,100}$/;
const regexTextot = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{4,100}$/;

const form = reactive({
  nombre: '',
  poblacion: '',
  region: '',
  id_pais: ''
});

const rules = {
  nombre: [
    { required: true, message: 'El nombre es obligatorio', trigger: 'blur' },
    { pattern: regexTexto, message: 'Solo letras, espacios y acentos (3-100 caracteres)', trigger: 'blur' }
  ],
  region: [
    { required: true, message: 'La región es obligatoria', trigger: 'blur' },
    { pattern: regexTextot, message: 'Solo letras, espacios y acentos (4-100 caracteres)', trigger: 'blur' }
  ],
  poblacion: [
    { required: true, message: 'La población es obligatoria', trigger: 'blur' },
    { pattern: /^[0-9]+$/, message: 'La población debe ser un número', trigger: 'blur' }
  ],
  id_pais: [
    { required: true, message: 'El ID del país es obligatorio', trigger: 'blur' },
    { pattern: /^[0-9]+$/, message: 'Debe ser un número válido', trigger: 'blur' }
  ]
};

const enviarCiudad = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) {
      toast.warning("Corrige los errores del formulario.", { position: "top-center" });
      return;
    }

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
  });
};
</script>
