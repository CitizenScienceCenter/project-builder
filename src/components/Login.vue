<template>
  <div>
    <b-row class="mt-4 justify-content-center">
      <h2>Login</h2>
      <b-col cols="12">
        <b-row>
          <b-col cols="6" offset="3">
            <b-form @submit.prevent="onSubmit">
              <b-form-group
                      id="input-group-1"
                      label="Email address"
                      label-for="email"
                      description="We'll never share your email with anyone else.">
                <b-form-input
                        id="email"
                        v-model="form.email"
                        type="email"
                        required
                        placeholder="Email">
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
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'Login',
  created () {
    this.$store.dispatch('user/getAuthOptions')
  },
  data: () => {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('user/signIn', this.form)
    }
  },
  computed: {

  }
}
</script>

<style scoped>

</style>
