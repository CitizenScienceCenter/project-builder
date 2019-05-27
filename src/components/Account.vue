<template>
  <b-row class="mt-4">
    <b-col>
      <h2>{{ infos.fullname }}</h2>
      <b-list-group class="mt-4">
        <b-list-group-item><b>API Key</b> : {{ infos.api_key }}</b-list-group-item>
        <b-list-group-item><b>Email</b> : {{ infos.email_addr }}</b-list-group-item>
        <b-list-group-item><b>Short name</b> : {{ infos.name }}</b-list-group-item>
        <b-list-group-item><b>Locale</b> : {{ infos.locale }}</b-list-group-item>
      </b-list-group>
    </b-col>
  </b-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Account',
  computed: {
    ...mapState('user', [
      'infos'
    ])
  }
}
</script>

<style scoped>

</style>
