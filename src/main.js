// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/store'
import EventBus from './plugins/bus'
import VTooltip from 'v-tooltip'
import VueMask from 'v-mask'

window.$ = window.jQuery = require('jquery')

require('bootstrap')


import 'bootstrap/dist/css/bootstrap.css' // << import CSS
import 'font-awesome/css/font-awesome.css' // << import CSS

var http = axios.create({
	baseURL: 'http://projetoparking.changeip.org:8012/api/v1.0',
	headers:{
		'Authorization': 'Basic Y2ludHJhLjcwQGdtYWlsLmNvbTphWlMwYUpJMzZv', 
	}
})


Vue.use(VueMask)
Vue.use(VTooltip)
Vue.use(EventBus)
Vue.prototype.$http = http
Vue.prototype.$axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
