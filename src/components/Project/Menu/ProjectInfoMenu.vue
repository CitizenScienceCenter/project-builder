<template>
  <div>
    <b-row align-h="between" align-v="center">
      <b-col>
        <b>{{ stats.hasOwnProperty('overall_progress') ? stats.overall_progress : 'NaN' }}</b><br>
        <span class="text-muted">published results</span>
      </b-col>
      <b-col>
        <b>{{ stats.hasOwnProperty('n_tasks') ? stats.n_tasks : 'NaN' }}</b><br>
        <span class="text-muted">tasks</span>
      </b-col>
      <b-col>
        <b>{{ stats.hasOwnProperty('n_volunteers') ? stats.n_volunteers : 'NaN' }}</b><br>
        <span class="text-muted">crafters</span>
      </b-col>
      <b-col>
        <b>{{ stats.hasOwnProperty('n_completed_tasks') ? stats.n_completed_tasks : 'NaN' }}</b><br>
        <span class="text-muted">tasks done</span>
      </b-col>
      <b-col>
        <b>{{ stats.hasOwnProperty('n_tasks') &&  stats.hasOwnProperty('n_completed_tasks') ? stats.n_tasks - stats.n_completed_tasks : 'NaN' }}</b><br>
        <span class="text-muted">pending tasks</span>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ProjectInfoMenu',
  methods: {
    ...mapActions('project', [
      'getStatistics'
    ])
  },
  computed: {
    ...mapState('project', {
      project: state => state.selectedProject,
      stats: state => state.selectedProjectStats
    })
  },
  watch: {
    project (project) {
      // tests if the selected project is loaded and get its stats
      if (Object.keys(project).length > 0) {
        this.getStatistics(project)
      }
    }
  }
}
</script>

<style scoped>

</style>
