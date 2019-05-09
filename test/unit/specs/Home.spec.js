import Home from '@/components/Home'
import Vuex from 'vuex'
import VueRouter from '@/router'
import Store from '@/store'
import BootstrapVue from 'bootstrap-vue'
import { createLocalVue, mount } from '@vue/test-utils'

// https://vue-test-utils.vuejs.org/api/#createlocalvue
// returns a Vue class for you to add components, mixins and install plugins without polluting the global Vue class.
const localVue = createLocalVue()

describe('Home.vue', () => {
  let store // application data

  beforeEach(() => {
    localVue.use(Vuex)
    localVue.use(BootstrapVue)
    store = Store
  })

  it('should render correct contents', () => {
    const router = VueRouter
    // prepare the vue instance
    const wrapper = mount(Home, { store, localVue, router })

    // https://www.chaijs.com/api/bdd/ for the complete list of assertions
    // expect(wrapper.find({ ref: 'title' }).text()).to.equal('Welcome to Your Vue.js App')

    wrapper.vm.$nextTick(() => {
      expect(store.state.notification.errorMessages).to.be.empty
      // TODO : mock api call to not make an online call
      expect(store.state.project.all).to.have.lengthOf(2)
    })
  })
})
