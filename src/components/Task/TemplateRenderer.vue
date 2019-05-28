<template>
  <div class="mt-4 mb-4">
    <component ref="presenter" v-if="presenter" :is="presenterComponent" :pybossa="this"></component>
    <div v-else class="text-center">
      <b-spinner variant="primary" style="width: 3rem; height: 3rem;" label="Task presenter loading..."></b-spinner>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'TemplateRenderer',
  props: {

  },
  mounted () {
    Vue.nextTick(() => {
      this.getTaskPresenter(this.project)
    })
  },
  data: () => {
    return {

    }
  },
  computed: {
    ...mapState('project', {
      // the current project where is displayed the task presenter
      project: state => state.selectedProject.hasOwnProperty('id')
        ? state.selectedProject
        : { id: 49, short_name: 'test_project' }, // default value for testing

      // user progress value in percent
      userProgress: state => state.selectedProjectUserProgress
    }),

    ...mapState('task', {
      // the currently displayed task in the presenter
      task: state => state.currentTask.hasOwnProperty('id')
        ? state.currentTask
        : { id: 70, info: { url_b: 'https://0000-images.s3.amazonaws.com/wfmmc/image-04-of-15.jpg' } },

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
      'getUserProgress'
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
