<template>
  <div>
    <div class="back-link-area centered">
        <router-link tag="button" class="button button-secondary button-secondary-naked button-icon" :to="{ name: 'project', params: { pid: this.pid } }">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M159.69,239l136-136a23.9,23.9,0,0,1,33.9,0l22.6,22.6a23.9,23.9,0,0,1,0,33.9L255.89,256l96.4,96.4a23.9,23.9,0,0,1,0,33.9L329.69,409a23.9,23.9,0,0,1-33.9,0l-136-136a23.93,23.93,0,0,1-.1-34Z"/></svg>
          Back to the Project Page
        </router-link>
        <router-link v-if="currentUser.info.isAdmin" tag="button" class="button button-secondary button-secondary-naked" :to="{ name: 'project.task.presenter.editor', params: { pid: this.pid, template: this.template } }">Edit Template</router-link>
    </div>

    <app-content-section class="templateRenderer">
      <div class="content-wrapper">

        <template v-if="taskPresenterExists">
          <component v-if="taskPresenterLoaded" ref="presenter" :is="presenterComponent" :pybossa="this"></component>
          <Loader v-else></Loader>
        </template>

        <template v-else>
          <div class="row row-centered">
            <div class="col">
              <p class="centered">
                The project does not contain a task presenter
              </p>
            </div>
          </div>
        </template>

      </div>
    </app-content-section>

    <app-footer></app-footer>

    <!--
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
    -->
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

import ContentSection from '@/components/shared/ContentSection.vue';
import Footer from '@/components/shared/Footer.vue';
import Loader from "@/components/shared/Loader";

export default {
  name: 'TemplateRenderer',
  props: {
    // project id
    pid: {
      required: true
    }
  },
  components: {
    Loader,
    'app-content-section': ContentSection,
    'app-footer': Footer,
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
      task: undefined,
      userProgress: 0
    }
  },
  computed: {
    ...mapState('c3s/project', {
      // the current project where is displayed the task presenter
      project: state => state.project,
      tasks: state => state.tasks,
    }),
    ...mapState('c3s/task', {
      media: state => state.media
    }),
    // user data
    ...mapState('c3s/user', {
      currentUser: state => state.currentUser,
      userId: state => state.currentUser.id,
      userApiKey: state => state.currentUser.api_key
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
      'createSubmissionWithObject'
    ]),

    ...mapActions('project', [
      'getUserProgress',
    ]),

    ...mapActions('osm', [
      'getLocalizationsWithQuery'
    ]),

    ...mapActions('c3s/project', [
      'getProject',
      'getProjectTasks',
      'getProjectTask'
    ]),
    ...mapActions('c3s/task', [
      'getTaskMedia'
    ]),

    ...mapMutations('notification', [
      'showError'
    ]),

    /**
     * Called when the dynamic component start
     */
    run () {
      this.getProjectTask({pid:this.pid, random: false, index: this.taskIndex}).then(t => {
        console.log(t)
      })
      this.getProjectTasks(this.pid).then((t) => {
        console.log(t);
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
        this.userProgress = (this.taskIndex/this.tasks.length) * 100
      } else {
        this.task = undefined
        this.userProgress = 100
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
      this.createSubmissionWithObject(JSON.stringify(taskRun)).then(() => {
        // load a new task when current task saved
        this.newTask()
      })
    }
  }
}
</script>

<style lang="scss">

  @import '@/styles/theme.scss';
  @import '@/styles/shared/variables.scss';

  .back-link-area {
    padding: $spacing-1 0;
    overflow-x: auto;
    background: linear-gradient(120deg, rgba($color-gradient-start, 0.025), rgba($color-gradient-end, 0.025));
  }

  .templateRenderer {
    img {
      min-width: 100%;
      border-radius: $border-radius;
    }
  }

</style>
