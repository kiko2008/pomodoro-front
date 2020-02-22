import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import modals from './modules/modals'
import tasks from './modules/tasks'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {},
  getters : {},
  mutations: {},
  actions : {},
  
  modules: {
    modals, users, tasks
  }
})