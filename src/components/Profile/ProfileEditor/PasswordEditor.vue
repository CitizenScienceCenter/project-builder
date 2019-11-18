<i18n>
  {

  "en": {

  "label-current-password": "Current Password",
  "label-new-password": "New Password",
  "label-new-password-confirmation": "New Password (confirmation)",

  "button-save-password": "Update Password"

  }

  }
</i18n>

<template>
  <div>

    <div class="form-field form-field-block">
      <label>{{ $t('label-current-password') }}</label>
      <input v-model="form.currentPassword" autocomplete="new-password" />
      <!--
      <span class="message error" v-if="errors.username">{{ $t("error-username") }}</span>
      -->
    </div>

    <div class="form-field form-field-block">
      <label>{{ $t('label-new-password') }}</label>
      <input v-model="form.newPassword" autocomplete="new-password" />
      <!--
      <span class="message error" v-if="errors.username">{{ $t("error-username") }}</span>
      -->
    </div>

    <div class="form-field form-field-block">
      <label>{{ $t('label-new-password-confirmation') }}</label>
      <input v-model="form.passwordConfirmation" autocomplete="new-password" />
      <!--
      <span class="message error" v-if="errors.username">{{ $t("error-username") }}</span>
      -->
    </div>

    <div class="button-group right-aligned">
      <submit-button @click="save()" :disabled="form.currentPassword || !form.newPassword || !form.newPassword">{{ $t('button-save-password') }}</submit-button>
      <!-- <button class="button button-primary" @click.prevent="save()" :disabled="usernameCheckInProgress || !username || errors.username || !saveNeeded">{{ $t('button-save') }}</button> -->
    </div>

  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import SubmitButton from "@/components/shared/SubmitButton";

export default {
  name: 'PasswordEditor',
  components: {SubmitButton},
  data: () => {
    return {
      form: {
        currentPassword: '',
        newPassword: '',
        passwordConfirmation: ''
      }
    }
  },
  computed: {
    ...mapState('user', {
      profile: state => state.infos
    }),

    passwordConfirmed () {
      return this.form.newPassword === this.form.passwordConfirmation
    }
  },
  methods: {
    ...mapActions('user', [
      'updatePassword'
    ], 'c3s/user', [
      'updateUser'
    ]),

    onSubmit () {
      if (this.passwordConfirmed) {
        const form = this.form
        this.updateUser({
          user: this.profile,
          form: {
            current_password: form.currentPassword,
            new_password: form.newPassword,
            confirm: form.passwordConfirmation
          }
        }).then(() => {
          // reset the form
          Object.keys(this.form).forEach(key => {
            this.form[key] = ''
          })
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
