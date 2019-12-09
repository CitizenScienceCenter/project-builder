import store from '@/store'

export default {
  updateTaskPresenter(project, tmplCode) {
    let tmpl = Object.assign({}, project.info)
    tmpl['template'] = tmplCode
    return store.dispatch('c3s/project/updateProject', [project.id, {
      'info': tmpl
    }]).then(response => {
      if (!response) {
        this.showError({
          title: 'Error',
          content: 'Error applying update'
        })
      } else {
        return Promise.resolve(true)
      }
    })
  },
  submitTask() {

  },
  nextTask () {

  },
  getTask () {

  },
  createMediaCloudTasks (project, taskBuilder) {
    const task = {
      part_of: project.id,
      info: {
        path: []
      },
      title: taskBuilder.job,
      content: taskBuilder.template,
      required: true,
      allow_multiple: true,
      sequence: 0
    }
    let tasks = []
    taskBuilder.sourceContent.forEach(f => {
      const t = Object.assign({}, task)
      t.info.path = f.info.path
      tasks.push(t)
    })
    return store.dispatch('c3s/task/createTasks', tasks).then(res => {
      let createdTasks = res.body.data
      let media = []
      createdTasks.forEach(t => {
        const m = {
          path: t.info.path,
          source_id: t.id,
          task: t.id,
          name: t.info.path
        }
        media.push(store.dispatch('c3s/media/createMedium', m))
      })
      return Promise.all(media).then(res => {
        if (res.filter(m => m.ok === true).length === media.length) {
          return Promise.resolve(true)
        } else {
          return Promise.resolve(false)
        }
      })
    })
  },
  errorHandler(err, router) {
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
      return {
        name: cmpnt,
        props: {
          msg: msg
        }
      }
    }
  }
}
