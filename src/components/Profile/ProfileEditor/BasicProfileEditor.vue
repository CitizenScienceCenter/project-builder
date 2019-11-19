<i18n>
  {

  "en": {

  "label-email": "Email",
  "label-username": "Username",
  "label-firstname": "First Name",
  "label-lastname": "Last Name",
  "label-notifications": "Notifications",
  "label-center-notifications": "I want to receive information about the Citizen Science Center Zurich.",
  "label-project-notifications": "I want to receive information about this project.",
  "label-project-notifications-prefix": "I want to receive information about the",

  "label-project-snakes": "Snake ID Challenge",
  "label-project-hatespeech": "Hate Speech",
  "label-project-cohco": "Cause of Health",
  "label-project-mustelids": "Mustelid Wanted",

  "label-project-notifications-suffix": "Project.",

  "thanks": "Thanks for helping!",
  "button-reset": "Reset Password",
  "button-save": "Save",
  "button-save-message": "Saved",

  "error-username-empty": "Enter a Username",
  "error-username": "Username already in use."

  }

  }
</i18n>

<template>
  <div>

    <div class="form-field form-field-block">
      <label>{{ $t('label-email') }}</label>
      <p>{{ currentUser.email }}</p>
    </div>

    <div class="form-field form-field-block">
      <label>{{ $t('label-username') }}</label>
      <input v-model="form.username" id="reg-username" name="reg-email" autocomplete="new-password" />
      <span class="message error" v-if="errors.username">{{ $t("error-username") }}</span>
    </div>

    <div class="form-field form-field-block">
      <label>{{ $t('label-firstname') }}</label>
      <input v-model="form.firstname" autocomplete="new-password" placeholder="optional" />
      <!--<p>{{ currentUser.username }}</p>-->
    </div>

    <div class="form-field form-field-block">
      <label>{{ $t('label-lastname') }}</label>
      <input v-model="form.lastname" autocomplete="new-password" placeholder="optional" />
      <!--<p>{{ currentUser.username }}</p>-->
    </div>

    <div class="form-field form-field-block">
      <label for="notification-options">{{ $t("label-notifications") }}</label>
      <div class="options" id="notification-options">

        <label>
          <input type="checkbox" v-model="form.centerNotifications">
          <div class="checkbox">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
            </svg>
          </div>
          <span>{{ $t("label-center-notifications") }}</span>
        </label>

      </div>
    </div>

    <div class="button-group right-aligned">
      <submit-button @click="save()" :disabled="usernameCheckInProgress || !form.username || errors.username || !saveNeeded || saveInProgress" :submissionInfo="showSubmissionInfo" :infoMessage="$t('button-save-message')">{{ $t('button-save') }}</submit-button>
      <!-- <button class="button button-primary" @click.prevent="save()" :disabled="usernameCheckInProgress || !username || errors.username || !saveNeeded">{{ $t('button-save') }}</button> -->
    </div>


    <!--
    <b-form ref="form" @submit.prevent="onProfileSubmitted">

      <b-form-group
              label="Full name"
              label-for="fullname"
              description="Name and first name">
        <b-form-input
                id="fullname"
                v-model="form.fullname"
                type="text"
                required
                placeholder="Full name">
        </b-form-input>
      </b-form-group>

      <b-form-group
              label="User name"
              label-for="username"
              description="If you change your username you will be asked to sign in again.">
        <b-form-input
                id="username"
                v-model="form.username"
                type="text"
                required
                placeholder="User name">
        </b-form-input>
      </b-form-group>

      <b-form-group
              label="Email address"
              label-for="email"
              description="">
        <b-form-input
                id="email"
                v-model="form.email"
                type="email"
                required
                placeholder="Email address">
        </b-form-input>
      </b-form-group>

      <b-form-group
              label="Language"
              label-for="language"
              description="">
        <b-form-select
                id="language"
                v-model="form.language"
                :options="languages"
                required
                placeholder="Email address">
        </b-form-select>
      </b-form-group>

      <b-form-group
              label="Privacy"
              label-for="privacy"
              description="If enabled, it all your public pages and statistics will become private and will no longer be visible for other users.">
        <b-form-checkbox v-model="form.privacy" id="privacy" switch>
          Privacy setting {{ form.privacy ? 'enabled' : 'disabled' }}
        </b-form-checkbox>
      </b-form-group>

      <b-form-group
              label="E-mail notifications"
              label-for="email-notification"
              description="Enable it in order to receive updates whenever a project publishes an update via a blog post.">
        <b-form-checkbox v-model="form.emailNotification" id="email-notification" switch>
          Email notifications {{ form.emailNotification ? 'enabled' : 'disabled' }}
        </b-form-checkbox>
      </b-form-group>

      <b-button type="submit" variant="success" class="float-right">Save changes</b-button>

    </b-form>

    -->

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SubmitButton from "@/components/shared/SubmitButton";

