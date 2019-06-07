import api from '@/api/task-importer'

const errors = {
  GET_AMAZON_S3_IMPORTER_OPTIONS_LOADING_ERROR: 'Error when loading amazon s3 options',
  POST_AMAZON_S3_TASKS_ERROR: 'Error when importing amazon s3 tasks',
  GET_GOOGLE_DOCS_IMPORTER_OPTIONS_LOADING_ERROR: 'Error when loading google docs importer options',
  POST_GOOGLE_DOCS_TASKS_ERROR: 'Error when importing google docs tasks',
  GET_LOCAL_CSV_IMPORTER_OPTIONS_LOADING_ERROR: 'Error when loading local csv importer options',
  POST_CSV_FILE_TASKS_ERROR: 'Error when importing csv file tasks',
  GET_ONLINE_CSV_IMPORTER_OPTIONS_LOADING_ERROR: 'Error when loading online csv importer options',
  POST_CSV_TASKS_ERROR: 'Error when importing csv tasks'
}

const state = {
  isGoogleDocImporterVisible: false,
  isLocalCsvImporterVisible: false,
  isOnlineCsvImporterVisible: false,
  isAmazonS3ImporterVisible: false,

  amazonS3TasksImportationOptions: {},
  googleDocsTasksImportationOptions: {},
  localCsvTasksImportationOptions: {},
  onlineCsvTasksImportationOptions: {}
}

// filter methods on the state data
const getters = {

}

