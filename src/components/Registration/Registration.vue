<template>
  <b-row class="mt-4 justify-content-center">
    <b-col md="6" md-offset="3">

      <b-row v-if="isBirthDateVerified">
        <b-col>

          <h2>Registration</h2>

          <b-form @submit.prevent="submitRegistration" class="mt-4">
            <b-form-group
                    label="Full name"
                    label-for="fullname"
                    :state="nameValid(form.fullname)"
                    :invalid-feedback="nameFeedback">
              <b-input id="fullname" v-model="form.fullname" :state="nameValid(form.fullname)" placeholder="Full name"></b-input>
            </b-form-group>

            <b-form-group
                    label="User name"
                    label-for="username"
                    :state="nameValid(form.username)"
                    :invalid-feedback="nameFeedback">
              <b-input id="username" v-model="form.username" :state="nameValid(form.username)" placeholder="User name"></b-input>
            </b-form-group>

            <b-form-group
                    label="Email address"
                    label-for="email"
                    :state="emailValid"
                    :invalid-feedback="emailFeedback">
              <b-input id="email" type="email" v-model="form.email" :state="emailValid" placeholder="Email Address"></b-input>
            </b-form-group>

            <b-form-group label="Password"
                          label-for="password"
                          :state="passwordsValid"
                          :invalid-feedback="passwordFeedback">
              <b-input id="password" type="password" v-model="form.password" :state="passwordsValid" placeholder="New Password"></b-input>
            </b-form-group>

            <b-form-group
                    label="Password confirmation"
                    label-for="password-confirmation"
                    :state="passwordsValid"
                    :invalid-feedback="passwordFeedback">
              <b-input id="password-confirmation" type="password" v-model="form.passwordConfirmation" :state="passwordsValid" placeholder="Repeat Password"></b-input>
            </b-form-group>

            <!-- TODO: find how to send this information -->
            <!--<b-form-checkbox v-model="form.emailNotificationEnabled" name="notification">
              I accept receiving emails from C3S Dev
            </b-form-checkbox>-->

            <b-button class="mt-3" type="submit" variant="success">Submit</b-button>
          </b-form>

        </b-col>
      </b-row>

      <BirthDateChecker v-else></BirthDateChecker>

    </b-col>
  </b-row>
</template>

<script>
import { mapMutations, mapActions, mapState } from 'vuex'
import { getFormErrorsAsString, validateEmail } from '@/helper'
import BirthDateChecker from '@/components/Registration/BirthDateChecker'

export default {
  name: 'Registration',
  components: {
    BirthDateChecker
  },
  data: () => {
    return {
      form: {
        fullname: '',
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        emailNotificationEnabled: false
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
      this.register({
        fullname: this.form.fullname,
        name: this.form.username,
        email_addr: this.form.email,
        password: this.form.password,
        confirm: this.form.passwordConfirmation
      }).then(response => {
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
    },

    nameValid (name) {
      return name.length >= 3 && name.length <= 35
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

    emailValid () {
      return this.form.email.length >= 3 && this.form.email.length <= 254 && validateEmail(this.form.email)
    },

    emailFeedback () {
      return 'Email must be between 3 and 254 characters long'
    },

    passwordsValid () {
      return this.form.password === this.form.passwordConfirmation && this.form.password.length > 0
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
