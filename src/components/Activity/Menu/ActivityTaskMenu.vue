<template>
  <div>
    <b-row>
      <b-col>

        <div>
          <h4>Import Tasks</h4>
          <p>Import tasks from templates, GDrive, or CSV</p>
          <b-btn variant="outline-primary" :to="{ name: 'activity.task.importers', params: { id: ('id' in activity) ? activity.id : 0 } }">Import</b-btn>
        </div>

        <div class="mt-4">
          <h4>Task Presenter</h4>
          <p>Edit the task presenter</p>
          <div class="d-inline-block" v-b-tooltip.hover title="This section is reserved for expert users having 'coding' skills">

            <b-button v-if="taskPresenter"
                      variant="outline-primary"
                      @click="goToEditor"
            >
              Editor
            </b-button>

            <b-button v-else
                      variant="outline-primary"
                      :to="{ name: 'activity.task.presenter.settings', params: { id: ('id' in activity) ? activity.id : 0 } }"
            >
              Editor
            </b-button>

          </div>
        </div>

        <div class="mt-4">
          <h4>Browse</h4>
          <p>Check the status of the tasks</p>
          <b-btn variant="outline-primary" :to="{ name: 'activity.tasks.list' }">Browse</b-btn>
        </div>

      </b-col>

      <b-col>

        <div>
          <h4>Export Tasks</h4>
          <p>Export tasks to JSON, CSV, or a CKAN server</p>
          <b-btn :to="{ name: 'activity.task.exporters', params: { id: ('id' in activity) ? activity.id : 0 } }" variant="outline-primary">Export</b-btn>
        </div>

        <div class="mt-4">
          <h4>Settings</h4>
          <p>Configure the task scheduler, redundancy, etc.</p>
          <b-btn :to="{ name: 'activity.task.settings', params: { id: ('id' in activity) ? activity.id : 0 } }" variant="outline-primary">Settings</b-btn>
        </div>

      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'ActivityTasksMenu',
  data: () => {
    return {

    }
  },
  computed: {
    ...mapState('activity', {
      activity: state => state.selectedActivity
    }),
    // task presenter already loaded in the Activity.vue component
    ...mapState('task', [
      'taskPresenter'
    ])
  },
  methods: {
    ...mapMutations('task', [
      'setUsingTemplate'
    ]),

    goToEditor () {
      this.setUsingTemplate(null)
      this.$router.push({ name: 'activity.task.presenter.editor', params: { id: 'id' in this.activity ? this.activity.id : 0 } })
    }
  }
}
</script>

<style scoped>

</style>
