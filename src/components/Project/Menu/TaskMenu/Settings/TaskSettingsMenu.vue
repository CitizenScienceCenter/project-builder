<i18n>
  {
  "en": {

  "page-title": "Task Settings"

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
              <div class="col col-6 scroll-effect">

                <h2 class="heading centered">Task settings</h2>


                <b-row class="mt-4">
                  <b-col md="6">
                    <b-card
                            header="Task Scheduler"
                            border-variant="primary"
                            header-bg-variant="primary"
                            header-text-variant="white"
                            align="center"
                    >
                      <b-card-text>Change how the tasks are delivered to volunteers</b-card-text>
                      <b-button ref="btn-scheduler" :to="{ name: 'project.task.settings.scheduler', params: { id } }" variant="outline-primary">Scheduler</b-button>
                    </b-card>
                  </b-col>

                  <b-col md="6" class="mt-4 mt-md-0">
                    <b-card
                            header="Task Priority"
                            border-variant="primary"
                            header-bg-variant="primary"
                            header-text-variant="white"
                            align="center"
                    >
                      <b-card-text>Change the priority of the tasks</b-card-text>
                      <b-button ref="btn-priority" :to="{ name: 'project.task.settings.priority', params: { id } }" variant="outline-primary">Priority</b-button>
                    </b-card>
                  </b-col>
                </b-row>

                <b-row class="mt-4">
                  <b-col md="6">
                    <b-card
                            header="Delete Tasks"
                            border-variant="primary"
                            header-bg-variant="primary"
                            header-text-variant="white"
                            align="center"
                    >
                      <b-card-text>Delete all the tasks and associated answers</b-card-text>
                      <b-button ref="btn-delete" :to="{ name: 'project.task.settings.delete', params: { id } }" variant="outline-primary">Delete</b-button>
                    </b-card>
                  </b-col>

                  <b-col md="6" class="mt-4 mt-md-0">
                    <b-card
                            header="Tasks Redundancy"
                            border-variant="primary"
                            header-bg-variant="primary"
                            header-text-variant="white"
                            align="center"
                    >
                      <b-card-text>Change the redundancy level for the tasks</b-card-text>
                      <b-button ref="btn-redundancy" :to="{ name: 'project.task.settings.redundancy', params: { id } }" variant="outline-primary">Redundancy</b-button>
                    </b-card>
                  </b-col>
                </b-row>



              </div>
            </div>
          </div>

        </div>
      </div>
    </app-content-section>

    <app-footer></app-footer>




    <b-breadcrumb :items="items"></b-breadcrumb>

    <b-row class="mt-4">
      <b-col>
        <h2>Task settings</h2>

        <b-row class="mt-4">
          <b-col md="6">
            <b-card
                    header="Task Scheduler"
                    border-variant="primary"
                    header-bg-variant="primary"
                    header-text-variant="white"
                    align="center"
            >
              <b-card-text>Change how the tasks are delivered to volunteers</b-card-text>
              <b-button ref="btn-scheduler" :to="{ name: 'project.task.settings.scheduler', params: { id } }" variant="outline-primary">Scheduler</b-button>
            </b-card>
          </b-col>

          <b-col md="6" class="mt-4 mt-md-0">
            <b-card
                    header="Task Priority"
                    border-variant="primary"
                    header-bg-variant="primary"
                    header-text-variant="white"
                    align="center"
            >
              <b-card-text>Change the priority of the tasks</b-card-text>
              <b-button ref="btn-priority" :to="{ name: 'project.task.settings.priority', params: { id } }" variant="outline-primary">Priority</b-button>
            </b-card>
          </b-col>
        </b-row>

        <b-row class="mt-4">
          <b-col md="6">
            <b-card
                    header="Delete Tasks"
                    border-variant="primary"
                    header-bg-variant="primary"
                    header-text-variant="white"
                    align="center"
            >
              <b-card-text>Delete all the tasks and associated answers</b-card-text>
              <b-button ref="btn-delete" :to="{ name: 'project.task.settings.delete', params: { id } }" variant="outline-primary">Delete</b-button>
            </b-card>
          </b-col>

          <b-col md="6" class="mt-4 mt-md-0">
            <b-card
                    header="Tasks Redundancy"
                    border-variant="primary"
                    header-bg-variant="primary"
                    header-text-variant="white"
                    align="center"
            >
              <b-card-text>Change the redundancy level for the tasks</b-card-text>
              <b-button ref="btn-redundancy" :to="{ name: 'project.task.settings.redundancy', params: { id } }" variant="outline-primary">Redundancy</b-button>
            </b-card>
          </b-col>
        </b-row>

      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import ContentSection from '@/components/shared/ContentSection.vue';
import Footer from '@/components/shared/Footer.vue';
import Breadcrumb from "@/components/Breadcrumb";

export default {
  name: 'TaskSettingsMenu',
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
  props: {
    pid: {
      required: true
    }
  },
  created () {
    this.getProject(this.pid)
  },
  data: () => {
    return {

    }
  },
  methods: {
    ...mapActions('c3s/project', [
      'getProject'
    ])
  },
  computed: {
    ...mapState('c3s/project', [
      'project'
    ]),

    items () {
      return [
        {
          //html: '<i class="fas fa-home"></i>&ensp;<span>Project</span>',
          text: 'Project',
          to: { name: 'project', params: { pid: 'id' in this.project ? this.project.id : 0 } }
        },
        {
          text: 'Task Settings',
          to: { name: 'project.task.settings', params: { pid: 'id' in this.project ? this.project.id : 0 } },
          active: true
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
