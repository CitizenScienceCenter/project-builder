<template>
  <b-row class="mt-4 mb-4">
    <b-col>
      <b-link :to="{ name: 'project', params: { id: this.id } }">Go back to the project</b-link>

      <div v-if="!taskPresenterLoaded" class="mt-4 text-center">
        <b-spinner variant="primary" style="width: 3rem; height: 3rem;" label="Task presenter loading..."></b-spinner>
      </div>

      <component class="mt-4" ref="presenter" v-if="taskPresenterExists" :is="presenterComponent" :pybossa="this"></component>
      <div class="mt-4" v-else-if="taskPresenterLoaded">
        <b-alert :show="true" variant="warning">The project does not contains a task presenter</b-alert>
      </div>

    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'TemplateRenderer',
  props: {
    id: {
      required: true
    }
  },
  created () {
    this.getProject(this.id).then(() => {
      this.taskPresenterLoaded = true
      if (this.presenter) {
        this.taskPresenterExists = true
      }
    })
  },
  data: () => {
    return {
      taskPresenterExists: false,
      taskPresenterLoaded: false,
      taskLoaded: false
    }
  },
  computed: {
    ...mapState('project', {
      // the current project where is displayed the task presenter
      project: state => state.selectedProject,

      // user task progress
      userProgress: state => state.selectedProjectUserProgress
    }),

    ...mapState('task', {
      // the currently displayed task in the presenter
      task: state => state.currentTask,

      // the task presenter template loaded from the pybossa server
      presenter: state => state.taskPresenter
    }),

    // user data
    ...mapState('user', {
      isUserLogged: state => state.logged,
      userId: state => state.infos.id,
      userApiKey: state => state.infos.api_key
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
      'getNewTask', 'saveTaskRun'
    ]),

    ...mapActions('project', [
      'getUserProgress', 'getProject'
    ]),

    ...mapActions('osm', [
      'qetLocalizationsWithQuery'
    ]),

    ...mapMutations('notification', [
      'showError'
    ]),

    run () {
      this.newTask()
    },

    newTask () {
      this.taskLoaded = false
      this.getNewTask(this.project).then(allowed => {
        if (!allowed) {
          this.showError({
            title: 'You are not allowed to contribute',
            content: 'This project does not allow anonymous contributors'
          })
          this.$router.push({ name: 'project', params: { id: this.project.id } })
        } else {
          this.getUserProgress(this.project)
          this.taskLoaded = true
        }
      })
    },

    saveTask (answer) {
      this.taskLoaded = false
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
      if (this.isUserLogged) {
        taskRun.user_id = this.userId
      }
      this.saveTaskRun(JSON.stringify(taskRun)).then(() => {
        // load a new task when current task saved
        this.newTask()
      })
    }
  }
}
</script>

<style scoped>

</style>
