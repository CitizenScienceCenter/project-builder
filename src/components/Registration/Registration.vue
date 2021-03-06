<template>
  <b-row class="mt-4 justify-content-center">
    <b-col md="6" md-offset="3">

      <b-row>
        <b-col>

          <h2>Registration</h2>

          <b-form ref="form-registration" @submit.prevent="submitRegistration" class="mt-4">

            <!-- Full name -->
            <b-form-group
                    label="Full name"
                    label-for="fullname"
                    :state="nameValid('fullname')"
                    :invalid-feedback="nameFeedback">

              <b-input id="fullname"
                       v-model="form.fullname"
                       @input="fieldUpdated('fullname')"
                       placeholder="Full name">
              </b-input>

            </b-form-group>

            <!-- User name -->
            <b-form-group
                    label="User name"
                    label-for="username"
                    :state="nameValid('username')"
                    :invalid-feedback="nameFeedback">

              <b-input id="username"
                       v-model="form.username"
                       @input="fieldUpdated('username')"
                       placeholder="User name">
              </b-input>

            </b-form-group>

            <!-- Email -->
            <b-form-group
                    label="Email address"
                    label-for="email"
                    :state="emailValid"
                    :invalid-feedback="emailFeedback">

              <b-input id="email"
                       type="email"
                       v-model="form.email"
                       @input="fieldUpdated('email')"
                       placeholder="Email address">
              </b-input>

            </b-form-group>

            <!-- Password -->
            <b-form-group label="Password"
                          label-for="password"
                          :state="passwordsValid"
                          :invalid-feedback="passwordFeedback">

              <b-input id="password"
                       type="password"
                       v-model="form.password"
                       @input="fieldUpdated('password')"
                       placeholder="New password">
              </b-input>

            </b-form-group>

            <!-- Password confirmation -->
            <b-form-group
                    label="Password confirmation"
                    label-for="password-confirmation"
                    :state="passwordsValid"
                    :invalid-feedback="passwordFeedback">

              <b-input id="password-confirmation"
                       type="password"
                       v-model="form.passwordConfirmation"
                       @input="fieldUpdated('password')"
                       placeholder="Repeat password">
              </b-input>

            </b-form-group>

            <!-- TODO: find how to send this information -->
            <!--<b-form-checkbox v-model="form.emailNotificationEnabled" name="notification">
              I accept receiving emails from C3S Dev
            </b-form-checkbox>-->

            <b-button class="mt-3" type="submit" variant="success">Submit</b-button>
          </b-form>

        </b-col>
      </b-row>

      <!-- <BirthDateChecker</BirthDateChecker> -->

    </b-col>
  </b-row>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
import { getFormErrorsAsString, validateEmail } from '@/helper'

export default {
  name: 'Registration',
  data: () => {
    return {
      form: {
        fullname: '',
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        emailNotificationEnabled: false
      },

      firstInteractions: {
        fullname: true,
        username: true,
        email: true,
        password: true
      }
    }
  },
  methods: {
    ...mapMutations('notification', [
      'showError', 'showSuccess'
    ]),
    ...mapActions('user', [
      'register', 'getAccountProfile'
    ]),

    submitRegistration () {
      this.firstInteractions = {
        fullname: false,
        username: false,
        email: false,
        password: false
      }

      if (this.nameValid('fullname') &&
        this.nameValid('username') &&
        this.emailValid &&
        this.passwordsValid
      ) {
        this.register({
          fullname: this.form.fullname,
          name: this.form.username,
          email_addr: this.form.email,
          password: this.form.password,
          confirm: this.form.passwordConfirmation
        }).then(response => {
          console.log(response)
          if ('form' in response && 'errors' in response.form) {
            this.showError({
              title: 'Incomplete form error',
              content: getFormErrorsAsString(response.form.errors)
            })
          } else {
            this.showSuccess({
              title: 'Success',
              content: response.flash
            })
            this.getAccountProfile().then(() => {
              if (this.userLogged) {
                this.$router.push({ name: 'home' })
              }
            })
          }
        })
      } else {
        this.showError({
          title: 'Incomplete form',
          content: 'Some fields are not validated'
        })
      }
    },

    nameValid (fieldName) {
      const name = this.form[fieldName]
      return this.firstInteractions[fieldName] || (name.length >= 3 && name.length <= 35)
    },

    fieldUpdated (fieldName) {
      this.firstInteractions[fieldName] = false
    }
  },
  computed: {
    ...mapState('user', {
      userLogged: state => state.logged,
      isBirthDateVerified: state => state.isBirthDateVerified
    }),

    nameFeedback () {
      return 'The field must be between 3 and 35 characters long'
    },

    // email validation
    emailValid () {
      return this.firstInteractions.email || (this.form.email.length >= 3 && this.form.email.length <= 254 && validateEmail(this.form.email))
    },
    emailFeedback () {
      return 'Email must be between 3 and 254 characters long and must be a valid email address'
    },

    // password validation
    passwordsValid () {
      return this.firstInteractions.password || (this.form.password === this.form.passwordConfirmation && this.form.password.length > 0)
    },
    passwordFeedback () {
      if (this.form.password.length === 0) {
        return 'The password cannot be empty'
      } else {
        return 'Passwords must match'
      }
    }
  }
}
</script>

<style scoped>

</style>
