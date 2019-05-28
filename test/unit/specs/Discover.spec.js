import Discover from '@/components/Discover'
import Vuex from 'vuex'
import router from '@/router'
import store from '@/store'
import sinon from 'sinon'
import BootstrapVue from 'bootstrap-vue'
import {createLocalVue, shallowMount} from '@vue/test-utils'

const localVue = createLocalVue()

describe('Discover.vue', () => {

  let sandbox
  localVue.use(Vuex)
  localVue.use(BootstrapVue)

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  it('should dispatch project/getAllProjects action in create()', () => {
    const spy = sandbox.spy(store, 'dispatch')

    // prepare the vue instance
    shallowMount(Discover, { store, localVue, router })

    // eslint-disable-next-line no-unused-expressions
    expect(spy.withArgs('project/getAllProjects').calledOnce).to.be.true
  })

  afterEach(() => {
    sandbox.restore()
  })
})
