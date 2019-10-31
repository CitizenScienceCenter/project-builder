

<template>
  <div>
    <p class="reduced-bottom-margin">
      You will get an email when your personal data is available for download.
      You will get access to your personal data, your contributions and all the projects you have created.
    </p>

    <div class="button-group centered">
      <!--<submit-button @click="save()">Export Data</submit-button>-->
      <button class="button button-secondary">Export Data</button>
      <!-- <button class="button button-primary" @click.prevent="save()" :disabled="usernameCheckInProgress || !username || errors.username || !saveNeeded">{{ $t('button-save') }}</button> -->
    </div>
    <!--
    <b-row>
      <b-col>
        <p>
          You will get an email when your personal data is available for download.
          You will get access to your personal data, your contributions and all the projects you have created
        </p>
        <b-btn ref="btn-submit" @click="onSubmit" variant="success" class="float-right">Export your data</b-btn>
      </b-col>
    </b-row>
    -->
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import SubmitButton from "@/components/shared/SubmitButton";

export default {
  name: 'ProfileDataExport',
  components: {SubmitButton},
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
