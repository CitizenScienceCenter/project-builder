// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import store from './store'
import router from './router'

import { i18n } from './i18n.js'

import BootstrapVue from 'bootstrap-vue'
import VueLayers from 'vuelayers'
import Pdf from 'vue-pdf'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all'

import 'codemirror/lib/codemirror.css'

import 'vuelayers/lib/style.css'

import c3s from 'vuex-c3s'
import Meta from 'vue-meta'

Vue.config.productionTip = false

Vue.use(Meta);
Vue.use(BootstrapVue)
Vue.use(VueLayers, {
  dataProjection: 'EPSG:4326'
})

Vue.component('pdf', Pdf)

window.Vue = Vue

const swaggerURL = "https://api.citizenscience.ch/api/v2/swagger.json"
Vue.use(c3s.plugin, {store, swaggerURL})

/* eslint-disable no-new */
store.watch(
  (state) => state.c3s && state.c3s.client,
  (value) => {
    if (value !== null) {
      new Vue({
        el: '#app',
        router,
        store,
        i18n,
        render: h => h(App.default),
        template: '<App/>'
      })
    }
  })