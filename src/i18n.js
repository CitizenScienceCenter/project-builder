import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from './store/index.js'

Vue.use(VueI18n)

var language
if (!store.state.settings.language) {
  // no language in store

  // check browser
  language = window.navigator.userLanguage || window.navigator.language

  // trim
  language = language.substr(0, 2)

  // check if valid
  if (language !== 'en') {
    language = 'en'
  }

  // language for prerendering default routes
  if (navigator.userAgent === 'ReactSnap') {
    language = 'en'
  }

  store.dispatch('settings/setLanguage', language)
}

export const i18n = new VueI18n({
  locale: store.state.settings.language,
  silentTranslationWarn: true,
  messages: {
    en: {

      'site-title': 'Lab | Citizen Science Center Zurich',
      'site-description': 'Create your Projects',

      'navigation-discover': {
        link: 'Projects'
      },
      'navigation-about': {
        link: 'About'
      }

    }
  }

})
