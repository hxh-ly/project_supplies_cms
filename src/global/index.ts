import { App } from 'vue'
import registerElement from './register-element'
import registerProperties from './register-properties'
export default function registerGlobal(app: App) {
  app.use(registerElement)
  app.use(registerProperties)
}
