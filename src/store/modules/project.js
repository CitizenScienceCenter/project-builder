import api from '../../api/project'

// global state for this module
const state = {
  all: []
}

// filter methods on the state data
const getters = {
  thumbnail: (state, getters, rootState) => (project) => {
    return api.getProjectThumbnail(project)
  }
}

// async methods making mutations are placed here
const actions = {
  getAll ({ commit }) {
    api.getProjects().then(value => {
      commit('setProjects', value.data)
    }).catch(reason => {
      commit('notification/showError', {
        title: 'Error during projects loading', content: reason
      }, { root: true })
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
