<template>
  <div>
    <b-row>
      <b-col>
        <h4>Import Tasks</h4>
        <p>Import tasks from templates, GDrive, or CSV</p>
        <b-btn variant="outline-info">Import</b-btn>

        <h4>Task Presenter</h4>
        <p>Edit the task presenter</p>
        <b-btn variant="outline-info">Editor</b-btn>

        <h4>Browse</h4>
        <p>Check the status of the tasks</p>
        <b-btn variant="outline-info">Browse</b-btn>
      </b-col>

      <b-col>
        <h4>Export Tasks</h4>
        <p>Export tasks to JSON, CSV, or a CKAN server</p>
        <b-btn variant="outline-info">Export</b-btn>

        <h4>Settings</h4>
        <p>Configure the task scheduler, redundancy, etc.</p>
        <b-btn variant="outline-info">Settings</b-btn>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'TaskMenu'
}
</script>

<style scoped>

</style>
