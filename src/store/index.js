import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import modals from './modules/modals'
import tasks from './modules/tasks'
import timer from './modules/timer'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    modals, users, tasks, timer
  }
})