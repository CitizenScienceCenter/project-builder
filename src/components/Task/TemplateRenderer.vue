<template>
  <b-row class="mt-4 mb-4">
    <b-col>

      <component ref="presenter" v-if="presenter.length > 0" :is="presenterComponent" :pybossa="this"></component>
      <div v-else-if="taskPresenterExists" class="text-center">
        <b-spinner variant="primary" style="width: 3rem; height: 3rem;" label="Task presenter loading..."></b-spinner>
      </div>
      <div v-else>
        <p>The project does not contains a task presenter</p>
      </div>

    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'TemplateRenderer',
  props: {
    id: {
      required: true
    }
  },
  created () {
    this.getProject(this.id).then(project => {
      this.getTaskPresenter({ project: project, template: null }).then(response => {
        if (response) {
          this.taskPresenterExists = true
        }
      })
    })
  },
  data: () => {
    return {
      taskPresenterExists: false
    }
  },
  computed: {
    ...mapState('project', {
      // the current project where is displayed the task presenter
      project: state => state.selectedProject,

      // user progress value in percent
      userProgress: state => state.selectedProjectUserProgress
    }),

    ...mapState('task', {
      // the currently displayed task in the presenter
      task: state => state.currentTask,

      // the task presenter template loaded from the pybossa server
      presenter: state => state.taskPresenter
    }),

    ...mapGetters('project', {
      userProgressInPercent: 'getUserProgressInPercent'
    }),

    presenterComponent () {
      const sanitizedPresenter = this.presenter.replace(/[\n\r\t]+/g, '')
      // eslint-disable-next-line no-eval
      return { name: 'presenter', ...eval('() => { return' + sanitizedPresenter + '}')() }
    }
  },
  methods: {
    ...mapActions('task', [
      'getTaskPresenter', 'getNewTask', 'saveTaskRun'
    ]),

    ...mapActions('project', [
      'getUserProgress', 'getProject'
    ]),

    ...mapActions('osm', [
      'qetLocalizationsWithQuery'
    ]),

    run () {
      this.getUserProgress(this.project)
      this.newTask()
    },

    newTask () {
      this.getNewTask(this.project).then(value => {
        this.getUserProgress(this.project)
      })
    },

    saveTask (answer) {
      const taskRun = {
        // required
        project_id: this.project.id,
        task_id: this.task.id,
        info: answer
        // optional
        // user_id: 1,
        // external_uid: '',
        // media_url: ''
      }
      this.saveTaskRun(JSON.stringify(taskRun)).then(value => {
        // load a new task when current task saved
        this.newTask()
      })
    }
  }
}
</script>

<style scoped>

</style>
