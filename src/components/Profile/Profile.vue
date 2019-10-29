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
      <div class="content-wrapper">
        <div class="row row-centered">
          <div class="col col-large-6 col-xlarge-4 scroll-effect">
            <h2 class="heading centered">Your Profile</h2>
          </div>
        </div>
        <div class="content-subsection">
          <div class="row">
            <div class="col">
              <sub-section-stats :my-submission-count="3" :my-rank="3"></sub-section-stats>
            </div>
          </div>
        </div>
        <div class="content-subsection">
          <div class="row row-centered">
            <div class="col col-large-8">
              <tabbed-content>
                <tab>
                  <template slot="title">Tab 1</template>
                  <template slot="content">
                    <p>gaggi 1</p>
                  </template>
                </tab>
                <tab>
                  <template slot="title">Tab 2</template>
                  <template slot="content">
                    <p>gaggi 2</p>
                  </template>
                </tab>
              </tabbed-content>
            </div>
          </div>
        </div>
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
