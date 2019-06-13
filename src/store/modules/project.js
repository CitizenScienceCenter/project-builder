import api from '../../api/project'
import builder from './project-builder'
import menu from './project-menu'

const errors = {
  GET_ALL_PROJECTS_LOADING_ERROR: 'Error during projects loading',
  GET_USER_PROJECTS_LOADING_ERROR: 'Error during user projects loading',
  GET_PROJECT_LOADING_ERROR: 'Error during project loading',
  POST_PROJECT_ERROR: 'Error during project creation',
  GET_PROJECT_USER_PROGRESS_LOADING_ERROR: 'Error during project user progress loading',
  GET_FEATURED_PROJECTS_LOADING_ERROR: 'Error during featured projects loading',
  GET_CATEGORIES_LOADING_ERROR: 'Error during categories loading',
  UPLOAD_PROJECT_AVATAR_ERROR: 'Error during project avatar upload',
  GET_PROJECT_UPDATE_OPTIONS_LOADING_ERROR: 'Error during project update options loading',
  GET_PUBLISH_PROJECT_OPTIONS_LOADING_ERROR: 'Error during project publish options loading',
  PUBLISH_PROJECT_ERROR: 'Error during project publishing',
  GET_PROJECT_STATS_LOADING_ERROR: 'Error during project stats loading',
  GET_PROJECT_RESULTS_LOADING_ERROR: 'Error during project results loading',
  UPLOAD_PROJECT_ERROR: 'Error during project update'
}

// global state for this module

const state = {
  // project lists
  categories: [], // all categories
  projects: [], // all projects
  featuredProjects: [],
  // userProjects: [],

  // selected project data
  selectedProject: {},
  selectedProjectUserProgress: { done: 0, total: 0 }, // logged user progress
  selectedProjectStats: {},
  selectedProjectResults: {},

  // form options
  projectCreationOptions: {},
  projectUpdateOptions: {},
  publishProjectOptions: {}
}

