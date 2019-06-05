<template>
  <b-row>
    <b-col>
      <p>
        We will get an email when the data is available to download.
        You will get access to your personal data, your contributions and the projects you have created
      </p>
      <b-btn ref="btn-submit" @click="onSubmit" variant="success" class="float-right">Export your data</b-btn>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'ProfileDataExport',
  computed: {
    ...mapState('user', {
      profile: state => state.infos
    })
  },
  methods: {
    ...mapActions('user', [
      'exportAccountData'
    ]),

    onSubmit () {
      this.exportAccountData(this.profile)
    }
  }
}
</script>

<style scoped>

</style>
