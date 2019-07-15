import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import Notifications from 'vue-notification'

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })

  Vue.use(Notifications)