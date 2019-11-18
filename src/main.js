// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'

import store from './store'
import router from './router'

import {
  i18n
} from './i18n.js'

import BootstrapVue from 'bootstrap-vue'
import VueLayers from 'vuelayers'
// import Pdf from 'vue-pdf'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all'

import '@/styles/undoBoostrap.scss';
import '@/styles/shared/main.scss';

import 'codemirror/lib/codemirror.css'

import 'vuelayers/lib/style.css'

import c3s from 'vuex-c3s'
import Meta from 'vue-meta'

Vue.config.productionTip = false

Vue.use(Meta)
Vue.use(BootstrapVue)
Vue.use(VueLayers, {
  dataProjection: 'EPSG:4326'
})

let VueScrollTo = require('vue-scrollto');
Vue.use(VueScrollTo, {
  easing: "easeInOut",
  duration: 600,
  offset: 0
});

//Vue.component('pdf', Pdf)

window.Vue = Vue
const apiURL = 'https://staging.citizenscience.ch/v3/openapi.json'
const server = 'https://staging.citizenscience.ch/v3/'
console.log(apiURL, server)
Vue.use(c3s.plugin, {
  store,
  apiURL,
  server
})

/* eslint-disable no-new */
store.watch(
  (state) => state.c3s && state.c3s.client,
  (value) => {
    if (value !== null) {
      console.log('mounting vue')
      new Vue({
        el: '#app',
        render: h => h(App),
        router,
        store,
        i18n
      })
    }
  })
