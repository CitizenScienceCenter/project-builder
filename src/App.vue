<template>
  <div id="app">
    <b-navbar :sticky="true" toggleable="lg" type="dark" variant="dark">

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
      <router-view/>
    </b-container>

    <!-- Notification toasts -->
    <b-toast
            :key="notification.id"
            v-for="notification in errorNotifications"
            toaster="b-toaster-bottom-center"
            :title="notification.message.title"
            variant="danger"
            @hidden="closeError(notification.id)"
            visible
            auto-hide-delay="6000">
      <span v-html="notification.message.content"></span>
    </b-toast>

    <b-toast
            :key="notification.id"
            v-for="notification in infoNotifications"
            toaster="b-toaster-bottom-center"
            :title="notification.message.title"
            variant="info"
            @hidden="closeInfo(notification.id)"
            visible
            auto-hide-delay="6000">
      <span v-html="notification.message.content"></span>
    </b-toast>

    <b-toast
            :key="notification.id"
            v-for="notification in successNotifications"
            toaster="b-toaster-bottom-center"
            :title="notification.message.title"
            variant="success"
            @hidden="closeSuccess(notification.id)"
            visible
            auto-hide-delay="6000">
      <span v-html="notification.message.content"></span>
    </b-toast>

  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'App',
  created () {
    // this.getAccountProfile()
  },
  computed: mapState({
    errorNotifications: state => state.notification.errorNotifications,
    infoNotifications: state => state.notification.infoNotifications,
    successNotifications: state => state.notification.successNotifications,

    userLogged: state => state.user.logged,
    userProfile: state => state.user.infos
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

<style>

</style>
