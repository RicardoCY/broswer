import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'iview/dist/styles/iview.css';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import http from './utils/http'
import store from './store'
import './permisson.js'


Vue.config.productionTip = false

Vue.prototype.$http = http
Vue.use(ElementUI, { locale })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
