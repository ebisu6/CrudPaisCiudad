<template>
  <el-button type="primary" plain @click="dialogFormVisible = true">Agregar nuevo país</el-button>
  <el-dialog v-model="dialogFormVisible" title="Agregar país" width="500">
    <el-form :model="form" :rules="rules" ref="formRef" @submit.prevent="enviarPais">
      <el-form-item label="Nombre:" prop="nombre" :label-width="formLabelWidth">
        <el-input v-model="form.nombre" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Capital:" prop="capital" :label-width="formLabelWidth">
        <el-input v-model="form.capital" autocomplete="off" />
      </el-form-item>
      <el-form-item label="Continente:" prop="continente" :label-width="formLabelWidth">
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
const formRef = ref(null);

const form = reactive({
  nombre: '',
  capital: '',
  continente: ''
});

// Expresión regular: solo letras (mayúsculas, minúsculas), espacios y acentos, entre 2 y 100 caracteres
const regexTexto = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,100}$/;

const rules = {
  nombre: [
    { required: true, message: 'El nombre es obligatorio', trigger: 'blur' },
    { pattern: regexTexto, message: 'Solo letras, espacios y acentos (2–100 caracteres)', trigger: 'blur' }
  ],
  capital: [
    { required: true, message: 'La capital es obligatoria', trigger: 'blur' },
    { pattern: regexTexto, message: 'Solo letras, espacios y acentos (2–100 caracteres)', trigger: 'blur' }
  ],
  continente: [
    { required: true, message: 'El continente es obligatorio', trigger: 'blur' }
  ]
};

const enviarPais = () => {
  formRef.value.validate(async (valid) => {
    if (!valid) {
      toast.warning("Corrige los errores del formulario.", { position: "top-center" });
      return;
    }

    try {
      await agregarPais({ ...form });
      dialogFormVisible.value = false;
      emit('pais-agregado');
      toast.success("País agregado correctamente", { 
        position: "top-center",
        timeout: 3000 
      });
    } catch (error) {
      console.error(error);
      toast.error("Error al agregar país");
    }
  });
};
</script>
