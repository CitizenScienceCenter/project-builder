<template>
  <div>

    <!--
    <div class="margin-bottom">

      <h2 class="heading centered">Stats</h2>
      <p class="centered">
        stats missing here ....
      </p>

      <b-row>
        <b-col>
          <b-row align-h="between" align-v="start" v-if="stats">
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
        </b-col>
      </b-row>

    </div>
    -->

    <projectDescription></projectDescription>


  </div>
</template>

<script>
import { mapState } from 'vuex'
import projectDescription from '@/components/Project/ProjectDescription'

export default {
  name: 'ProjectInfoMenu',
  components: {projectDescription},
  computed: {
    ...mapState('c3s/project', [
      'stats'
    ])
  }
}
</script>

<style>

</style>
