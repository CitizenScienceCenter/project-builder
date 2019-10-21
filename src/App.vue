<template>
  <div id="app">
    <app-header project-name="Site <br/>Title" :languages="['en']"></app-header>

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

              <b-nav-item v-if="!userLogged" :to="{ name: 'login' }">Login</b-nav-item>
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
        <router-view></router-view>
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

const url = 'https://lab.citizenscience.ch';

export default {
  name: 'App',
    components: {
      GDPR,
        'app-header': Header
    },
    created (
    ) {
    // this.getAccountProfile()
  },
  metaInfo () {
    return {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: '',
      // all titles will be injected into this template
      titleTemplate: '%s | '+this.$t('site-title'),
      meta: [
        {
          name: 'description',
          content: this.$t('site-description')
        },
        {
          property: 'og:title',
          content: this.$t('site-title')
        },
        {
          property: 'og:description',
          content: this.$t('site-description')
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:url',
          content: url+this.$route.path
        },
        {
          property: 'og:image',
          content: url+'/img/promo.jpg'
        }
      ],
      link: [
        {rel: 'canonical', href: url+this.$route.path},
        { rel: 'icon', type: 'image/png', href: '@/assets/shared/favicon-16x16png', sizes: '16x16' },
        { rel: 'icon', type: 'image/png', href: '@/assets/shared/favicon-32x32png', sizes: '32x32' }
      ],
      htmlAttrs: {
        lang: this.language
      }
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

<!--
<style lang="scss" src="@/styles/undoBoostrap.scss"></style>
<style lang="scss" src="@/styles/shared/main.scss"></style>
-->

<style>

</style>
