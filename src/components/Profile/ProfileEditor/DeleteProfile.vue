<template>
  <div>

    <div class="form-message form-message-centered form-message-error margin-bottom">
      <div class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M336,432a80,80,0,1,1-80-80A80.09,80.09,0,0,1,336,432ZM185.26,25.2l13.6,272a24,24,0,0,0,24,22.8h66.34a24,24,0,0,0,24-22.8l13.6-272a24,24,0,0,0-24-25.2H209.23A24,24,0,0,0,185.26,25.2Z"/></svg>
      </div>
      <span class="text">Danger Zone</span>
    </div>

    <p class="reduced-bottom-margin">
      When deleting your account, all your personal data will be removed from the server and third party services.
      Your contributions will be anonymized. This operation cannot be undone!
    </p>

    <p v-if="showConfirmation" class="centered reduced-bottom-margin">
      Are you sure?
    </p>

    <div class="button-group centered">
      <!--<submit-button @click="save()">Export Data</submit-button>-->
      <button v-if="!showConfirmation" class="button button-secondary" @click="showConfirmation = true">Delete your Account</button>
      <template v-else>
        <button class="button button-secondary button-secondary-naked" @click="showConfirmation = false">Cancel</button>
        <button class="button button-secondary" @click="onSubmit">Delete now</button>
      </template>
      <!-- <button class="button button-primary" @click.prevent="save()" :disabled="usernameCheckInProgress || !username || errors.username || !saveNeeded">{{ $t('button-save') }}</button> -->
    </div>
    <!--
    <b-row>
      <b-col>
        <b-alert variant="danger" :show="true">
          <b>Danger Zone!</b>
          When deleting your account, all your personal data will be removed from the server and third party services.
          Your contributions will be anonymized. This operation cannot be undone!
          <div class="text-center">
            <b-btn ref="btn-delete-account" v-b-modal.delete-account variant="danger" class="mt-3 mb-3">Delete my account</b-btn>
          </div>
        </b-alert>

        <b-modal ref="modal-submit" id="delete-account" title="Delete account" @ok="onSubmit">
          Are you sure you want to delete your account ?
          This operation cannot be undone!
        </b-modal>
      </b-col>
    </b-row>
    -->
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'DeleteProfile',
  data() {
    return {
      showConfirmation: false
    }
  },
  computed: {
    ...mapState('user', {
      profile: state => state.infos
    })
  },
  methods: {
    ...mapActions('user', [
      'deleteAccount'
    ]),

    onSubmit () {
      this.deleteAccount(this.profile).then(response => {
        if (response) {
          this.$router.push({ name: 'home' })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
