const state = {
    showLogin: false,
    showLogup: false,
    showCreateTask: false,
    error: ''
}

const getters = {
    /*
    SHOWMODALLOGIN : state => {
        return state.showLogin
    },
    SHOWMODALLOGUP : state => {
        return state.showLogup
    },
    SHOWMODALCREATETASK : state => {
        return state.showCreateTask
    },
    GETMODALERROR : state => {
        return state.error
    } 
    */
}

const mutations = {
    setShowModalLogin: (state, payload) => {
        state.showLogin = payload
    },
    setShowModalLogup: (state, payload) => {
        state.showLogup = payload
    },
    setShowModalCreateTask: (state, payload) => {
        state.showCreateTask = payload
    },
    setModalError: (state, payload) => {
        state.error = payload
    }
}

export default {
    state,getters,mutations
}