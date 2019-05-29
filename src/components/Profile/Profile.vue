<template>
  <div>
    <ProfileHeader class="mt-4"></ProfileHeader>
    <ProfileEditor v-if="isInEditionMode" class="mt-4"></ProfileEditor>
    <ProfileView v-else class="mt-4"></ProfileView>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ProfileHeader from '@/components/Profile/ProfileHeader'
import ProfileView from '@/components/Profile/ProfileView'
import ProfileEditor from '@/components/Profile/ProfileEditor/ProfileEditor'

export default {
  name: 'Profile',
  components: {
    ProfileHeader,
    ProfileView,
    ProfileEditor
  },
  data: () => {
    return {

    }
  },
  computed: {
    ...mapState('user', {
      profile: state => state.infos,
      draftProjects: state => state.draftProjects,
      contributedProjects: state => state.contributedProjects,
      publishedProjects: state => state.publishedProjects,
      isInEditionMode: state => state.isInProfileEditionMode
    })
  },
  mounted () {

  }
}
</script>

<style scoped>

</style>
