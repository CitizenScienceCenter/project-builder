import api from '../../api/project'

const errors = {
  GET_ALL_PROJECTS_LOADING_ERROR: 'Error during projects loading',
  GET_USER_PROJECTS_LOADING_ERROR: 'Error during user projects loading',
  GET_PROJECT_LOADING_ERROR: 'Error during project loading'
}

// global state for this module
const state = {
  userProjects: [],
  categories: [],
  categoriesProjects: {},
  topProjects: [],
  selectedProject: {}
}

// filter methods on the state data
const getters = {
  thumbnail: () => project => {
    return api.getProjectThumbnail(project)
  },
  getProjectsFor: state => category => {
    return state.categoriesProjects[category.short_name]
  },
  getFeaturedProjects: state => {
    // let featuredProjects = []
    return Object.values(state.categoriesProjects).reduce((previousValue, currentValue) => {
      let result = currentValue.filter(project => {
        return project.featured
      })
      return previousValue.concat(result)
    }, [])
  }
}

// async methods making mutations are placed here
const actions = {
  getAllPublishedProjects ({ commit }) {
    api.getAllProjects().then(value => {
      commit('setProjects', value.data)
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_ALL_PROJECTS_LOADING_ERROR, content: reason
      }, { root: true })
    })
  },
  getUserProjects ({ commit, rootState }) {
    api.getUserProjects(rootState.user.infos).then(value => {
      commit('setUserProjects', value.data)
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_USER_PROJECTS_LOADING_ERROR, content: reason
      }, { root: true })
    })
  },
  getProject ({ commit, state, rootState }, id) {
    return api.getProjectById(id).then(value => {
      commit('setSelectedProject', value.data)
      return state.selectedProject
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_PROJECT_LOADING_ERROR, content: reason
      }, { root: true })
    })
  }
}

// methods that change the state
const mutations = {
  setProjects (state, features) {
    state.categoriesProjects = features.categories_projects
    state.categories = features.categories
    state.topProjects = features.top_projects
  },
  setUserProjects (state, projects) {
    state.userProjects = projects
  },
  setSelectedProject (state, project) {
    state.selectedProject = project
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  errors
}
