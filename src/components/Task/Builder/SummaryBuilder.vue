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
          <li>
            Links ({{ task.sourceContent.length }})
            <ul>
              <li :key="link" v-for="link in task.sourceContent">
                <b-link :href="link" target="_blank">{{ link }}</b-link>
              </li>
            </ul>
          </li>
        </ul>

        <b-btn @click="onSubmit" variant="success" size="lg">Create task</b-btn>
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
  },
  methods: {
    onSubmit () {
      console.log(this.task)
    }
  }
}
</script>

<style scoped>

</style>