export default {
  name: 'BasicProfileEditor',
  components: {SubmitButton},
  data: () => {
    return {
      form: {
        username: '',
        firstname: '',
        lastname: '',
        centerNotifications: false
      },
      errors: {
        username: false
      },
      usernameCheckTimeout: undefined,
      usernameCheckInProgress: false,

      saveNeeded: false,
      saveInProgress: false,
      showSubmissionInfo: false
    }
  },
  created () {
    /*
    this.getProfileUpdateOptions(this.profile).then(() => {
      this.form.fullname = this.formOptions.fullname
      this.form.email = this.formOptions.email_addr
      this.form.username = this.formOptions.name
      this.form.language = this.formOptions.locale
      this.form.privacy = this.formOptions.privacy_mode
      this.form.emailNotification = this.formOptions.subscribed
    })
     */
    this.form.username = this.currentUser.username;
    this.form.firstname = this.currentUser.info.firstname;
    this.form.lastname = this.currentUser.info.lastname;
    this.form.centerNotifications = this.currentUser.info['center-notifications'];
  },
  computed: {
    /*
    ...mapState('user', {
      profile: state => state.infos,
      formOptions: state => state.profileUpdateOptions.form ? state.profileUpdateOptions.form : {}
    }),
    */
    ...mapState({
      currentUser: state => state.c3s.user.currentUser
    })
  },
  watch: {
    'form.username'() {
      this.errors.username = false;

      if (this.form.username !== this.currentUser.username) {
        this.usernameCheckInProgress = true;
        clearTimeout(this.usernameCheckTimeout);
        var self = this;
        this.usernameCheckTimeout = setTimeout(function () {
          self.checkUsername();
          self.usernameCheckInProgress = false;
        }, 500);

        this.saveNeeded = true;
      }
    },
    'form.firstname'() {
      if (this.form.firstname !== this.currentUser.info.firstname) {
        this.saveNeeded = true;
      }
    },
    'form.lastname'() {
      if (this.form.lastname !== this.currentUser.info.lastname) {
        this.saveNeeded = true;
      }
    },
    'form.centerNotifications'(to, from) {
      if (this.form.centerNotifications !== this.currentUser.info['center-notifications']) {
        this.saveNeeded = true;
      }
    }
  },
  methods: {
    ...mapActions('user', [
      'updateProfile',
      'getProfileUpdateOptions'
    ]),

    getUserObject() {
      let info = JSON.parse(JSON.stringify(this.currentUser.info));

      info['firstname'] = this.form.firstname;
      info['lastname'] = this.form.lastname;
      info['center-notifications'] = this.form.centerNotifications;

      return {
        'username': this.form.username,
        'info': info
      };
    },
    checkUsername() {
      this.$store.dispatch('c3s/user/checkUsername', this.username ).then(res => {
        if( res.status === 200 ) {
          this.errors.username = true;
        }
      });
    },

    save() {
      console.log( 'save user ');
      console.log( this.currentUser.id );
      console.log( this.getUserObject() );
      this.saveInProgress = true;
      this.$store.dispatch('c3s/user/updateUser', [ this.currentUser.id, this.getUserObject() ] ).then(r => {

        console.log( r );
        this.$store.dispatch('c3s/user/validate').then(v => {

          console.log( v );

          this.showSubmissionInfo = true;
          let self = this;
          setTimeout( function() {
            self.showSubmissionInfo = false;
            self.saveNeeded = false;
            self.saveInProgress = false;
          }, 900 );

        });

      });
    }


    /*
    onProfileSubmitted () {
      const form = this.form
      this.updateProfile({
        user: this.profile,
        form: {
          fullname: form.fullname,
          name: form.username,
          email_addr: form.email,
          locale: form.language,
          privacy_mode: form.privacy,
          subscribed: form.emailNotification
        }
      })
    }
    */
  }
}
</script>

<style scoped>

</style>
