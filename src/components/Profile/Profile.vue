<i18n>
  {
  "en": {

  "page-title": "Profil"

  },
  "de": {

  "page-title": "Profile"

  }
  }
</i18n>



<template>
  <div>

    <app-content-section>
      <div class="content-subsection">
        <div class="content-wrapper">
          <div class="row row-centered">
            <div class="col col-large-6 col-xlarge-4 scroll-effect">
              <h2 class="heading centered">Your Profile</h2>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <sub-section-stats :my-submission-count="3" :my-rank="3"></sub-section-stats>
            </div>
          </div>
        </div>
      </div>
      <div class="content-subsection scroll-effect scroll-effect-delayed-3">
        <tabbed-content>

          <tab>
            <template slot="title">Published Projects</template>
            <template slot="content">

              <div class="content-wrapper">
                <div class="row">
                  <div class="col">
                    <p class="centered">Published projects here ...</p>
                  </div>
                </div>
              </div>

            </template>
          </tab>

          <tab>
            <template slot="title">Draft Projects</template>
            <template slot="content">

              <div class="content-wrapper">
                <div class="row">
                  <div class="col">
                    <p class="centered">Draft projects here ...</p>
                  </div>
                </div>
              </div>

            </template>
          </tab>

          <tab>
            <template slot="title">Your Contributions</template>
            <template slot="content">

              <div class="content-wrapper">
                <div class="row">
                  <div class="col">
                    <p class="centered">Your contributions here ...</p>
                  </div>
                </div>
              </div>

            </template>
          </tab>

          <tab>
            <template slot="title">Edit Profile</template>
            <template slot="content">

              <div class="content-wrapper">
                <div class="row row-centered">
                  <div class="col col-large-6">
                    <ProfileEditor></ProfileEditor>
                  </div>
                </div>
              </div>

            </template>
          </tab>

        </tabbed-content>
      </div>

    </app-content-section>


    <app-footer></app-footer>




    <ProfileHeader class="mt-4"></ProfileHeader>

    <ProfileEditor v-if="isInEditionMode" class="mt-4"></ProfileEditor>
    <ProfileView v-else class="mt-4"></ProfileView>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ProfileHeader from '@/components/Profile/ProfileHeader'
import ProfileView from '@/components/Profile/ProfileView'
import ProfileEditor from '@/components/Profile/ProfileEditor/ProfileEditor'

import ContentSection from '@/components/shared/ContentSection.vue';
import Footer from '@/components/shared/Footer.vue';
import SubSectionStats from "@/components/shared/SubSectionStats";
import TabbedContent from "@/components/shared/TabbedContent";
import Tab from "@/components/shared/Tab";

export default {
  name: 'Profile',
  components: {
    Tab,
    TabbedContent,
    SubSectionStats,
    ProfileHeader,
    ProfileView,
    ProfileEditor,

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

    }
  },
  created () {
  },
  methods: {
    ...mapActions('user', [
      'getAccountProfile'
    ])
  },
  computed: {
    ...mapState('user', {
      profile: state => state.infos,
      draftProjects: state => state.draftProjects,
      contributedProjects: state => state.contributedProjects,
      publishedProjects: state => state.publishedProjects,
      isInEditionMode: state => state.isInProfileEditionMode
    })
  }
}
</script>

<style>

</style>
