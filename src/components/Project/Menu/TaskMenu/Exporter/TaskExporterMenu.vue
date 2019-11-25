<template>
  <div>

    <breadcrumb :items="items"></breadcrumb>

    <app-content-section>
      <div class="content-subsection">
        <div class="content-wrapper">

          <div class="content-subsection">
            <div class="row row-centered">
              <div class="col col-6 scroll-effect">

                <p>You can export and download all the available Tasks and Task Runs (the submitted answers by the users) in CSV or JSON formats.</p>

                <h2 class="text-center">Export in CSV format</h2>

                <b-row class="mt-4">

                  <b-col md="4">
                    <b-card
                            header="Tasks"
                            border-variant="primary"
                            header-bg-variant="primary"
                            header-text-variant="white"
                            align="center"
                    >
                      <b-card-text>Export tasks in CSV format</b-card-text>
                      <b-button ref="btn-task-csv" @click="exportTasksInCsv(project)" variant="outline-primary">Export</b-button>
                    </b-card>
                  </b-col>

                  <b-col md="4" class="mt-4 mt-md-0">
                    <b-card
                            header="Task Runs"
                            border-variant="primary"
                            header-bg-variant="primary"
                            header-text-variant="white"
                            align="center"
                    >
                      <b-card-text>Export task runs in CSV format</b-card-text>
                      <b-button ref="btn-task-run-csv" @click="exportTaskRunsInCsv(project)" variant="outline-primary">Export</b-button>
                    </b-card>
                  </b-col>

                  <b-col md="4" class="mt-4 mt-md-0">
                    <b-card
                            header="Results"
                            border-variant="primary"
                            header-bg-variant="primary"
                            header-text-variant="white"
                            align="center"
                    >
                      <b-card-text>Export results in CSV format</b-card-text>
                      <b-button ref="btn-result-csv" @click="exportResultsInCsv(project)" variant="outline-primary">Export</b-button>
                    </b-card>
                  </b-col>

                </b-row>

                <h2 class="text-center mt-5">Export in JSON format</h2>

                <b-row class="mt-4">

                  <b-col md="4">
                    <b-card
                            header="Tasks"
                            border-variant="primary"
                            header-bg-variant="primary"
                            header-text-variant="white"
                            align="center"
                    >
                      <b-card-text>Export tasks in JSON format</b-card-text>
                      <b-button ref="btn-task-json" @click="exportTasksInJson(project)" variant="outline-primary">Export</b-button>
                    </b-card>
                  </b-col>

                  <b-col md="4" class="mt-4 mt-md-0">
                    <b-card
                            header="Task Runs"
                            border-variant="primary"
                            header-bg-variant="primary"
                            header-text-variant="white"
                            align="center"
                    >
                      <b-card-text>Export task runs in JSON format</b-card-text>
                      <b-button ref="btn-task-run-json" @click="exportTaskRunsInJson(project)" variant="outline-primary">Export</b-button>
                    </b-card>
                  </b-col>

                  <b-col md="4" class="mt-4 mt-md-0">
                    <b-card
                            header="Results"
                            border-variant="primary"
                            header-bg-variant="primary"
                            header-text-variant="white"
                            align="center"
                    >
                      <b-card-text>Export results in JSON format</b-card-text>
                      <b-button ref="btn-result-json" @click="exportResultsInJson(project)" variant="outline-primary">Export</b-button>
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

    <b-row class="mt-5">
      <b-col>

        <p>You can export and download all the available Tasks and Task Runs (the submitted answers by the users) in CSV or JSON formats.</p>

        <h2 class="text-center">Export in CSV format</h2>

        <b-row class="mt-4">

          <b-col md="4">
            <b-card
                    header="Tasks"
                    border-variant="primary"
                    header-bg-variant="primary"
                    header-text-variant="white"
                    align="center"
            >
              <b-card-text>Export tasks in CSV format</b-card-text>
              <b-button ref="btn-task-csv" @click="exportTasksInCsv(project)" variant="outline-primary">Export</b-button>
            </b-card>
          </b-col>

          <b-col md="4" class="mt-4 mt-md-0">
            <b-card
                    header="Task Runs"
                    border-variant="primary"
                    header-bg-variant="primary"
                    header-text-variant="white"
                    align="center"
            >
              <b-card-text>Export task runs in CSV format</b-card-text>
              <b-button ref="btn-task-run-csv" @click="exportTaskRunsInCsv(project)" variant="outline-primary">Export</b-button>
            </b-card>
          </b-col>

          <b-col md="4" class="mt-4 mt-md-0">
            <b-card
                    header="Results"
                    border-variant="primary"
                    header-bg-variant="primary"
                    header-text-variant="white"
                    align="center"
            >
              <b-card-text>Export results in CSV format</b-card-text>
              <b-button ref="btn-result-csv" @click="exportResultsInCsv(project)" variant="outline-primary">Export</b-button>
            </b-card>
          </b-col>

        </b-row>

        <h2 class="text-center mt-5">Export in JSON format</h2>

        <b-row class="mt-4">

          <b-col md="4">
            <b-card
                    header="Tasks"
                    border-variant="primary"
                    header-bg-variant="primary"
                    header-text-variant="white"
                    align="center"
            >
              <b-card-text>Export tasks in JSON format</b-card-text>
              <b-button ref="btn-task-json" @click="exportTasksInJson(project)" variant="outline-primary">Export</b-button>
            </b-card>
          </b-col>

          <b-col md="4" class="mt-4 mt-md-0">
            <b-card
                    header="Task Runs"
                    border-variant="primary"
                    header-bg-variant="primary"
                    header-text-variant="white"
                    align="center"
            >
              <b-card-text>Export task runs in JSON format</b-card-text>
              <b-button ref="btn-task-run-json" @click="exportTaskRunsInJson(project)" variant="outline-primary">Export</b-button>
            </b-card>
          </b-col>

          <b-col md="4" class="mt-4 mt-md-0">
            <b-card
                    header="Results"
                    border-variant="primary"
                    header-bg-variant="primary"
                    header-text-variant="white"
                    align="center"
            >
              <b-card-text>Export results in JSON format</b-card-text>
              <b-button ref="btn-result-json" @click="exportResultsInJson(project)" variant="outline-primary">Export</b-button>
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
  name: 'TaskExporterMenu',
  components: {
    Breadcrumb,
    'app-content-section': ContentSection,
    'app-footer': Footer
  },
  created () {
    this.getProject(this.pid)
  },
  data: () => {
    return {

    }
  },
  props: {
    pid: {
      required: true
    }
  },
  methods: {
    ...mapActions('c3s/project', [
      'getProject'
    ]),
    ...mapActions('task/exporter', [
      'exportTasksInCsv',
      'exportTaskRunsInCsv',
      'exportResultsInCsv',
      'exportTasksInJson',
      'exportTaskRunsInJson',
      'exportResultsInJson'
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
          to: { name: 'project', params: { pid: this.pid } }
        },
        {
          text: 'Task Exporter',
          disabled: true
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
