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
      <input v-model="form.currentPassword" type="password" autocomplete="new-password" />
      <!--
      <span class="message error" v-if="errors.username">{{ $t("error-username") }}</span>
      -->
    </div>

    <div class="form-field form-field-block">
      <label>{{ $t('label-new-password') }}</label>
      <input v-model="form.newPassword" type="password" autocomplete="new-password" />
      <!--
      <span class="message error" v-if="errors.username">{{ $t("error-username") }}</span>
      -->
    </div>

    <div class="form-field form-field-block">
      <label>{{ $t('label-new-password-confirmation') }}</label>
      <input v-model="form.passwordConfirmation" type="password" autocomplete="new-password" />
      <!--
      <span class="message error" v-if="errors.username">{{ $t("error-username") }}</span>
      -->
    </div>

    <div class="button-group right-aligned">
      <submit-button @click="onSubmit()" :disabled="form.currentPassword === '' || form.newPassword === '' || form.passwordConfirmation === '' || !passwordConfirmed">{{ $t('button-save-password') }}</submit-button>
      <!-- <button class="button button-primary" @click.prevent="save()" :disabled="usernameCheckInProgress || !username || errors.username || !saveNeeded">{{ $t('button-save') }}</button> -->
    </div>

    <!--
    <b-form ref="form" @submit.prevent="onSubmit">

      <b-form-group
              label="Current password"
              label-for="current-password"
              description="">
        <b-form-input
                id="current-password"
                v-model="form.currentPassword"
                type="password"
                required
                placeholder="Current password">
        </b-form-input>
      </b-form-group>

      <b-form-group
              label="New password"
              label-for="new-password"
              description=""
              :state="passwordConfirmed"
              invalid-feedback="Password and password confirmation do not match">
        <b-form-input
                id="new-password"
                v-model="form.newPassword"
                type="password"
                required
                placeholder="New password">
        </b-form-input>
      </b-form-group>

      <b-form-group
              label="New password confirmation"
              label-for="password-confirmation"
              description=""
              :state="passwordConfirmed"
              invalid-feedback="Password and password confirmation do not match">
        <b-form-input
                id="password-confirmation"
                v-model="form.passwordConfirmation"
                type="password"
                placeholder="Password confirmation">
        </b-form-input>
      </b-form-group>

      <b-button type="submit" variant="success" class="float-right">Save the changes</b-button>

    </b-form>
    -->
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
    ...mapState({
      //profile: state => state.infos
      currentUser: state => state.c3s.user.currentUser
    }),

    passwordConfirmed () {
      return this.form.newPassword === this.form.passwordConfirmation
    }
  },
  methods: {
    ...mapActions('user', [
      'updatePassword'
    ]),

    onSubmit () {
      if (this.passwordConfirmed) {
        const form = this.form
        this.updatePassword({
          user: this.currentUser,
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
