import store from '@/store'
import { testAction } from '../helper'
const actionsInjector = require('inject-loader!@/store/modules/project.js')

describe('store/modules/project', () => {
  // ----------------------------------------------------------
  //
  //   MUTATIONS
  //
  // ----------------------------------------------------------
  it('test mutation: setProjects', () => {
    expect(store.state.project.all.length).to.equal(0)
    store.commit('project/setProjects', [{name: 'project1'}, {name: 'project2'}])
    expect(store.state.project.all.length).to.equal(2)
  })

  // ----------------------------------------------------------
  //
  //   ACTIONS
  //
  // ----------------------------------------------------------

  it('test action: project/getUserProjects success', done => {
    const project = actionsInjector({
      '../../api/project': {
        getUserProjects () {
          return new Promise((resolve, reject) => {
            setTimeout(function () {
              resolve({
                data: [
                  {}
                ]
              })
            }, 100)
          })
        }
      }
    })

    testAction(project.default.actions.getUserProjects, null, {}, [
      { type: 'setProjects', payload: [{}] }
    ], done)
  })

  it('test action: project/getUserProjects error', done => {
    const error = new Error('HTTP ERROR')
    const project = actionsInjector({
      '../../api/project': {
        getUserProjects () {
          return new Promise((resolve, reject) => {
            setTimeout(function () {
              reject(error)
            }, 100)
          })
        }
      }
    })

    testAction(project.default.actions.getUserProjects, null, project.default.state, [{
      type: 'notification/showError',
      payload: {
        title: 'Error during projects loading', content: error
      }
    }], done)
  })
})
