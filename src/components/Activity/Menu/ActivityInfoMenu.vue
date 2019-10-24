<template>
  <b-row>
    <b-col>
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

      <hr class="mt-5">

      <ActivityDescription></ActivityDescription>
    </b-col>
  </b-row>
</template>

<script>
import { mapState } from 'vuex'
import ActivityDescription from '@/components/Activity/ActivityDescription'

export default {
  name: 'ActivityInfoMenu',
  components: {ActivityDescription},
  computed: {
    ...mapState('activity', {
      stats: state => state.selectedActivityStats
    })
  }
}
</script>

<style scoped>

</style>
