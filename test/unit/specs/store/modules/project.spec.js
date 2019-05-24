import store from '@/store'
import projectModule from '@/store/modules/project'
import { testAction } from '../helper'
const actionsInjector = require('inject-loader!@/store/modules/project.js')

describe('store/modules/project', () => {
  // ----------------------------------------------------------
  //
  //   MUTATIONS
  //
  // ----------------------------------------------------------

  it('test mutation: setProjects', done => {
    // expect(store.state.project.topProjects.length).to.equal(0)
    // expect(store.state.project.categories.length).to.equal(0)
    // expect(Object.values(store.state.project.categoriesProjects).length).to.equal(0)

    store.commit('project/setProjects', {
      'top_projects': [{name: 'project_a'}, {name: 'project_b'}, {name: 'project_c'}],
      'categories': [{short_name: 'category_a'}, {short_name: 'category_b'}],
      'categories_projects': {
        category_a: [
          {name: 'project_a'}, {name: 'project_b'}
        ],
        category_b: [
          {name: 'project_c'}
        ]
      }
    })

    expect(store.state.project.topProjects.length).to.equal(3)
    expect(store.state.project.categories.length).to.equal(2)
    expect(Object.values(store.state.project.categoriesProjects).length).to.equal(2)

    done()
  })

  it('test mutation: setUserProjects', done => {
    expect(store.state.project.userProjects.length).to.equal(0)
    store.commit('project/setUserProjects', [{name: 'project1'}, {name: 'project2'}])
    expect(store.state.project.userProjects.length).to.equal(2)

    done()
  })

  // ----------------------------------------------------------
  //
  //   ACTIONS
  //
  // ----------------------------------------------------------

  it('test action: project/getUserProjects success', done => {
    const project = actionsInjector({
      '../../api/project': {
        getUserProjects (userInfos) {
          return new Promise((resolve, reject) => {
            setTimeout(function () {
              resolve({
                data: [
                  {}
                ]
              })
            }, 10)
          })
        }
      }
    })

    testAction(project.default.actions.getUserProjects, null, {}, store.state, [
      { type: 'setUserProjects', payload: [{}] }
    ], done)
  })

  it('test action: project/getUserProjects error', done => {
    const error = new Error('HTTP ERROR')
    const project = actionsInjector({
      '../../api/project': {
        getUserProjects (userInfos) {
          return new Promise((resolve, reject) => {
            setTimeout(function () {
              reject(error)
            }, 10)
          })
        }
      }
    })

    testAction(project.default.actions.getUserProjects, null, project.default.state, store.state, [{
      type: 'notification/showError',
      payload: {
        title: projectModule.errors.GET_USER_PROJECTS_LOADING_ERROR, content: error
      }
    }], done)
  })

  it('test action: project/getAllPublishedProjects success', done => {
    const project = actionsInjector({
      '../../api/project': {
        getAllProjects () {
          return new Promise((resolve, reject) => {
            setTimeout(function () {
              resolve({
                data: {

                }
              })
            }, 10)
          })
        }
      }
    })

    testAction(project.default.actions.getAllPublishedProjects, null, project.default.state, store.state, [
      { type: 'setProjects', payload: {} }
    ], done)
  })

  it('test action: project/getAllPublishedProjects error', done => {
    const error = new Error('HTTP ERROR')
    const project = actionsInjector({
      '../../api/project': {
        getAllProjects () {
          return new Promise((resolve, reject) => {
            setTimeout(function () {
              reject(error)
            }, 10)
          })
        }
      }
    })

    testAction(project.default.actions.getAllPublishedProjects, null, project.default.state, store.state, [
      {
        type: 'notification/showError',
        payload: {
          title: projectModule.errors.GET_ALL_PROJECTS_LOADING_ERROR, content: error
        }
      }
    ], done)
  })

  // it('test action: project/createProject success', done => {
  //   const project = actionsInjector({
  //     '../../api/project': {
  //       createProject (apiKey, builder) {
  //         return new Promise((resolve, reject) => {
  //           setTimeout(function () {
  //             resolve({
  //               data: {}
  //             })
  //           }, 10)
  //         })
  //       }
  //     }
  //   })
  //
  //   const projectBuilder = {
  //     title: 'my new project',
  //     shortDescription: 'a little description',
  //     story: {
  //       whatWhy: 'what, why...',
  //       who: 'Someone',
  //       how: 'I dont know',
  //       keepTrack: 'Send an email'
  //     }
  //   }
  //
  //   testAction(project.default.actions.createProject, projectBuilder, project.default.state, store.state, [
  //     // TODO : assert commit is done when create project will be fully implemented
  //   ], done)
  // })

  it('test action: project/createProject error', done => {
    const error = new Error('HTTP ERROR')

    const project = actionsInjector({
      '../../api/project': {
        createProject (apiKey, builder) {
          return new Promise((resolve, reject) => {
            setTimeout(function () {
              reject(error)
            }, 10)
          })
        }
      }
    })

    const projectBuilder = {
      title: 'my new project',
      shortDescription: 'a little description',
      story: {
        whatWhy: 'what, why...',
        who: 'Someone',
        how: 'I dont know',
        keepTrack: 'Send an email'
      }
    }

    testAction(project.default.actions.createProject, projectBuilder, project.default.state, store.state, [
      {
        type: 'notification/showError',
        payload: {
          title: projectModule.errors.POST_PROJECT_ERROR, content: error
        }
      }
    ], done)
  })

  // ----------------------------------------------------------
  //
  //   GETTERS
  //
  // ----------------------------------------------------------

  it('test getter: project/getFeaturedProjects', done => {
    store.commit('project/setProjects', {
      'top_projects': [{name: 'project_a'}, {name: 'project_b'}],
      'categories': [{short_name: 'category_a'}, {short_name: 'category_b'}, {short_name: 'category_c'}],
      'categories_projects': {
        category_a: [
          {name: 'project_a', featured: true}, {name: 'project_b', featured: false}
        ],
        category_b: [
          {name: 'project_c', featured: false}
        ],
        category_c: [
          {name: 'project_d', featured: true}
        ]
      }
    })

    let result = projectModule.getters.getFeaturedProjects(projectModule.state)

    // eslint-disable-next-line no-unused-expressions
    expect(result).to.be.an('array')
    expect(result.length).to.equal(2)
    expect(result).to.have.deep.members([
      {name: 'project_a', featured: true},
      {name: 'project_d', featured: true}
    ])

    done()
  })

  it('test getter: project/getProjectsFor', done => {
    store.commit('project/setProjects', {
      'top_projects': [{name: 'project_a'}, {name: 'project_b'}],
      'categories': [{short_name: 'category_a'}, {short_name: 'category_b'}, {short_name: 'category_c'}],
      'categories_projects': {
        category_a: [
          {name: 'project_a', featured: true}, {name: 'project_b', featured: false}
        ],
        category_b: [
          {name: 'project_c', featured: false}
        ],
        category_c: [
          {name: 'project_d', featured: true}
        ]
      }
    })

    let result = projectModule.getters.getProjectsFor(projectModule.state)({short_name: 'category_a'})

    // eslint-disable-next-line no-unused-expressions
    expect(result).to.be.an('array')
    expect(result.length).to.equal(2)
    expect(result).to.have.deep.members([
      {name: 'project_a', featured: true},
      {name: 'project_b', featured: false}
    ])

    done()
  })
})
