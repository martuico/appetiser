import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import events from './modules/events'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    events
  },
  getters
})

export default store
