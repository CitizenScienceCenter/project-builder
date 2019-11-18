<i18n>
  {

  "en": {

  "page-title": "Registration",

  "label-email": "Email",
  "label-password": "Password",
  "label-password-repeat": "Repeat Password",

  "button-register": "Register",

  "error-empty": "Enter an email address.",
  "error-email": "Email already in use.",
  "error-email-format": "No valid email address",
  "error-username": "Username already in use.",
  "error-len": "Password needs to be at least 8 characters long.",
  "error-match": "Passwords don't match.",
  "error-server": "Server error occured",

  "notifications-label": "Notifications",
  "notifications-option-1": "I want to receive information about the Citizen Science Center Zurich.",
  "notifications-option-2": "I want to receive information about this project."

  },

  "de": {

  "page-title": "Registration",

  "label-email": "Email",
  "label-password": "Passwort",
  "label-password-repeat": "Passwort wiederholen",

  "button-register": "Registrieren",

  "error-empty": "Sie müssen eine E-Mail angeben.",
  "error-email": "Email bereits registriert.",
  "error-email-format": "Keine gültige E-Mail.",
  "error-username": "Benutzername bereits vergeben.",
  "error-len": "Muss mehr als 8 Zeichen lang sein.",
  "error-match": "Passwörter stimmen nicht überein.",
  "error-server": "Serverfehler aufgetreten.",

  "notifications-label": "Benachrichtigungen",
  "notifications-option-1": "Ich möchte Informationen zum Citizen Science Center Zurich erhalten.",
  "notifications-option-2": "Ich möchte Informationen zu diesem Projekt erhalten."

  }

  }
</i18n>


