<template>
  <div>
    <b-row align-h="between" align-v="center">
      <b-col>
        <b>{{ stats.overall_progress ? stats.overall_progress : 0 }}</b><br>
        <span class="text-muted">published results</span>
      </b-col>
      <b-col>
        <b>{{ stats.n_tasks ? stats.n_tasks : 0 }}</b><br>
        <span class="text-muted">tasks</span>
      </b-col>
      <b-col>
        <b>{{ stats.n_volunteers ? stats.n_volunteers : 0 }}</b><br>
        <span class="text-muted">crafters</span>
      </b-col>
      <b-col>
        <b>{{ stats.n_completed_tasks ? stats.n_completed_tasks : 0 }}</b><br>
        <span class="text-muted">tasks done</span>
      </b-col>
      <b-col>
        <b>{{ stats.n_tasks - stats.n_completed_tasks }}</b><br>
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
  mounted () {
    if (this.project.hasOwnProperty('id')) {
      this.getStatistics(this.project)
    }
  },
  watch: {
    project (newVal, oldVal) {
      // tests if the selected project is loaded and get his stats
      if (newVal.hasOwnProperty('id')) {
        this.getStatistics(newVal)
      }
    }
  }
}
</script>

<style scoped>

</style>
