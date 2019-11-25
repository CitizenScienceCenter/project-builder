<i18n>
  {
  "en": {

  "page-title": "Browse Task"

  }
  }
</i18n>

<template>
  <div>
    <breadcrumb :items="items"></breadcrumb>

    <app-content-section>
      <div class="content-subsection">
        <div class="content-wrapper">

          <div class="content-subsection">
            <div class="row row-centered">
              <div class="col scroll-effect">

                <h2 class="heading centered">Browse Tasks</h2>

                <p>This page shows all the available tasks for this project.</p>
                <p>For each task, you can find the following information:</p>

                <ul>
                  <li><b>Task</b> <b-badge variant="primary">#0000</b-badge> This number identifies the task for the project and it is unique</li>
                  <li><b>0 of 30:</b> The first number shows how many answers have been submitted for the task and the second number how many need to be obtained to mark the task as completed</li>
                  <li><b>Progress Bar:</b> The progress progress bar shows the percentage that has been completed for the task</li>
                </ul>

                <b-list-group>
                  <b-list-group-item :key="task.id" v-for="task in tasks">
                    <b-row>
                      <b-col md="3">
                        Task <b-badge variant="primary">#{{ task.id }}</b-badge>&ensp;&ensp;&ensp;{{ task.n_task_runs }} of {{ task.n_answers }}
                      </b-col>
                      <b-col md="9">
                        <b-progress :value="task.n_task_runs / task.n_answers" :max="1"></b-progress>
                      </b-col>
                    </b-row>
                  </b-list-group-item>
                </b-list-group>


              </div>
            </div>
          </div>

        </div>
      </div>
    </app-content-section>

    <app-footer></app-footer>

    <b-row>
      <b-col>
        <b-breadcrumb :items="items"></b-breadcrumb>
        <!--<b-link :to="{ name: 'project', params: { id: 'id' in selectedProject ? selectedProject.id : 0 } }">Go back to the project</b-link>-->

        <h2 class="mt-2">Browse tasks</h2>
        <p>This page shows all the available tasks for this project.</p>
        <p>For each task, you can find the following information:</p>

        <ul>
          <li><b>Task</b> <b-badge variant="primary">#0000</b-badge> This number identifies the task for the project and it is unique</li>
          <li><b>0 of 30:</b> The first number shows how many answers have been submitted for the task and the second number how many need to be obtained to mark the task as completed</li>
          <li><b>Progress Bar:</b> The progress progress bar shows the percentage that has been completed for the task</li>
        </ul>

        <b-list-group>
          <b-list-group-item :key="task.id" v-for="task in tasks">
            <b-row>
              <b-col md="3">
                Task <b-badge variant="primary">#{{ task.id }}</b-badge>&ensp;&ensp;&ensp;{{ task.n_task_runs }} of {{ task.n_answers }}
              </b-col>
              <b-col md="9">
                <b-progress :value="task.n_task_runs / task.n_answers" :max="1"></b-progress>
              </b-col>
            </b-row>
          </b-list-group-item>
        </b-list-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import ContentSection from '@/components/shared/ContentSection.vue';
import Footer from '@/components/shared/Footer.vue';
import Breadcrumb from "@/components/Breadcrumb";

export default {
  name: 'TaskList',
  metaInfo: function() {
    return {
      title: this.$t('page-title'),
      meta: [
        {
          property: 'og:title',
          content: this.$t('page-title'),
          template: '%s | '+this.$t('site-title')
        }
      ]
    }
  },
  components: {
    Breadcrumb,
    'app-content-section': ContentSection,
    'app-footer': Footer
  },
  created () {
    this.getProject(this.pid).then(() => {
      this.getProjectTasks(this.pid)
    })
  },
  props: {
    pid: {
      required: true
    }
  },
  computed: {
    ...mapState('c3s/project', [
      'project',
      'tasks'
    ]),

    items () {
      return [
        {
          //html: '<i class="fas fa-home"></i>&ensp;<span>Project</span>',
          text: 'Project',
          to: { name: 'project', params: { pid: 'id' in this.project ? this.project.id : 0 } }
        },
        {
          text: 'Browse Tasks',
          to: { name: 'project.tasks.list', params: { pid: 'id' in this.project ? this.project.id : 0 } },
          active: true
        }
      ]
    }
  },
  methods: {
    ...mapActions('c3s/project', [
      'getProject',
      'getProjectTasks'
    ]),
  }
}
</script>

<style scoped>

</style>
