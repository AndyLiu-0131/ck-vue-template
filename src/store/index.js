import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    openSider: true
  },
  mutations: {
    setOpenSider(state, newVal) {
      state.openSider = newVal
    }
  },
  getters: {
    getOpenSider(state) {
      return state.openSider
    }
  }
})

export default store
