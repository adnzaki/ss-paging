import { createApp } from "vue";
import { createPinia } from "pinia";
import App from './App.vue'
import SPSelect from "../components/select/select";
import SPNavigation from '../components/navigation/nav'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.component('sp-select', SPSelect)
app.component('sp-navigation', SPNavigation)
app.mount('#app')
