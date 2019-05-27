import api from '../../api/project'
import builder from './project-builder'

const errors = {
  GET_ALL_PROJECTS_LOADING_ERROR: 'Error during projects loading',
  GET_USER_PROJECTS_LOADING_ERROR: 'Error during user projects loading',
  GET_PROJECT_LOADING_ERROR: 'Error during project loading',
  POST_PROJECT_ERROR: 'Error during project creation',
  GET_PROJECT_USER_PROGRESS_LOADING_ERROR: 'Error during project user progress loading',
  GET_FEATURED_PROJECTS_LOADING_ERROR: 'Error during featured projects loading',
  GET_CATEGORIES_LOADING_ERROR: 'Error during categories loading'
}

// global state for this module

const state = {
  categories: [],
  projects: [],

  featuredProjects: [],

  selectedProject: {},
  selectedProjectUserProgress: { done: 0, total: 0 },

  projectCreationOptions: {}
}

// filter methods on the state data
const getters = {
  // thumbnail: () => project => {
  //   return api.getProjectThumbnail(project)
  // },
  getProjectsWithCategory: state => ({id}) => {
    return state.projects.filter(project => {
      return project.category_id === id
    })
  },
  getUserProgressInPercent: state => {
    return state.selectedProjectUserProgress.done / state.selectedProjectUserProgress.total * 100
  }
}

// async methods making mutations are placed here
const actions = {

  // getUserProjects ({ commit, rootState }) {
  //   api.getUserProjects(rootState.user.infos).then(value => {
  //     commit('setUserProjects', value.data)
  //   }).catch(reason => {
  //     commit('notification/showError', {
  //       title: errors.GET_USER_PROJECTS_LOADING_ERROR, content: reason
  //     }, { root: true })
  //   })
  // },

  getCategories ({ commit }) {
    return api.getCategories().then(value => {
      commit('setCategories', value.data)
      return value.data
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_FEATURED_PROJECTS_LOADING_ERROR, content: reason
      }, { root: true })
    })
  },

  getAllProjects ({ commit }) {
    return api.getAllProjects().then(value => {
      commit('setProjects', value.data)
      return value.data
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_ALL_PROJECTS_LOADING_ERROR, content: reason
      }, { root: true })
      return false
    })
  },

  getFeaturedProjects ({ commit }) {
    api.getFeaturedProjects().then(value => {
      commit('setFeaturedProjects', value.data.projects)
      return value.data
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_FEATURED_PROJECTS_LOADING_ERROR, content: reason
      }, { root: true })
    })
  },

  getProject ({ commit, state, rootState }, id) {
    return api.getProjectById(id, rootState.user.infos.api_key).then(value => {
      commit('setSelectedProject', value.data)
      return state.selectedProject
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_PROJECT_LOADING_ERROR, content: reason
      }, { root: true })
      return false
    })
  },

  createProject ({ commit, state, rootState }, builder) {
    return api.createProject(rootState.user.infos.api_key, builder).then(value => {
      commit('setSelectedProject', value.data)
      return state.selectedProject
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.POST_PROJECT_ERROR, content: reason
      }, { root: true })
      return false
    })
  },
  getProjectCreationOptions ({ commit, state, rootState }) {
    return api.getProjectCreationOptions().then(value => {
      commit.setProjectCreationOptions(value.data)
      console.log(value.data)
    })
  },

  getUserProgress ({ commit }, project) {
    return api.getProjectUserProgress(project.id).then(value => {
      commit('setSelectedProjectUserProgress', value.data)
      return value.data
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_PROJECT_USER_PROGRESS_LOADING_ERROR, content: reason
      }, { root: true })
      return false
    })
  }
}

// methods that change the state
const mutations = {
  setCategories (state, categories) {
    state.categories = categories
  },
  setProjects (state, projects) {
    state.projects = projects
  },
  setFeaturedProjects (state, projects) {
    state.featuredProjects = projects
  },
  // setUserProjects (state, projects) {
  //   state.userProjects = projects
  // },
  setProjectCreationOptions (state, options) {
    state.projectCreationOptions = options
  },
  setSelectedProject (state, project) {
    state.selectedProject = project
  },
  setSelectedProjectUserProgress (state, progress) {
    state.selectedProjectUserProgress = progress
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  errors,
  modules: {
    builder
  }
}
