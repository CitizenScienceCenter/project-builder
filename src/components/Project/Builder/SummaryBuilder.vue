<template>
  <div>
    <b-row>
      <b-col>
        <h2 class="mt-3 mb-3">Congratulations</h2>
        <p>You just created your project {{ selectedproject.name }}.</p>
        <p>Want to keep going? Set it up right now!</p>
        <b-btn variant="success" class="mt-3 mb-3" :to="{ name: 'task.builder.material', params: { id: selectedproject.id } }">Come on!</b-btn><br>
        <i>You can always leave it for later and visit your <b-link :to="{ name: 'project', params: { id: selectedproject.id } }">project's page</b-link></i>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'SummaryBuilder',
  computed: {
    ...mapState('project', [
      'selectedproject'
    ])
  },
  mounted() {
    console.log('summary is here');
  }
}
</script>

<style scoped>

</style>
