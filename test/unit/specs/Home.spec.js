import Home from '@/components/Home'
import Vuex from 'vuex'
import VueRouter from '@/router'
import { createLocalVue, mount } from '@vue/test-utils'

// https://vue-test-utils.vuejs.org/api/#createlocalvue
// returns a Vue class for you to add components, mixins and install plugins without polluting the global Vue class.
const localVue = createLocalVue()

describe('Home.vue', () => {
  let store // application data

  beforeEach(() => {
    localVue.use(Vuex)
    store = new Vuex.Store({
      state: {

      },
      mutations: {

      },
      getters: {

      },
      actions: {

      }
    }) // import from a file normally
  })

  it('should render correct contents', () => {
    const router = VueRouter
    // prepare the vue instance
    const wrapper = mount(Home, { store, localVue, router })

    // https://www.chaijs.com/api/bdd/ for the complete list of assertions
    expect(wrapper.find({ ref: 'title' }).text()).to.equal('Welcome to Your Vue.js App')
  })
})
