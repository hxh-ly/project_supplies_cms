import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css'
import './assets/css/index.less'
import { setupStore } from '@/store'
import registerGlobal from '@/global'
const app = createApp(App)
app.use(ElementPlus)
app.use(store)
setupStore()
// path: /user => user
app.use(router)
registerGlobal(app)
app.mount('#app')