// async methods making mutations are placed here
const actions = {
  /**
   * Gets the CSRF token for the importAmazonS3Tasks method
   * @param commit
   * @param project
   * @return {Promise<T | boolean>}
   */
  getAmazonS3TasksImportationOptions ({ commit }, project) {
    return api.getAmazonS3TasksImportationOptions(project.short_name).then(value => {
      commit('setAmazonS3TasksImportationOptions', value.data)
      return value.data
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_AMAZON_S3_IMPORTER_OPTIONS_LOADING_ERROR, content: reason
      }, { root: true })
      return false
    })
  },

  /**
   * Imports bucket files as tasks for the given project
   * @param commit
   * @param state
   * @param dispatch
   * @param project
   * @param bucket
   * @param files
   * @return {Promise<any> | Thenable<any> | * | PromiseLike<T | never> | Promise<T | never>}
   */
  importAmazonS3Tasks ({ commit, state, dispatch }, { project, bucket, files }) {
    return dispatch('getAmazonS3TasksImportationOptions', project).then(response => {
      if (response) {
        return api.importAmazonS3Tasks(
          state.amazonS3TasksImportationOptions.form.csrf,
          project,
          bucket,
          files
        ).then(value => {
          // no commit required
          return value.data
        }).catch(reason => {
          commit('notification/showError', {
            title: errors.POST_AMAZON_S3_TASKS_ERROR, content: reason
          }, { root: true })
          return false
        })
      }
      return false
    })
  },

  /**
   * Gets the CSRF token to import google docs tasks
   * @param commit
   * @param project
   * @return {Promise<T | boolean>}
   */
  getGoogleDocsTasksImportationOptions ({ commit }, project) {
    return api.getGoogleDocsTasksImportationOptions(project.short_name).then(value => {
      commit('setGoogleDocsTasksImportationOptions', value.data)
      return value.data
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_GOOGLE_DOCS_IMPORTER_OPTIONS_LOADING_ERROR, content: reason
      }, { root: true })
      return false
    })
  },

  /**
   * Import tasks from the given google docs spreadsheet url
   * @param commit
   * @param state
   * @param dispatch
   * @param project
   * @param link
   * @return {Promise<any> | Thenable<any> | * | PromiseLike<T | never> | Promise<T | never>}
   */
  importGoogleDocsTasks ({ commit, state, dispatch }, { project, link }) {
    return dispatch('getGoogleDocsTasksImportationOptions', project).then(response => {
      if (response) {
        return api.importGoogleDocsTasks(
          state.googleDocsTasksImportationOptions.form.csrf,
          project.short_name,
          link
        ).then(value => {
          if ('flash' in value.data) {
            commit('notification/showSuccess', {
              title: 'Tasks imported',
              content: value.data.flash
            }, { root: true })
            return value.data
          }
          commit('notification/showError', {
            title: 'Error',
            content: 'It seems that there is a problem with your link...'
          }, { root: true })
          return false
        }).catch(reason => {
          commit('notification/showError', {
            title: errors.POST_GOOGLE_DOCS_TASKS_ERROR,
            content: reason
          }, { root: true })
          return false
        })
      }
      return false
    })
  },

  /**
   * Gets the CSRF token to import tasks from a local CSV
   * @param commit
   * @param project
   * @return {Promise<T | boolean>}
   */
  getLocalCsvTasksImportationOptions ({ commit }, project) {
    return api.getLocalCsvTasksImportationOptions(project.short_name).then(value => {
      commit('setLocalCsvTasksImportationOptions', value.data)
      return value.data
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_LOCAL_CSV_IMPORTER_OPTIONS_LOADING_ERROR, content: reason
      }, { root: true })
      return false
    })
  },

  /**
   * Imports tasks from the given csv file
   * @param commit
   * @param state
   * @param dispatch
   * @param project
   * @param file
   * @return {Promise<any> | Thenable<any> | * | PromiseLike<T | never> | Promise<T | never>}
   */
  importLocalCsvTasks ({ commit, state, dispatch }, { project, file }) {
    return dispatch('getLocalCsvTasksImportationOptions', project).then(response => {
      if (response) {
        return api.importLocalCsvTasks(
          state.localCsvTasksImportationOptions.form.csrf,
          project.short_name,
          file
        ).then(value => {
          if ('flash' in value.data) {
            commit('notification/showSuccess', {
              title: 'Tasks imported',
              content: value.data.flash
            }, { root: true })
            return value.data
          }
          commit('notification/showError', {
            title: 'Error',
            content: 'It seems that there is a problem with your file...'
          }, { root: true })
          return false
        }).catch(reason => {
          commit('notification/showError', {
            title: errors.POST_CSV_FILE_TASKS_ERROR,
            content: reason
          }, { root: true })
          return false
        })
      }
      return false
    })
  },

  getOnlineCsvTasksImportationOptions ({ commit }, project) {
    return api.getOnlineCsvTasksImportationOptions(project.short_name).then(value => {
      commit('setOnlineCsvTasksImportationOptions', value.data)
      return value.data
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_ONLINE_CSV_IMPORTER_OPTIONS_LOADING_ERROR, content: reason
      }, { root: true })
      return false
    })
  },

  /**
   * Imports tasks form the given public csv url
   * @param commit
   * @param state
   * @param dispatch
   * @param project
   * @param link
   * @return {Promise<any> | Thenable<any> | * | PromiseLike<T | never> | Promise<T | never>}
   */
  importOnlineCsvTasks ({ commit, state, dispatch }, { project, link }) {
    return dispatch('getOnlineCsvTasksImportationOptions', project).then(response => {
      if (response) {
        return api.importOnlineCsvTasks(
          state.onlineCsvTasksImportationOptions.form.csrf,
          project.short_name,
          link
        ).then(value => {
          if ('flash' in value.data) {
            commit('notification/showSuccess', {
              title: 'Tasks imported',
              content: value.data.flash
            }, { root: true })
            return value.data
          }
          commit('notification/showError', {
            title: 'Error',
            content: 'It seems that there is a problem with your link...'
          }, { root: true })
          return false
        }).catch(reason => {
          commit('notification/showError', {
            title: errors.POST_CSV_TASKS_ERROR,
            content: reason
          }, { root: true })
          return false
        })
      }
      return false
    })
  }

}

// methods that change the state
const mutations = {
  setAmazonS3TasksImportationOptions (state, options) {
    state.amazonS3TasksImportationOptions = options
  },
  setGoogleDocsTasksImportationOptions (state, options) {
    state.googleDocsTasksImportationOptions = options
  },
  setLocalCsvTasksImportationOptions (state, options) {
    state.localCsvTasksImportationOptions = options
  },
  setOnlineCsvTasksImportationOptions (state, options) {
    state.onlineCsvTasksImportationOptions = options
  },

  setGoogleDocImporterVisible (state, value) {
    state.isGoogleDocImporterVisible = value
  },
  setLocalCsvImporterVisible (state, value) {
    state.isLocalCsvImporterVisible = value
  },
  setOnlineCsvImporterVisible (state, value) {
    state.isOnlineCsvImporterVisible = value
  },
  setAmazonS3ImporterVisible (state, value) {
    state.isAmazonS3ImporterVisible = value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
