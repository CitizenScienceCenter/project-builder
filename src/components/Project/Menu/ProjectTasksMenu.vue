<template>
  <div>
    <b-row>
      <b-col>

        <div>
          <h4>Import Tasks</h4>
          <p>Import tasks from templates, GDrive, or CSV</p>
          <b-btn variant="outline-primary">Import</b-btn>
        </div>

        <div class="mt-4">
          <h4>Task Presenter</h4>
          <p>Edit the task presenter</p>
          <b-btn v-if="taskPresenter" variant="outline-primary" :to="{ name: 'project.task.presenter.editor', params: { id: 'id' in project ? project.id : 0 } }">Editor</b-btn>
          <b-btn v-else variant="outline-primary" :to="{ name: 'project.task.presenter.settings', params: { id: 'id' in project ? project.id : 0 } }">Editor</b-btn>
        </div>

        <div class="mt-4">
          <h4>Browse</h4>
          <p>Check the status of the tasks</p>
          <b-btn variant="outline-primary" :to="{ name: 'project.tasks.list' }">Browse</b-btn>
        </div>

      </b-col>

      <b-col>

        <div>
          <h4>Export Tasks</h4>
          <p>Export tasks to JSON, CSV, or a CKAN server</p>
          <b-btn variant="outline-primary">Export</b-btn>
        </div>

        <div class="mt-4">
          <h4>Settings</h4>
          <p>Configure the task scheduler, redundancy, etc.</p>
          <b-btn variant="outline-primary">Settings</b-btn>
        </div>

      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ProjectTasksMenu',
  data: () => {
    return {

    }
  },
  computed: {
    ...mapState('project', {
      project: state => state.selectedProject
    }),
    // task presenter already loaded in the Project.vue component
    ...mapState('task', [
      'taskPresenter'
    ])
  }
}
</script>

<style scoped>

</style>
