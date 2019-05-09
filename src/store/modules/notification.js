const state = {
  errorMessages: [],
  infoMessages: [],
  successMessages: []
}

// filter methods on the state data
const getters = {
  isDisplayed: (state) => (message) => {
    return state.errorMessages.find(value => {
      return value === message
    }) !== null
  }
}

// async methods making mutations are placed here
const actions = {

}

// methods that change the state
const mutations = {
  showError (state, message) {
    state.errorMessages.push(message)
  },
  closeError (state, message) {
    state.errorMessages = state.errorMessages.filter(value => {
      return value !== message
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
