<template>
  <b-row align-v="center">
    <b-col md="2">
      <b-img v-if="profile.info" :src="profile.info.avatar_url" rounded="circle" fluid-grow></b-img>
      <b-img v-else blank-color="#777" :blank="true" rounded="circle" fluid-grow></b-img>
    </b-col>
    <b-col md="4">
      <p class="h3">{{ profile.fullname }}</p>
      <b-btn v-if="!isInEditionMode" :to="{ name: 'profile.edition' }" variant="outline-primary">Edit your profile</b-btn>
      <b-btn v-else :to="{ name: 'profile' }">Go back to my profile</b-btn>
    </b-col>
    <b-col md="3">
      <p class="h1">#{{ profile.rank }}</p>
      <p>position in global ranking</p>
    </b-col>
    <b-col md="3">
      <p class="h1">{{ profile.total }}</p>
      <p>contributions to projects</p>
    </b-col>
  </b-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ProfileHeader',
  computed: {
    ...mapState('user', {
      profile: state => state.infos,
      isInEditionMode: state => state.isInProfileEditionMode
    })
  }
}
</script>

<style scoped>

</style>
