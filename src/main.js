import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import "bootstrap-icons/font/bootstrap-icons.json"

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

app.use(router)
app.use(pinia)

app.mount('#app')

import "bootstrap/dist/js/bootstrap.js"
import "bootstrap/dist/js/bootstrap.bundle.js"