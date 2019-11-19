<template>
  <b-row>
    <b-col>
      <h4 class="mt-3">What & Why</h4>
      <p>{{ description.whatWhy }}</p>

      <h4 class="mt-3">How</h4>
      <p>{{ description.how }}</p>

      <h4 class="mt-3">Who</h4>
      <p>{{ description.who }}</p>

      <h4 class="mt-3">Keep Track</h4>
      <p>{{ description.keepTrack }}</p>
    </b-col>
  </b-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ProjectDescription',
  data () {
    return {
      description: {
        whatWhy: '',
        how: '',
        who: '',
        keepTrack: ''
      }
    }
  },
  computed: {
    ...mapState('c3s/project', [
      'project'
    ])
  },
  created () {
    if (this.project && this.project.hasOwnProperty('description')) {
      this.description = JSON.parse(this.project.description)
    }
  },
  watch: {
    project (project) {
      if (project.hasOwnProperty('description')) {
        this.description = JSON.parse(project.description)
      }
    }
  }
}
</script>

<style scoped>

</style>
