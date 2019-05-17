<template>
  <div>
    <b-row class="mt-4">
      <b-col>
        <h2 class="text-center">Now's the time to select your source</h2>
        <b-btn @click="onSubmit" variant="success">Next</b-btn>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'SourceBuilder',
  methods: {
    ...mapMutations('task/builder', [
      'setStep'
    ]),

    onSubmit () {
      this.setStep({ step: 'source', value: true })
    }
  }
}
</script>

<style scoped>

</style>
