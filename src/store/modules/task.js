import api from '@/api/task'
import builder from './task-builder'
import importer from './task-importer'
import exporter from './task-exporter'
import settings from './task-settings'

import { buildTemplateFromModel } from '@/helper'

import BasicTemplate from '@/components/Task/Template/BasicTemplate'
import ImageTemplate from '@/components/Task/Template/Image/ImageClassificationTemplate'
import VideoTemplate from '@/components/Task/Template/Video/VideoDescriptionTemplate'
import SoundTemplate from '@/components/Task/Template/Sound/SoundClassificationTemplate'
import DocumentTemplate from '@/components/Task/Template/Document/PdfDescriptionTemplate'
import GeoCodingTemplate from '@/components/Task/Template/GeoCoding/GeoCodingTemplate'

const errors = {
  GET_PROJECT_TASKS_LOADING_ERROR: 'Error during project tasks loading',
  GET_PROJECT_TASK_PRESENTER_LOADING_ERROR: 'Error during project task presenter loading',
  GET_CURRENT_TASK_LOADING_ERROR: 'Error during current task loading',
  POST_TASK_RUN_ERROR: 'Error when saving the task run',
  GET_TASK_PRESENTER_IMPORTATION_OPTIONS_LOADING_ERROR: 'Error when loading task presenter importation options',
  POST_TASK_PRESENTER_ERROR: 'Error during task presenter importation'
}

const state = {
  // tasks list of the selected project
  projectTasks: [],

  // state which shows if an user wants to load a predefined template in the task presenter editor
  usingTemplate: null,

  // the currently loaded task presenter (of the selected project)
  taskPresenter: '',

  // the current task showed in the task presenter
  currentTask: {
    info: {}
  },

  templates: {
    basic: 'basic',
    sound: 'sound',
    image: 'image',
    video: 'video',
    geocoding: 'geocoding',
    document: 'document'
  },

  // contains data required to send forms
  taskPresenterImportationOptions: {},
  amazonS3TasksImportationOptions: {}
}

// filter methods on the state data
const getters = {

}

// async methods making mutations are placed here
const actions = {

  /**
   * Returns the task presenter of the given project if template == null
   * Else it returns the presenter template matching the given template
   *
   * WARNING: this method can only be called by the project owner if the template parameter is set to null
   * (else it will returns a status code 403)
   *
   * @param commit
   * @param state
   * @param project
   * @param template
   * @return {boolean|Promise<T | boolean>}
   */
  getTaskPresenter ({ commit, state }, { project, template }) {
    if (template === null) {
      if (project.info.template) {
        commit('setTaskPresenter', project.info.template)
        return project.info.template
      } else if (state.template !== null) {
        commit('setTaskPresenter', buildTemplateFromModel(BasicTemplate, {}))
        return buildTemplateFromModel(BasicTemplate)
      }
    } else {
      let tmpl = buildTemplateFromModel(BasicTemplate)
      switch (template) {
        case state.templates.image:
          tmpl = buildTemplateFromModel(ImageTemplate, {})
          break
        case state.templates.sound:
          tmpl = buildTemplateFromModel(SoundTemplate, {})
          break
        case state.templates.video:
          tmpl = buildTemplateFromModel(VideoTemplate, {})
          break
        case state.templates.document:
          tmpl = buildTemplateFromModel(DocumentTemplate, {})
          break
        case state.templates.geocoding:
          tmpl = buildTemplateFromModel(GeoCodingTemplate, {})
          break
        default:
          tmpl = buildTemplateFromModel(BasicTemplate, {})
          break
      }
      commit('setTaskPresenter', tmpl)
      return tmpl
    }
    return true
  }
}

// methods that change the state
const mutations = {
  setProjectTasks (state, tasks) {
    state.projectTasks = tasks
  },
  setTaskPresenter (state, presenter) {
    state.taskPresenter = presenter
  },
  setCurrentTask (state, task) {
    state.currentTask = task
  },
  setTaskPresenterImportationOptions (state, options) {
    state.taskPresenterImportationOptions = options
  },
  setUsingTemplate (state, template) {
    state.usingTemplate = template
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
    importer,
    exporter,
    settings
  }
}
