import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.sass' // global css
import App from './App'
import router from './router'
import store from './store'
import i18n from './lang' // Internationalization
import './icons' // icon
import './errorLog'// error log
import './permission' // permission control
import http from './xhr/xhr.js'
import postMessages from './utils/postMessage'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import * as filters from './filters' // global filters
import DB from '@/utils/db/db'
import EventBus from './eventBus'

require('promise.prototype.finally').shim()
require('es6-promise').polyfill()

Vue.use(EventBus)
Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

Vue.prototype.$http = http
Vue.prototype.postMessages = postMessages
Vue.prototype.db = DB

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.config.debug = true
Vue.config.devtools = true

const app = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
window.App = app
