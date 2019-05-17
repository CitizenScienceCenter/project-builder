<template>
  <div>
    <b-row class="mt-4 mb-2">
      <b-col>
        <h2 class="text-center">{{ task.job | capitalize }}</h2>
        <b-link @click="goBack">Go back</b-link>
      </b-col>
    </b-row>

    <b-row v-if="task.job === jobs.classify">
      <b-col md="9">
        <JobClassifyEditor></JobClassifyEditor>
      </b-col>
      <b-col md="3">
        <p>Formulate simple questions and provide even simpler answer options!</p>
        <p>If our template doesn't exactly fit your project, you can always try our expert path. But remember: not for beginners!</p>
      </b-col>
    </b-row>

    <b-row v-if="task.job === jobs.describe">
      <b-col md="9">
        <JobDescribeEditor></JobDescribeEditor>
      </b-col>
      <b-col md="3">
        <p>If our template doesn't exactly fit your project, you can always try our expert path. But remember: not for beginners!</p>
      </b-col>
    </b-row>

    <b-row v-if="task.job === jobs.count">
      <b-col md="9">
        <JobCountEditor></JobCountEditor>
      </b-col>
      <b-col md="3">
        <p>Explain briefly what users should be counting. They will then be able to locate the things to be counted with dots on the image.</p>
        <p>If our template doesn't exactly fit your project, you can always try our expert path. But remember: not for beginners!</p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import JobClassifyEditor from '@/components/Task/Builder/JobEditor/JobClassifyEditor'
import JobCountEditor from '@/components/Task/Builder/JobEditor/JobCountEditor'
import JobDescribeEditor from '@/components/Task/Builder/JobEditor/JobDescribeEditor'

export default {
  name: 'JobEditor',
  components: {
    JobDescribeEditor,
    JobCountEditor,
    JobClassifyEditor
  },
  computed: {
    ...mapState('task/builder', [
      'task', 'jobs'
    ])
  },
  methods: {
    ...mapMutations('task/builder', [
      'setTaskJob'
    ]),

    goBack () {
      this.setTaskJob(null)
    }
  },
  filters: {
    capitalize: (value) => {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>

<style scoped>

</style>
