<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark">

      <b-container>
        <b-navbar-brand href="#">Pybossa</b-navbar-brand>

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

            <b-nav-item-dropdown v-else right>
              <template slot="button-content">User</template>
              <b-dropdown-item :to="{ name: 'profile' }">Profile</b-dropdown-item>
              <b-dropdown-item :to="{ name: 'logout' }">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>

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
            auto-hide-delay="10000">
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
            auto-hide-delay="10000">
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
            auto-hide-delay="10000">
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
    userLogged: state => state.user.logged
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
