import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/js/bootstrap.js"
import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css";
import router from "./router";

import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist'
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


const pinia = createPinia()
// pinia.use(piniaPluginPersistedstate)
pinia.use(piniaPersist)

createApp(App).use(pinia).use(router).mount('#app')

