import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


const VueApp = createApp(App)
const start = () => {
  const app = document.createElement('div');
  const body = document.querySelector('body')
  body.append(app)
  return app
}

VueApp.use(ElementPlus).mount(start())



