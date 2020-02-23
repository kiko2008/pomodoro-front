const state = {
    showLogin: false,
    showLogup: false,
    showCreateTask: false,
    error: ''
}

const mutations = {
    setShowModalLogin: ( state, payload ) => {
        state.showLogin = payload
    },
    setShowModalLogup: ( state, payload ) => {
        state.showLogup = payload
    },
    setShowModalCreateTask: ( state, payload ) => {
        state.showCreateTask = payload
    },
    setModalError: ( state, payload ) => {
        state.error = payload
    }
}

export default {
    state, mutations
}