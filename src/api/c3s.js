import store from '@/store'

export default {
  updateTaskPresenter (project, tmplCode) {
      let tmpl = project.info
      tmpl['template'] = tmplCode
      return store.dispatch('c3s/project/updateProject', [project.id, { 'info': tmpl }]).then(response => {
        if (!response) {
          this.showError({
            title: 'Error',
            content: 'Error applying update'
          })
        } else {
          console.log(response)
          return Promise.resolve(true)
        }
      })
  },
  submitTask () {

  },
  nextTask () {

  },
  errorHandler (err, router) {
    // TODO set message as response error and model
    if (err.status === 200 || (err.body && err.body.ok === true)) {
      return false
    } else {
      let cmpnt = 'Error'
      let msg = 'Error'
      switch (err.status) {
        case 404:
          cmpnt = '404'
          msg = 'Not found'
          break
        case 401:
          cmpnt = '401'
          break
        case 500:
          cmpnt = '500'
          break
        default:
          cmpnt = 'Default'
          break
      }
      return { name: cmpnt, props: { msg: msg } }
    }
  }
}
