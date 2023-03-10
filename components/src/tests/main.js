import { createApp } from "vue";
import { createPinia } from "pinia";
import App from './App.vue'
import SPSelect from "../components/select/select";
import SPNavigation from '../components/navigation/nav'
import SearchBox from '../components/input/searchbox'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.component('sp-select', SPSelect)
app.component('sp-navigation', SPNavigation)
app.component('sp-searchbox', SearchBox)
app.mount('#app')
