<template>
  <div>
    <b-row>
      <b-col>
        <h2 class="mt-3 mb-3">Congratulations</h2>
        <p>You just created your project {{ selectedProject.name }}.</p>
        <p>Want to keep going? Set it up right now!</p>
        <b-btn variant="success" class="mt-3 mb-3" :to="{ name: 'task.builder.material', params: { id: selectedProject.id } }">Come on!</b-btn><br>
        <i>You can always leave it for later and visit your <b-link :to="{ name: 'project', params: { id: selectedProject.id } }">project's page</b-link></i>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'EndBuilder',
  computed: {
    ...mapState('project', [
      'selectedProject'
    ])
  }
}
</script>

<style scoped>

</style>
