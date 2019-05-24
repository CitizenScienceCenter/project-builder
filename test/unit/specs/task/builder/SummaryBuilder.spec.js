import router from '@/router'
import Vuex from 'vuex'
import store from '@/store'
import BootstrapVue from 'bootstrap-vue'

import Button from 'bootstrap-vue/es/components/button/button'

import sinon from 'sinon'
import { createLocalVue, mount } from '@vue/test-utils'

import SummaryBuilder from '@/components/Task/Builder/SummaryBuilder'

import ImageDescribeTemplate from '@/components/Task/Template/Image/ImageDescribeTemplate'
import ImageCountTemplate from '@/components/Task/Template/Image/ImageCountTemplate'
import ImageClassifyTemplate from '@/components/Task/Template/Image/ImageClassifyTemplate'

const localVue = createLocalVue()

describe('Task/Builder/SummaryBuilder.vue', () => {

  let sandbox
  localVue.use(Vuex)
  localVue.use(BootstrapVue)
  const taskBuilderState = store.state.task.builder

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  it('should generate an ImageDescribeTemplate', done => {

    store.commit('task/builder/setTaskMaterial', taskBuilderState.materials.image)
    store.commit('task/builder/setTaskJob', taskBuilderState.jobs.describe)
    store.commit('task/builder/setTaskSourceContent', [ 'link_1', 'link_2' ])
    const template = { question: '???', descriptions: ['Yes', 'No'] }
    store.commit('task/builder/setTaskTemplate', template)

    const buildTemplateFromModelStub = sandbox.stub()

    const wrapper = mount(SummaryBuilder, {
      store,
      localVue,
      router,
      methods: {
        buildTemplateFromModel: buildTemplateFromModelStub
      }
    })

    const submitButton = wrapper.find(Button)
    submitButton.trigger('click')

    expect(buildTemplateFromModelStub.calledWith(ImageDescribeTemplate, template)).to.equal(true)
    done()
  })

  it('should generate an ImageCountTemplate', done => {

    store.commit('task/builder/setTaskMaterial', taskBuilderState.materials.image)
    store.commit('task/builder/setTaskJob', taskBuilderState.jobs.count)
    store.commit('task/builder/setTaskSourceContent', [ 'link_1', 'link_2' ])
    const template = 'How many tests can you see ?'
    store.commit('task/builder/setTaskTemplate', template)

    const buildTemplateFromModelStub = sandbox.stub()

    const wrapper = mount(SummaryBuilder, {
      store,
      localVue,
      router,
      methods: {
        buildTemplateFromModel: buildTemplateFromModelStub
      }
    })

    const submitButton = wrapper.find(Button)
    submitButton.trigger('click')

    expect(buildTemplateFromModelStub.calledWith(ImageCountTemplate, { question: template })).to.equal(true)
    done()
  })

  it('should generate an ImageClassifyTemplate', done => {

    store.commit('task/builder/setTaskMaterial', taskBuilderState.materials.image)
    store.commit('task/builder/setTaskJob', taskBuilderState.jobs.classify)
    store.commit('task/builder/setTaskSourceContent', [ 'link_1', 'link_2' ])
    const template = [
      {
        question: '???',
        answers: [
          'Yes', 'No', 'I dont know'
        ]
      },
      {
        question: 'Really ???',
        answers: [
          'Sure', 'No'
        ]
      }
    ]
    store.commit('task/builder/setTaskTemplate', template)

    const buildTemplateFromModelStub = sandbox.stub()

    const wrapper = mount(SummaryBuilder, {
      store,
      localVue,
      router,
      methods: {
        buildTemplateFromModel: buildTemplateFromModelStub
      }
    })

    const submitButton = wrapper.find(Button)
    submitButton.trigger('click')

    expect(buildTemplateFromModelStub.calledWith(ImageClassifyTemplate, { questions: template })).to.equal(true)
    done()
  })

  it('should generate a correctly formatted template', done => {

    store.commit('task/builder/setTaskMaterial', taskBuilderState.materials.image)
    store.commit('task/builder/setTaskJob', taskBuilderState.jobs.count)
    store.commit('task/builder/setTaskSourceContent', [ 'link_1', 'link_2' ])

    const wrapper = mount(SummaryBuilder, {
      store,
      localVue,
      router
    })

    const questionString = 'How many lines are present in this test ?'
    const template = wrapper.vm.buildTemplateFromModel(ImageCountTemplate, { question: questionString })

    const component = eval('() => { return' + template + '}')()

    expect(typeof component).to.equal('object')

    expect(Object.keys(component).includes('template')).to.equal(true)
    expect(Object.keys(component).includes('methods')).to.equal(true)
    expect(Object.keys(component).includes('data')).to.equal(true)
    expect(Object.keys(component).includes('mounted')).to.equal(true)
    expect(Object.keys(component).includes('props')).to.equal(true)

    expect(typeof component.template).to.equal('string')
    expect(typeof component.methods).to.equal('object')
    expect(typeof component.data).to.equal('function')
    expect(typeof component.mounted).to.equal('function')
    expect(typeof component.props).to.equal('object')

    expect(component.data()).to.include({ question: questionString })
    expect(component.props).to.deep.include({ pybossa: { required: true } })

    done()
  })

  afterEach(() => {
    sandbox.restore()
  })
})
