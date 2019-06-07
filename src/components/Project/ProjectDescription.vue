<template>
  <b-row>
    <b-col>
      <h4 class="mt-3">WHAT AND WHY</h4>
      <p>{{ description.whatWhy }}</p>

      <h4 class="mt-3">HOW</h4>
      <p>{{ description.how }}</p>

      <h4 class="mt-3">WHO</h4>
      <p>{{ description.who }}</p>

      <h4 class="mt-3">KEEP TRACK</h4>
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
    ...mapState('project', {
      project: state => state.selectedProject
    })
  },
  created () {
    if (this.project.hasOwnProperty('long_description')) {
      this.description = JSON.parse(this.project.long_description)
    }
  },
  watch: {
    project (project) {
      // test if the object is initialized to parse the long description
      if (project.hasOwnProperty('long_description')) {
        this.description = JSON.parse(project.long_description)
      }
    }
  }
}
</script>

<style scoped>

</style>
