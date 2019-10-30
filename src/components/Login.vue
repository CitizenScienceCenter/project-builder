<i18n>
  {
  "de": {

  "page-title": "Login",

  "label-email": "Email or Username",
  "label-password": "Passwort",
  "button-login": "Anmelden",
  "button-forgotten": "Passwort vergessen?"
  },
  "en": {

  "page-title": "Login",

  "label-email": "Email oder Benutzername",
  "label-password": "Password",
  "button-login": "Login",
  "button-forgotten": "Forgot Password?"
  }
  }
</i18n>


<template>
  <div>

    <app-content-section>
      <div class="content-wrapper">
        <div class="row row-centered">
          <div class="col col-large-6 col-xlarge-4 scroll-effect">
            <h2 class="heading centered">Login</h2>

            <div class="margin-bottom">
              <form @submit.prevent="onSubmit">
                <div class="form-field form-field-block">
                  <label for="email">{{ $t('label-email') }}</label>
                  <input ref="email" tabindex="90" v-model="form.email" type="email" name="email" id="email" autocomplete="email" />
                </div>

                <div class="form-field form-field-block">
                  <label for="password">{{ $t('label-password') }}</label>
                  <input tabindex="91" v-model="form.password" type="password" id="password" name="password" autocomplete="password" />
                </div>

                <div class="button-group right-aligned">
                  <a tabindex="93" @click.prevent="reset" class="button button-secondary button-secondary-naked">{{ $t('button-forgotten') }}</a>
                  <button tabindex="92" type="submit" class="button button-primary" :disabled="!form.email || !form.password">{{ $t('button-login') }}</button>
                </div>
                <!--
                <div class="form-message form-message-error" v-if="error">
                  <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M322.72,256,422.79,155.93a31.46,31.46,0,0,0,0-44.48L400.55,89.21a31.46,31.46,0,0,0-44.48,0L256,189.28,155.93,89.21a31.46,31.46,0,0,0-44.48,0L89.21,111.45a31.46,31.46,0,0,0,0,44.48L189.28,256,89.21,356.07a31.46,31.46,0,0,0,0,44.48l22.24,22.24a31.46,31.46,0,0,0,44.48,0L256,322.72,356.07,422.79a31.46,31.46,0,0,0,44.48,0l22.24-22.24a31.46,31.46,0,0,0,0-44.48Z"></path>
                    </svg>
                  </div>
                  <span class="text">{{error}}</span>
                </div>
                -->
              </form>
            </div>

            <p class="right-aligned reduced-bottom-margin">not registered yet?</p>
            <div class="button-group right-aligned">
              <router-link :to="{ name: 'register' }" class="button button-secondary">Register now</router-link>
            </div>

          </div>
        </div>
      </div>
    </app-content-section>

    <app-footer></app-footer>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import { validateEmail } from '@/utils.js'
import ContentSection from '@/components/shared/ContentSection.vue';
import Footer from '@/components/shared/Footer.vue';

export default {
  name: 'Login',
  components: {
    'app-content-section': ContentSection,
    'app-footer': Footer
  },
  metaInfo: function() {
    return {
      title: this.$t('page-title'),
      meta: [
        {
          property: 'og:title',
          content: this.$t('page-title'),
          template: '%s | '+this.$t('site-title')
        }
      ]
    }
  },
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
        if (response && response.status === 200) {
          /*
          this.showInfo({
            title: 'Welcome',
            content: 'We are happy to see you again!'
          })
           */
          this.$store.commit('c3s/user/SET_CURRENT_USER', response.body, {root: true});
          this.$store.commit('c3s/user/SET_ANON', false);
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