<template>

  <div>
    <app-content-section>
      <div class="content-wrapper">
        <div class="row row-centered">
          <div class="col col-large-6 col-xlarge-4 scroll-effect">
            <h2 class="heading centered">Registration</h2>

            <form @submit.prevent="register">
              <div class="form-field form-field-block">
                <label for="reg-email">{{ $t("label-email") }}</label>
                <input v-model="email" type="email" id="reg-email" name="reg-email" autocomplete="new-password" />
                <span class="message error" v-if="errors.empty">{{ $t("error-empty") }}</span>
                <span class="message error" v-if="errors.emailFormat">{{ $t("error-email-format") }}</span>
                <span class="message error" v-if="errors.email">{{ $t("error-email") }}</span>
              </div>
              <div class="form-field form-field-block">
                <label for="reg-username">Username</label>
                <input v-model="username" id="reg-username" name="reg-email" autocomplete="new-password" />
                <span class="message error" v-if="errors.username">{{ $t("error-username") }}</span>
              </div>
              <div class="form-field form-field-block">
                <label for="reg-password">{{ $t("label-password") }}</label>
                <input v-model="password" type="password" id="reg-password" name="reg-password" autocomplete="new-password" />
                <span class="message error" v-if="errors.len">{{ $t("error-len") }}</span>
              </div>
              <div class="form-field form-field-block">
                <label for="reg-password-2">{{ $t("label-password-repeat") }}</label>
                <input v-model="confPassword" type="password" id="reg-password-2" name="reg-password-2" autocomplete="new-password" />
                <span class="message error" v-if="errors.match">{{ $t("error-match") }}</span>
              </div>

              <div class="form-field form-field-block">
                <label for="notification-options">{{ $t("notifications-label") }}</label>
                <div class="options" id="notification-options">

                  <label>
                    <input type="checkbox" v-model="checkbox1">
                    <div class="checkbox">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
                      </svg>
                    </div>
                    <span>{{ $t("notifications-option-1") }}</span>
                  </label>

                  <!--
                  <label v-if="projectId !== '667461b5-353e-4dae-b83b-c59b0563133b'">
                    <input type="checkbox" v-model="checkbox2">
                    <div class="checkbox">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
                      </svg>
                    </div>
                    <span>{{ $t("notifications-option-2") }}</span>
                  </label>
                  -->

                </div>
              </div>

              <div class="button-group right-aligned">
                <button :disabled="!email || !password || errors.email || errors.empty || errors.len || errors.match || errors.password || errors.username" type="submit" class="button button-primary">{{ $t("button-register") }}</button>
              </div>

              <div class="form-message form-message-error" v-if="errors.server">
                <div class="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M322.72,256,422.79,155.93a31.46,31.46,0,0,0,0-44.48L400.55,89.21a31.46,31.46,0,0,0-44.48,0L256,189.28,155.93,89.21a31.46,31.46,0,0,0-44.48,0L89.21,111.45a31.46,31.46,0,0,0,0,44.48L189.28,256,89.21,356.07a31.46,31.46,0,0,0,0,44.48l22.24,22.24a31.46,31.46,0,0,0,44.48,0L256,322.72,356.07,422.79a31.46,31.46,0,0,0,44.48,0l22.24-22.24a31.46,31.46,0,0,0,0-44.48Z"></path>
                  </svg>
                </div>
                <span class="text">{{ $t("error-server") }}</span>
              </div>
            </form>

          </div>
        </div>
      </div>
    </app-content-section>

    <app-footer></app-footer>



    <b-row class="mt-4 justify-content-center">
      <b-col md="6" md-offset="3">
        <b-row>
          <b-col>
            <h2>Registration</h2>

            <b-form ref="form-registration" @submit.prevent="submitRegistration" class="mt-4">
              <!-- Full name -->
              <b-form-group label="Full name" label-for="fullname" :invalid-feedback="nameFeedback">
                <b-input
                  id="fullname"
                  v-model="form.info.fullname"
                  @input="fieldUpdated('fullname')"
                  placeholder="Full name"
                ></b-input>
              </b-form-group>

              <!-- User name -->
              <b-form-group
                label="User name"
                label-for="username"
                :state="nameValid('username')"
                :invalid-feedback="nameFeedback"
              >
                <b-input
                  id="username"
                  v-model="form.username"
                  @input="fieldUpdated('username')"
                  placeholder="User name"
                ></b-input>
              </b-form-group>

              <!-- Email -->
              <b-form-group
                label="Email address"
                label-for="email"
                :state="emailValid"
                :invalid-feedback="emailFeedback"
              >
                <b-input
                  id="email"
                  type="email"
                  v-model="form.email"
                  @input="fieldUpdated('email')"
                  placeholder="Email address"
                ></b-input>
              </b-form-group>

              <!-- Password -->
              <b-form-group
                label="Password"
                label-for="password"
                :state="passwordsValid"
                :invalid-feedback="passwordFeedback"
              >
                <b-input
                  id="password"
                  type="password"
                  v-model="form.password"
                  @input="fieldUpdated('password')"
                  placeholder="New password"
                ></b-input>
              </b-form-group>

              <!-- Password confirmation -->
              <b-form-group
                label="Password confirmation"
                label-for="password-confirmation"
                :state="passwordsValid"
                :invalid-feedback="passwordFeedback"
              >
                <b-input
                  id="password-confirmation"
                  type="password"
                  v-model="form.passwordConfirmation"
                  @input="fieldUpdated('password')"
                  placeholder="Repeat password"
                ></b-input>
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

  </div>

</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";
import { getFormErrorsAsString, validateEmail } from "@/helper";

import ContentSection from '@/components/shared/ContentSection.vue';
import Footer from '@/components/shared/Footer.vue';

