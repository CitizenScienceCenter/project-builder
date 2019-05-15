import Project from '@/components/Project/Project'
import Vuex from 'vuex'
import router from '@/router'
import store from '@/store'
import sinon from 'sinon'
import BootstrapVue from 'bootstrap-vue'
import {createLocalVue, shallowMount} from '@vue/test-utils'

const localVue = createLocalVue()

describe('Project/Project.vue', () => {

  let sandbox
  localVue.use(Vuex)
  localVue.use(BootstrapVue)

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  it('should dispatch project/getProject action in create()', () => {
    const spy = sandbox.spy(store, 'dispatch')

    shallowMount(Project, {
      store,
      localVue,
      router,
      props: {
        id: 1
      }
    })

    expect(spy.calledWith('project/getProject')).to.equal(true)
  })

  afterEach(() => {
    sandbox.restore()
  })
})
