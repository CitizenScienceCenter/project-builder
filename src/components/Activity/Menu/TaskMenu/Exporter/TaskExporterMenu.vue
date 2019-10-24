<template>
  <div>
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
              <b-button ref="btn-task-csv" @click="exportTasksInCsv(activity)" variant="outline-primary">Export</b-button>
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
              <b-button ref="btn-task-run-csv" @click="exportTaskRunsInCsv(activity)" variant="outline-primary">Export</b-button>
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
              <b-button ref="btn-result-csv" @click="exportResultsInCsv(activity)" variant="outline-primary">Export</b-button>
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
              <b-button ref="btn-task-json" @click="exportTasksInJson(activity)" variant="outline-primary">Export</b-button>
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
              <b-button ref="btn-task-run-json" @click="exportTaskRunsInJson(activity)" variant="outline-primary">Export</b-button>
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
              <b-button ref="btn-result-json" @click="exportResultsInJson(activity)" variant="outline-primary">Export</b-button>
            </b-card>
          </b-col>

        </b-row>

      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'TaskExporterMenu',
  created () {
    this.getActivity(this.id)
  },
  data: () => {
    return {

    }
  },
  props: {
    id: {
      required: true
    }
  },
  methods: {
    ...mapActions('activity', [
      'getActivity'
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
    ...mapState('activity', {
      activity: state => state.selectedActivity
    }),

    items () {
      return [
        {
          html: '<i class="fas fa-home"></i>&ensp;<span>Activity</span>',
          to: { name: 'activity', params: { id: this.id } }
        },
        {
          text: 'Tasks exportation',
          disabled: true
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