export default {
  name: "Registration",
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
  data: () => {
    return {
      form: {
        info: {
          fullname: "",
          emailNotificationEnabled: false
        },
        username: "",
        email: "",
        password: "",
        passwordConfirmation: ""
      },

      firstInteractions: {
        fullname: true,
        username: true,
        email: true,
        password: true
      },

      email: "",
      username: '',
      password: "",
      confPassword: "",
      checkbox1: true,
      checkbox2: true,
      userSaved: false,
      errors: {
        empty: false,
        emailFormat: false,
        email: false,
        username: false,
        match: false,
        len: false,
        server: false
      },
      emailCheckTimeout: undefined,
      usernameCheckTimeout: undefined
    };
  },
  watch: {
    email() {
      this.username = this.email.split('@')[0];

      this.errors.email = false;
      clearTimeout( this.emailCheckTimeout );
      var self = this;
      this.emailCheckTimeout = setTimeout( function() {
        self.checkEmailFormat();
        self.checkEmail();
      }, 500);
    },
    username() {
      this.errors.username = false;
      clearTimeout( this.usernameCheckTimeout );
      var self = this;
      this.usernameCheckTimeout = setTimeout( function() {
        self.checkUsername();
      }, 500);
    },
    password() {
      if( this.password.length < 8 ) {
        this.errors.len = true;
      }
      else {
        this.errors.len = false;
      }
    },
    confPassword() {
      if( this.confPassword !== this.password ) {
        this.errors.match = true;
      }
      else {
        this.errors.match = false;
      }
    }
  },
  methods: {
    checkUsername() {
      this.$store.dispatch('c3s/user/checkUsername', this.username ).then(res => {
        if( res.status === 200 ) {
          this.errors.username = true;
        }

        //this.$store.commit('c3s/user/SET_ANON', true);
      });
    },
    checkEmailFormat() {
      var re = /\S+@\S+\.\S+/;
      if( re.test(this.email) ) {
        this.errors.emailFormat = false;
      }
      else {
        this.errors.emailFormat = true;
      }
    },
    checkEmail() {
      this.$store.dispatch('c3s/user/checkUseremail', this.email ).then(res => {
        if( res.status === 200 ) {
          // email already registered
          this.errors.email = true;
        }

        //this.$store.commit('c3s/user/SET_ANON', true);
      });
    },
    register() {
      this.errors.server = false;
      this.errors.username = false;

      const user = {
        email: this.email,
        username: this.username,
        pwd: this.password,
        info: {
          'anonymous': false,
          'center-notifications': this.checkbox1
        }
      };

      if( this.projectId && this.checkbox2 ) {
        user.info['project-notifications'] = [ this.projectId ];
      }

      this.$store.dispatch('c3s/user/register', user).then(r => {

        if (r.ok === true) {
          this.$router.push({ name: 'home' });
        }
        else {
          this.errors.server = true;
        }
      })
    },

    ...mapMutations("notification", ["showError", "showSuccess"]),
    //...mapActions("user", ["register", "getAccountProfile"]),

    submitRegistration() {
      this.firstInteractions = {
        fullname: false,
        username: false,
        email: false,
        password: false
      };

      if (
        this.nameValid("username") &&
        this.emailValid &&
        this.passwordsValid
      ) {
        this.register({
          info: {
            fullname: this.form.fullname
          },
          username: this.form.username,
          email: this.form.email,
          pwd: this.form.password
        }).then(response => {
          this.showSuccess({
            title: "Success",
            content: response.msg
          });
          if (this.userLogged) {
            this.$router.push({ name: "home" });
          }
        }).catch((err) => {
          // TODO show response and timeout in 2 secs
        });
      } else {
        this.showError({
          title: "Incomplete form",
          content: "Some fields are not validated"
        });
      }
    },

    nameValid(fieldName) {
      const name = this.form[fieldName];
      return (
        this.firstInteractions[fieldName] ||
        (name.length >= 3 && name.length <= 35)
      );
    },

    fieldUpdated(fieldName) {
      this.firstInteractions[fieldName] = false;
    }
  },
  computed: {
    ...mapState("user", {
      userLogged: state => state.logged,
      isBirthDateVerified: state => state.isBirthDateVerified
    }),

    nameFeedback() {
      return "The field must be between 3 and 35 characters long";
    },

    // email validation
    emailValid() {
      return (
        this.firstInteractions.email ||
        (this.form.email.length >= 3 &&
          this.form.email.length <= 254 &&
          validateEmail(this.form.email))
      );
    },
    emailFeedback() {
      return "Email must be between 3 and 254 characters long and must be a valid email address";
    },

    // password validation
    passwordsValid() {
      return (
        this.firstInteractions.password ||
        (this.form.password === this.form.passwordConfirmation &&
          this.form.password.length > 0)
      );
    },
    passwordFeedback() {
      if (this.form.password.length === 0) {
        return "The password cannot be empty";
      } else {
        return "Passwords must match";
      }
    }
  }
};
</script>

<style scoped>
</style>
