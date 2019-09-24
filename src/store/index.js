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
import gdpr from "./modules/gdpr";

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
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
