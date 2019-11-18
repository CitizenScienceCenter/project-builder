<template>
  <!-- TODO: find the differences with the info tab -->
  <b-row align-h="between" align-v="start">
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
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'projectStatisticsMenu',
  computed: {
    ...mapState('project', {
      stats: state => state.selectedprojectStats
    })
  }
}
</script>

<style scoped>

</style>
