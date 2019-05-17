<template>
  <div>
    <JobSelector v-if="!task.job" class="mt-4"></JobSelector>
    <JobEditor v-else class="mt-4"></JobEditor>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import JobSelector from '@/components/Task/Builder/JobSelector'
import JobEditor from '@/components/Task/Builder/JobEditor/JobEditor'

export default {
  name: 'JobBuilder',
  components: {
    JobEditor,
    JobSelector
  },
  computed: {
    ...mapState('task/builder', [
      'materialJobs', 'task', 'jobs'
    ])
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
