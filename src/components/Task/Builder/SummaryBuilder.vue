<template>
  <div>
    <b-row class="mt-4">
      <b-col>
        <h2 class="text-center">Are you ready to rock?!</h2>
      </b-col>
    </b-row>

    <b-row class="mt-4">
      <b-col>
        <ul>
          <li>Material: {{ task.material }}</li>
          <li>Job: {{ task.job }}</li>
          <li>Template: {{ task.template }}</li>
          <li>Source: {{ task.source }}</li>
        </ul>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SummaryBuilder',
  computed: {
    ...mapState('task/builder', [
      'task'
    ])
  }
}
</script>

<style scoped>

</style>
