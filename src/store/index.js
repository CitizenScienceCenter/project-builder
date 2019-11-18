import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

// list of modules
import notification from './modules/notification'
import project from './modules/project'
import user from './modules/user'
import task from './modules/task'
import osm from './modules/osm'

import consts from './modules/consts'
import settings from './modules/settings'
import gdpr from './modules/gdpr'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

let store
if (window.localStorage) {
  store = new Vuex.Store({
    modules: {
      notification,
      project,
      user,
      task,
      osm,
      consts,
      settings,
      gdpr
    },
    strict: debug,
    plugins: debug ? [createLogger(), createPersistedState({ storage: window.localStorage })] : [createPersistedState({ storage: window.localStorage })]
  })
} else {
  store = new Vuex.Store({
    modules: {
      notification,
      project,
      user,
      task,
      osm,
      consts,
      settings,
      gdpr
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
  })
}

export default store