// filter methods on the state data
const getters = {
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

  /**
   * Gets all the available categories
   * @param commit
   * @return {Promise<T | never>}
   */
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

  /**
   * Gets all the published projects (draft projects are private)
   * @param commit
   * @return {Promise<T | boolean>}
   */
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

  /**
   * Gets all the featured projects
   * @param commit
   * @return {Promise<T | never>}
   */
  getFeaturedProjects ({ commit }) {
    return api.getFeaturedProjects().then(value => {
      commit('setFeaturedProjects', value.data.projects)
      return value.data
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_FEATURED_PROJECTS_LOADING_ERROR, content: reason
      }, { root: true })
    })
  },

  /**
   * Get a project by id
   * The json results will be different depending on if you are the owner or not
   * @param commit
   * @param state
   * @param rootState
   * @param id
   * @return {Promise<T | boolean>}
   */
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

  /**
   * Creates a project with the builder data
   * It will not import a project avatar
   * @param commit
   * @param state
   * @param rootState
   * @param builder
   * @return {Promise<T | boolean>}
   */
  createProject ({ commit, state, rootState }, builder) {
    return api.createProject(rootState.user.infos.api_key, builder).then(value => {
      commit('setSelectedProject', value.data)
      return state.selectedProject
    }).catch(reason => {
      const responseData = reason.response.data
      if ('status' in responseData && responseData.status === 'failed') {
        if (responseData.exception_cls && responseData.exception_cls === 'DBIntegrityError') {
          // specific error message when duplicated project name
          commit('notification/showError', {
            title: 'Error', content: 'Project name already taken'
          }, {root: true})
          return false
        }
      }
      commit('notification/showError', {
        title: errors.POST_PROJECT_ERROR, content: reason
      }, {root: true})
      return false
    })
  },

  /**
   * Returns the global user contribution progress for the given project
   * @param commit
   * @param project
   * @return {Promise<T | boolean>}
   */
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
  },

  /**
   * Gets a CSRF token to update the project with the updateProject method
   * @param commit
   * @param project
   * @return {Promise<T | boolean>}
   */
  getProjectUpdateOptions ({ commit }, project) {
    return api.getProjectUpdateOptions(project.short_name).then(value => {
      commit('setProjectUpdateOptions', value.data)
      return value.data
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_PROJECT_UPDATE_OPTIONS_LOADING_ERROR, content: reason
      }, { root: true })
      return false
    })
  },

  /**
   * Update the project data with the given form
   * @param commit
   * @param dispatch
   * @param state
   * @param project
   * @param form
   * @return {Promise<any> | Thenable<any> | * | PromiseLike<T | never> | Promise<T | never>}
   */
  updateProject ({ commit, dispatch, state }, { project, form }) {
    return dispatch('getProjectUpdateOptions', project).then(response => {
      if (response) {
        return api.updateProject(state.projectUpdateOptions.form.csrf, project.short_name, project.id, form).then(value => {
          // nothing to commit
          return value.data
        }).catch(reason => {
          commit('notification/showError', {
            title: errors.UPLOAD_PROJECT_ERROR, content: reason
          }, { root: true })
          return false
        })
      }
      return false
    })
  },

  /**
   * Allows to upload an avatar for the given project
   * The avatar image must be a base64 url
   * @param commit
   * @param state
   * @param dispatch
   * @param project
   * @param image
   * @return {Promise<any> | Thenable<any> | * | PromiseLike<T | never> | Promise<T | never>}
   */
  uploadAvatar ({ commit, state, dispatch }, { project, image }) {
    return dispatch('getProjectUpdateOptions', project).then(response => {
      if (response) {
        return api.uploadAvatar(state.projectUpdateOptions.upload_form.csrf, project.short_name, image).then(value => {
          // nothing to commit
          return value.data
        }).catch(reason => {
          commit('notification/showError', {
            title: errors.UPLOAD_PROJECT_AVATAR_ERROR, content: reason
          }, { root: true })
          return false
        })
      }
      return false
    })
  },

  /**
   * Gets a CSRF token to publish the project with the publishProject method
   * @param commit
   * @param project
   * @return {Promise<T | boolean>}
   */
  getPublishProjectOptions ({ commit }, project) {
    return api.getPublishProjectOptions(project.short_name).then(value => {
      commit('setPublishProjectOptions', value.data)
      return value.data
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_PUBLISH_PROJECT_OPTIONS_LOADING_ERROR, content: reason
      }, { root: true })
      return false
    })
  },

  /**
   * Publish the given project
   * @param commit
   * @param state
   * @param dispatch
   * @param project
   * @return {Promise<any> | Thenable<any> | * | PromiseLike<T | never> | Promise<T | never>}
   */
  publishProject ({ commit, state, dispatch }, project) {
    return dispatch('getPublishProjectOptions', project).then(response => {
      if (response) {
        return api.publishProject(state.publishProjectOptions.csrf, project.short_name).then(value => {
          commit('updateSelectedProject', { published: true })
          commit('notification/showSuccess', {
            title: 'Project published!', content: 'The project ' + project.name + ' is now public'
          }, { root: true })
          return value.data
        }).catch(reason => {
          commit('notification/showError', {
            title: errors.PUBLISH_PROJECT_ERROR, content: reason
          }, { root: true })
          return false
        })
      }
      return false
    })
  },

  /**
   * Returns all the stats about the given project
   * @param commit
   * @param project
   * @return {Promise<T | boolean>}
   */
  getStatistics ({ commit }, project) {
    return api.getStatistics(project.short_name).then(value => {
      commit('setSelectedProjectStats', value.data)
      return value.data
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_PROJECT_STATS_LOADING_ERROR, content: reason
      }, { root: true })
      return false
    })
  },

  /**
   * Returns all the task results about the given project
   * @param commit
   * @param project
   * @return {Promise<T | boolean>}
   */
  getResults ({ commit }, project) {
    return api.getResults(project.short_name).then(value => {
      commit('setSelectedProjectResults', value.data)
      return value.data
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_PROJECT_RESULTS_LOADING_ERROR, content: reason
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
  setSelectedProject (state, project) {
    state.selectedProject = project
  },
  updateSelectedProject (state, projectData) {
    state.selectedProject = { ...state.selectedProject, ...projectData }
  },
  setSelectedProjectUserProgress (state, progress) {
    state.selectedProjectUserProgress = progress
  },
  setProjectUpdateOptions (state, options) {
    state.projectUpdateOptions = options
  },
  setPublishProjectOptions (state, options) {
    state.publishProjectOptions = options
  },
  setSelectedProjectStats (state, stats) {
    state.selectedProjectStats = stats
  },
  setSelectedProjectResults (state, results) {
    state.selectedProjectResults = results
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
    builder,
    menu
  }
}
