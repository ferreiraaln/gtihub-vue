require('./bootstrap')
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import BaseTemplate from './layouts/baseTemplate'

import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './routes'
import store from './store'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueAxios, axios);

new Vue({
  render: h => h(BaseTemplate),
  router,
  store
}).$mount('#app')

