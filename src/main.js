import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index.js'
import toast from 'components/common/toast'
import fastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  loading: require('assets/img/common/placeholder.png')
})
fastClick.attach(document.body);
Vue.use(toast)
Vue.config.productionTip = false

Vue.prototype.$bus = new Vue();





new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
