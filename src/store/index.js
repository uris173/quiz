import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  actions: {
    getTests(context,payload){
      axios.get(`https://opentdb.com/api.php?amount=${payload}&difficulty=medium&type=multiple`).then(response => { context.commit('test',response.data) })
    }
  },
  state: {
    test: []
  },
  mutations: {
    test(state,payload){
      state.test = payload.results
    }
  },
  getters: {
    test(state){
      return state.test
    }
  },
  modules: {
  }
})
