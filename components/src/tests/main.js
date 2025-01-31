import { createApp } from "vue";
import { createPinia } from "pinia";
import App from './App.vue'
import SPSelect from "../components/select/select";
import SPNavigation from '../components/navigation/nav'
import SearchBox from '../components/input/searchbox'
import Table from '../components/table/table'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.component('sp-select', SPSelect)
app.component('sp-navigation', SPNavigation)
app.component('sp-searchbox', SearchBox)
app.component('sp-table', Table)
app.mount('#app')
