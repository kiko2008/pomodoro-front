import { ServiceFactory } from "../../services/ServiceFactory"
const TasksService = ServiceFactory.get("tasks")

const state = {
  task: null,
  taskSelected: null,
  listPendingTask: [],
  listEndingTask: []
}

const mutations = {
  setTask: ( state, payload ) => {
      state.task = payload
  },
  setListPendingTasks: ( state, payload ) => {
      state.listPendingTask = payload
  },
  setListEndingTasks: ( state, payload ) => {
      state.listEndingTask = payload
  },
  addPendingTask : ( state, payload ) => {
      state.listPendingTask.push(payload)
  },
  dropPendingTask : ( state, payload ) => {
      let removeTask = state.listPendingTask.map(function(item) { return item.id }).indexOf(payload.id)
      state.listPendingTask.splice(removeTask, 1)      
  },
  addEndingTask : ( state, payload ) => {
      state.listEndingTask.push(payload)
  },
  setTaskSelected: ( state, payload ) => {
      state.taskSelected = payload
  }
}

const actions = {

    createTask: async ( {commit}, task ) => {
        try{
            const { data } = await TasksService.createTask(
                task.userId, task.description
          )
          commit('addPendingTask', data)
        } catch (error) {
          commit('setModalError', error.response)
          console.log(error.response)   
        }
    },
    getListPendingTasks: async ( {commit}, user ) => {
        try{
          const { data } = await TasksService.geListTask(
            user.id, 'False'
          )
          commit('setListPendingTasks', data)
        } catch (error) {
          console.log(error.response)   
        }
    },
    getListEndingTasks: async ( {commit}, user ) => {
        try{
          const { data } = await TasksService.geListTask(
            user.id, 'True'
          )
          commit('setListEndingTasks', data)
        } catch (error) {
          console.log(error.response)   
        }
    },
    persistTask: async ( {commit}, task ) => {
        try{
            await TasksService.updateTask(task)        
        } catch (error) {
          commit('setModalError', error.response)
          console.log(error.response)   
        }    
    },
}

export default {
  state, mutations, actions
}