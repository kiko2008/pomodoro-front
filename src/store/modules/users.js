import { ServiceFactory } from "../../services/ServiceFactory"
const UsersService = ServiceFactory.get("users")

const state = {
    user: null
}

const getters = {
   /*
    GETUSER : state => {
        return state.user
    }
    */
}

const mutations = {
    setUser: (state, payload) => {
        state.user = payload
    }
}

const actions = {
    login: async ({commit, dispatch}, user) => {
        try{
          const { data } = await UsersService.login(
            user.userName, user.password 
          )        
          commit('setUser', data)
          commit('setModalError', '')
          commit('setShowModalLogin', false)
          localStorage.setItem(`pomodoro-timer-user`, JSON.stringify(data))
          dispatch('getListPendingTasks', data)
          dispatch('getListEndingTasks',data)          
        } catch (error) {
          commit('setModalError', error.response.data.msgError[0])
          console.log(error.response.data.msgError)   
        }
    },
    logup: async ({commit}, user) => {
        try{
            const { data } = await UsersService.createUser(
            user.firstName, user.lastName, user.email, user.userName, user.password 
            )        
            commit('setUser', data)
            commit('setModalError', '')
            commit('setShowModalLogup', false)
            localStorage.setItem(`pomodoro-timer-user`, JSON.stringify(data))
        } catch (error) {
            commit('setModalError', error.response.data.username[0])
            console.log(error.response.data.msgError)   
        }
    },
    logout: async ({commit}) => {
        try{
            await UsersService.logout()
            commit('setUser', null)
            localStorage.setItem(`pomodoro-timer-user`, null)
            commit('setListPendingTasks', [])
            commit('setListEndingTasks', [])
        } catch (error) {        
            console.log(error.response.data.msgError)   
        }
    }
}

export default {
  state,getters,mutations,actions
}