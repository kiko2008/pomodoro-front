import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import Vuelidate from "vuelidate"
import { store } from './store'
import lineClamp from 'vue-line-clamp'


Vue.config.productionTip = false

Vue.use(Vuelidate);

Vue.use(lineClamp, {
  importCss: true
})

new Vue({  
  vuetify,
  store,
  lineClamp,
  render: h => h(App)
}).$mount('#app')
