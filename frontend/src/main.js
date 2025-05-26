import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);

// Registrar plugins antes de montar
app.use(ElementPlus);
app.use(Toast);

// Montar la aplicación
app.mount('#app');
