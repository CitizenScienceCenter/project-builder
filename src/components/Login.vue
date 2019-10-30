<template>
  <div>
    <b-row class="mt-4 justify-content-center">
      <b-col md="6" md-offset="3">

        <h2>Login</h2>

        <b-form class="mt-4" @submit.prevent="onSubmit">
          <b-form-group
                  id="input-group-1"
                  label="Email address or Username"
                  label-for="email">
            <b-form-input
                    id="email"
                    v-model="form.email"
                    type="text"
                    required
                    placeholder="Email/Username">
            </b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Password" label-for="password">
            <b-form-input
                    id="password"
                    type="password"
                    v-model="form.password"
                    required
                    placeholder="Password"
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
        </b-form>

      </b-col>
    </b-row>

    <b-row class="mt-4">
      <b-col>
        <p class="text-center">Not registered? <b-link :to="{ name: 'register' }">Sign up for free now</b-link></p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import { validateEmail } from '@/utils.js'
export default {
  name: 'Login',
  created () {
    // load the auth options
    if (this.user !== null) {
        if (this.logged) {
          this.$router.push({ name: 'home' })
        }
    }
  },
  data: () => {
    return {
      form: {
        email: '',
        password: ''
      },
      ...mapState({
        user: state => state.c3s.user.currentUser,
      })
    }
  },
  methods: {
    ...mapActions('user', [
      'getLoginOptions',
      'getAccountProfile',
      'signIn'
    ]),
    ...mapMutations('notification', [
      'showInfo', 'showError'
    ]),

    onSubmit () {
      if(!validateEmail(this.form.email)) {
        this.form['username'] = this.form.email
        delete this.form.email
      }
      this.signIn(this.form).then((response) => {
        if (response && response.statusCode === 200) {
          this.showInfo({
            title: 'Welcome',
            content: 'We are happy to see you again!'
          })
          this.$router.push({ name: 'home' })
        } else {
          this.showError({ title: 'Wrong credentials', content: 'Your email and/or your password are incorrect' })
        }
      })
    }
  },
  computed: {
    ...mapState('user', [
      'logged'
    ])
  }
}
</script>

<style scoped>

</style>
