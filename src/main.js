import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'

// This loads your Cyberpunk styles and variables globally
import './assets/styles/main.css'

const app = createApp(App)

// These are the "Power Tools" for your specific requirements:
app.use(createPinia()) // For the World State
app.use(router) // For moving between Dashboard, Games, and Login

// This actually turns everything on
app.mount('#app')
