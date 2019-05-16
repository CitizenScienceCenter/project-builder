<template>
  <div>
    <h4 class="mt-3">WHAT AND WHY</h4>
    <p>{{ description.whatWhy }}</p>

    <h4 class="mt-3">HOW</h4>
    <p>{{ description.how }}</p>

    <h4 class="mt-3">WHO</h4>
    <p>{{ description.who }}</p>

    <h4 class="mt-3">KEEP TRACK</h4>
    <p>{{ description.keepTrack }}</p>
  </div>
</template>

<script>
export default {
  name: 'ProjectDescription',
  props: {
    content: {
      required: true
    }
  },
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
  created () {
  },
  watch: {
    content (newValue, oldValue) {
      if (typeof newValue !== 'undefined') {
        this.description = JSON.parse(this.content)
      }
    }
  }
}
</script>

<style scoped>

</style>
