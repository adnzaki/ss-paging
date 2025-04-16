import DefaultTheme from 'vitepress/theme'
import { createPinia } from 'pinia'
import './sspaging.css'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.use(createPinia())
  }
}
