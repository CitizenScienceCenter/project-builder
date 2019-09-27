<i18n>
  {
  "en": {
    "test: "test-with-i18n-tags"
  }
  }
</i18n>

<template>
  <div id="app">
    <app-header project-name="Community <br/>Projects" :languages="['en']" hide-login></app-header>

    <div class="content-area">


      <b-navbar toggleable="lg" type="dark" variant="dark">

        <b-container>
          <b-navbar-brand :to="{ name: 'home' }">Pybossa</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item :to="{ name: 'home' }">Home</b-nav-item>
              <b-nav-item :to="{ name: 'discover' }">Discover</b-nav-item>
              <b-nav-item :to="{ name: 'about' }">About</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">

              <b-nav-item v-if="!userLogged!==null" :to="{ name: 'login' }">Login</b-nav-item>
              <!--<b-nav-item v-if="!userLogged" :to="{ name: 'register' }">Register</b-nav-item>-->

              <b-nav-item-dropdown v-else right>
                <template slot="button-content">
                  <b-img v-if="userProfile.info" height="40" width="40" rounded="circle" :src="userProfile.info.avatar_url"></b-img>&ensp;
                  {{ userProfile.fullname }}
                </template>
                <b-dropdown-item :to="{ name: 'profile' }">Profile</b-dropdown-item>
                <b-dropdown-item :to="{ name: 'logout' }">Sign Out</b-dropdown-item>
              </b-nav-item-dropdown>

              <b-nav-item v-if="userLogged" :to="{ name: 'project.builder.name' }">
                <b-button>Create your project</b-button>
              </b-nav-item>

            </b-navbar-nav>
          </b-collapse>
        </b-container>

      </b-navbar>

      <b-container>
        <router-view/>
      </b-container>

      <!-- Notification toasts -->
      <b-toast
              :key="notification.id"
              header-class="h5"
              body-class="h6"
              v-for="notification in errorNotifications"
              toaster="b-toaster-top-center"
              :title="notification.message.title"
              variant="danger"
              @hidden="closeError(notification.id)"
              visible
              auto-hide-delay="4000">
        <span v-html="notification.message.content"></span>
      </b-toast>

      <b-toast
              :key="notification.id"
              header-class="h5"
              body-class="h6"
              v-for="notification in infoNotifications"
              toaster="b-toaster-top-center"
              :title="notification.message.title"
              variant="info"
              @hidden="closeInfo(notification.id)"
              visible
              auto-hide-delay="4000">
        <span v-html="notification.message.content"></span>
      </b-toast>

      <b-toast
              :key="notification.id"
              header-class="h5"
              body-class="h6"
              v-for="notification in successNotifications"
              toaster="b-toaster-top-center"
              :title="notification.message.title"
              variant="success"
              @hidden="closeSuccess(notification.id)"
              visible
              auto-hide-delay="4000">
        <span v-html="notification.message.content"></span>
      </b-toast>


    </div>
    <g-d-p-r></g-d-p-r>

  </div>
</template>

<script>

import { mapState, mapMutations, mapActions } from 'vuex'
import Header from "./components/shared/Header";
import GDPR from "./components/shared/GDPR";

export default {
  name: 'App',
    components: {
      GDPR,
        'app-header': Header
    },
    created (
    ) {
      console.log(this.userLogged);
    // this.getAccountProfile()
  },
  metaInfo () {
    return {
      title: 'Community Projects | Citizen Science Center Zurich',
      meta: [
        {
          name: 'description',
          content: 'Site Description'
        },
        {
          property: 'og:description',
          content: 'Site Description'
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:url',
          content: ''
        },
        {
          property: 'og:image',
          content: 'https://citizenscience.ch/img/citsci-promo.jpg'
        }
      ],
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        { rel: 'icon', type: 'image/png', href: '@/assets/shared/favicon-16x16png', sizes: '16x16' },
        { rel: 'icon', type: 'image/png', href: '@/assets/shared/favicon-32x32png', sizes: '32x32' }
      ]
    }
  },
  computed: mapState({
    errorNotifications: state => state.notification.errorNotifications,
    infoNotifications: state => state.notification.infoNotifications,
    successNotifications: state => state.notification.successNotifications,

    userLogged: state => state.c3s.user.currentUser,
    userProfile: state => state.c3s.user.currentUser
  }),
  methods: {
    ...mapMutations({
      closeError: 'notification/closeError',
      closeInfo: 'notification/closeInfo',
      closeSuccess: 'notification/closeSuccess'
    }),

    ...mapActions('user', [
      'getAccountProfile'
    ])
  }
}
</script>

<style lang="scss" src="@/styles/shared/main.scss"></style>

<style>

</style>
