import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/js/bootstrap.js"
import "bootstrap/dist/css/bootstrap.min.css"
import 'remixicon/fonts/remixicon.css'
import router from "./router";

import { createPinia } from 'pinia';
import piniaPersist from 'pinia-plugin-persist'
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const app = createApp(App);

// Object.keys(Remixicon).forEach(key => {
//     app.component(key, Remixicon[key]);
// });

const pinia = createPinia()
// pinia.use(piniaPluginPersistedstate)
pinia.use(piniaPersist)

app.use(pinia).use(router).mount('#app')

