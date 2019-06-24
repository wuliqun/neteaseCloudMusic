// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@/router'
import store from '@/store'
import './style/reset.css'
import messagePlugin from '@/plugin'

Vue.use(messagePlugin);
// import Tip from './plugins/tip/main'
// import Message from './plugin'
// Vue.use(Message);
Vue.config.productionTip = false

window.vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
