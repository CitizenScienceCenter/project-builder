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
  name: 'ActivityDescription',
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
    ...mapState('activity', {
      activity: state => state.selectedActivity
    })
  },
  created () {
    if (this.activity.hasOwnProperty('long_description')) {
      this.description = JSON.parse(this.activity.long_description)
    }
  },
  watch: {
    activity (activity) {
      // test if the object is initialized to parse the long description
      if (activity.hasOwnProperty('long_description')) {
        this.description = JSON.parse(activity.long_description)
      }
    }
  }
}
</script>

<style scoped>

</style>
