<template>
  <b-row class="mt-4 mb-4">
    <b-col>
      <b-link v-if="template" :to="{ name: 'project.task.presenter.editor', params: { pid: this.pid, template: this.template } }">Go back to the editor</b-link>
      <b-link v-else :to="{ name: 'project', params: { pid: this.pid } }">Go back to the project</b-link>

      <div v-if="!taskPresenterLoaded" class="mt-4 text-center">
        <b-spinner variant="primary" style="width: 3rem; height: 3rem;" label="Task presenter loading..."></b-spinner>
      </div>

      <component class="mt-4" ref="presenter" v-if="taskPresenterExists" :is="presenterComponent" :pybossa="this"></component>
      <div class="mt-4" v-else-if="taskPresenterLoaded">
        <b-alert :show="true" variant="warning">The project does not contain a task presenter</b-alert>
      </div>

    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'TemplateRenderer',
  props: {
    // project id
    pid: {
      required: true
    }
  },
  created () {
    this.getProject(this.pid).then(() => {
      this.taskPresenterLoaded = true
      this.template = this.project.info.template
      this.taskPresenterExists = true
    })
  },
  data: () => {
    return {
      taskPresenterExists: false,
      taskPresenterLoaded: false,
      taskLoaded: false,
      template: undefined,
      taskIndex: 0,
      task: undefined
    }
  },
  computed: {
    ...mapState('c3s/project', {
      // the current project where is displayed the task presenter
      project: state => state.project,
      tasks: state => state.tasks,

      // user task progress
      userProgress: state => state.selectedProjectUserProgress
    }),
    ...mapState('c3s/task', {
      media: state => state.media
    }),
    // user data
    ...mapState('c3s/user', {
      isUserLogged: state => state.currentUser,
      userId: state => state.currentUser.id,
      userApiKey: state => state.currentUser.api_key
    }),

    ...mapGetters('project', {
      userProgressInPercent: 'getUserProgressInPercent'
    }),

    presenterComponent () {
      const sanitize = (t) => {
        return t.replace(/[\n\r\t]+/g, '')
      }
      // eslint-disable-next-line no-eval
      const tmpl = sanitize(this.template)
      return { name: 'presenter', ...eval('() => { return' + tmpl + '}')() }
    }
  },
  methods: {
    ...mapActions('c3s/submission', [
      'createSubmission'
    ]),

    ...mapActions('project', [
      'getUserProgress',
    ]),

    ...mapActions('osm', [
      'getLocalizationsWithQuery'
    ]),

    ...mapActions('c3s/project', [
      'getProject',
      'getProjectTasks'
    ]),
    ...mapActions('c3s/task', [
      'getProjectTask',
      'getTaskMedia'
    ]),

    ...mapMutations('notification', [
      'showError'
    ]),

    /**
     * Called when the dynamic component start
     */
    run () {
      this.getProjectTasks(this.pid).then((t) => {
        this.task = this.tasks[this.taskIndex]
        this.getTaskMedia(this.task.id).then(m => {
          this.taskLoaded = true
        })
      });
    },
    /**
     * Load a new task for the presenter if authorized
     * Also load the global user progress
     */
    newTask () {
      this.taskLoaded = false
      this.taskIndex++
      if(this.taskIndex < this.tasks.length) {
        this.task = this.tasks[this.taskIndex]
        this.getTaskMedia(this.task.id).then(m => {
          this.taskLoaded = true
        });
      } else {
        this.task = undefined
      }
    },

    /**
     * Save the user task answer and get a new task after
     * @param answer
     */
    saveTask (answer) {
      this.taskLoaded = false
      const taskRun = {
        // required
        task_id: this.task.id,
        response: answer,
        user_id: this.userId
      }
      this.createSubmission(JSON.stringify(taskRun)).then(() => {
        // load a new task when current task saved
        this.newTask()
      })
    }
  }
}
</script>

<style scoped>

</style>
