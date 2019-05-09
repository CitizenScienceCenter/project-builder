import api from '../../api/project'

// global state for this module
const state = {
  all: []
}

// filter methods on the state data
const getters = {
  thumbnail: (state, getters, rootState) => (project) => {
    return 'https://pybossa.citizenscience.ch/uploads/user_' + project.owner_id + '/' + project.info.thumbnail
  }
}

// async methods making mutations are placed here
const actions = {
  all ({ commit }) {
    api.getProjects().then(value => {
      commit('setProjects', value.data)
    }).catch(reason => {
      const error = 'Error during project loading (' + reason.response.statusText + ')'
      commit('notification/showError', error, { root: true })
    })
  }
}

// methods that change the state
const mutations = {
  setProjects (state, projects) {
    state.all = projects
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
