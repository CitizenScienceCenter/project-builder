<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark">

      <b-container>
        <b-navbar-brand href="#">Pybossa</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/">Home</b-nav-item>
            <b-nav-item to="/discover">Discover</b-nav-item>
            <b-nav-item to="/about">About</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">

            <b-nav-item to="login">Login</b-nav-item>

            <b-nav-item-dropdown right>
              <template slot="button-content">User</template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
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
      <span>{{ notification.message.content }}</span>
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
      <span>{{ notification.message.content }}</span>
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
      <span>{{ notification.message.content }}</span>
    </b-toast>

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'App',
  computed: mapState({
    errorNotifications: state => state.notification.errorNotifications,
    infoNotifications: state => state.notification.infoNotifications,
    successNotifications: state => state.notification.successNotifications
  }),
  methods: mapMutations({
    closeError: 'notification/closeError',
    closeInfo: 'notification/closeInfo',
    closeSuccess: 'notification/closeSuccess'
  })
}
</script>

<style>

</style>
