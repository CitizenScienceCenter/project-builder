<template>
  <!-- TODO: find what to display in this component exactly -->
  <b-row align-h="between" align-v="center">
    <b-col>
      <b>{{ results.n_results }}</b><br>
      <span class="text-muted">results</span>
    </b-col>
  </b-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'projectResultsMenu',
  computed: {
    ...mapState('project', {
      results: state => state.selectedprojectResults
    })
  }
}
</script>

<style scoped>

</style>
