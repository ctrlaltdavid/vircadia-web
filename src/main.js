import { createApp } from 'vue'
import App from './App.vue'

import Vircadia from "../vircadia-web-sdk/dist/Vircadia.js";


createApp(App).mount('#app')

Vircadia.helloWorld();
