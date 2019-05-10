import Home from '@/components/Home'
import Vuex from 'vuex'
import router from '@/router'
import store from '@/store'
import sinon from 'sinon'
import BootstrapVue from 'bootstrap-vue'
import {createLocalVue, shallowMount} from '@vue/test-utils'

// https://vue-test-utils.vuejs.org/api/#createlocalvue
// returns a Vue class for you to add components, mixins and install plugins without polluting the global Vue class.
const localVue = createLocalVue()

describe('Home.vue', () => {
  beforeEach(() => {
    localVue.use(Vuex)
    localVue.use(BootstrapVue)
  })

  it('should dispatch project/getAll action', () => {
    const spy = sinon.spy(store, 'dispatch')

    // prepare the vue instance
    shallowMount(Home, { store, localVue, router })

    // eslint-disable-next-line no-unused-expressions
    expect(spy.withArgs('project/getAll').calledOnce).to.be.true
  })
})
