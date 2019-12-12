<i18n>
  {
  "en": {

  "page-title": "Profil",

  "button-logout": "Logout"

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
              <div class="content-subsection scroll-effect">
                <div class="button-group centered">
                  <!-- <router-link tag="button" to="/logout" class="button button-secondary">{{ $t('button-logout') }}</router-link> -->
                  <button class="button button-secondary" @click.prevent="handleLogout()">{{ $t('button-logout') }}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-subsection scroll-effect scroll-effect-delayed-3">
        <tabbed-content>

          <tab>
            <template slot="title">Active Projects</template>
            <template slot="content">

              <div class="content-wrapper">
                <div class="row">
                  <div class="col">

                    <ProjectListing :search="{
                    'select': {
                      'fields': [
                        '*'
                      ],
                      'tables': [
                        'projects'
                      ],
                      'orderBy': {
                        'created_at': 'DESC'
                      }
                    },
                    'where': [
                      {
                        'field': 'owner',
                        'op': 'e',
                        'val': this.currentUser.id
                      },
                      {
                        'field': 'active',
                        'op': 'e',
                        'val': true,
                        'join': 'a'
                      }
                    ]
                    }" :limit="20" showMore></ProjectListing>

                    <!--

                    <b-row v-if="activeProjects.length > 0">
                      <b-col :key="project.id" v-for="project in activeProjects" md="4" class="mt-3">

                        <b-card no-body tag="article" class="h-100">
                          <b-card-img-lazy v-if="project.info && project.info.thumbnail_url" :src="project.info.thumbnail_url"></b-card-img-lazy>
                          <b-card-img-lazy v-else :src="'https://dummyimage.com/334x250/777777/fff&text=' + project.name"></b-card-img-lazy>

                          <b-card-body>
                            <b-card-title :title="project.name"></b-card-title>
                            <b-card-text>{{ project.description }}</b-card-text>
                          </b-card-body>

                          <b-card-footer class="text-center">
                            <b-button :to="{ name: 'project', params: { pid: project.id } }" variant="primary">Go to project</b-button>
                          </b-card-footer>
                        </b-card>

                      </b-col>
                    </b-row>
                    <b-row v-else>
                      <b-col class="text-center">
                        <b-btn variant="outline-secondary" :to="{ name: 'project.builder.name' }">Create a project</b-btn>
                      </b-col>
                    </b-row>

                    -->


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

                    <ProjectListing :search="{
                    'select': {
                      'fields': [
                        '*'
                      ],
                      'tables': [
                        'projects'
                      ],
                      'orderBy': {
                        'created_at': 'DESC'
                      }
                    },
                    'where': [
                      {
                        'field': 'owner',
                        'op': 'e',
                        'val': this.currentUser.id
                      },
                      {
                        'field': 'active',
                        'op': 'e',
                        'val': false,
                        'join': 'a'
                      }
                    ]
                    }" :limit="20" showMore></ProjectListing>


                    <!--
                    <b-row v-if="draftProjects.length > 0">
                      <b-col :key="project.id" v-for="project in draftProjects" md="4" class="mt-3">

                        <b-card no-body tag="article" class="h-100">
                          <b-card-img-lazy v-if="project && project.info && project.info.thumbnail_url" :src="project.info.thumbnail_url"></b-card-img-lazy>
                          <b-card-img-lazy v-else :src="'https://dummyimage.com/334x250/777777/fff&text=' + project.name"></b-card-img-lazy>

                          <b-card-body>
                            <b-card-title :title="project.name"></b-card-title>
                            <b-card-text>{{ project.description }}</b-card-text>
                          </b-card-body>

                          <b-card-footer class="text-center">
                            <b-button :to="{ name: 'project', params: { pid: project.id } }" variant="primary">Go to project</b-button>

                          </b-card-footer>
                        </b-card>

                      </b-col>
                    </b-row>
                    <b-row v-else>
                      <b-col class="text-center">
                        <b-btn variant="outline-secondary" :to="{ name: 'project.builder.name' }">Create a project</b-btn>
                      </b-col>
                    </b-row>

                    -->


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

                    todo
                    <!--
                    <b-row v-if="contributedProjects.length > 0">
                      <b-col :key="project.id" v-for="project in contributedProjects" md="4" class="mt-3">

                        <b-card no-body tag="article" class="h-100">
                          <b-card-img-lazy v-if="project.info.thumbnail_url" :src="project.info.thumbnail_url"></b-card-img-lazy>
                          <b-card-img-lazy v-else :src="'https://dummyimage.com/334x250/777777/fff&text=' + project.name"></b-card-img-lazy>

                          <b-card-body>
                            <b-card-title :title="project.name"></b-card-title>
                            <b-card-text>{{ project.description }}</b-card-text>
                          </b-card-body>

                          <b-card-footer class="text-center">
                            <b-button :to="{ name: 'project', params: { pid: project.id } }" variant="primary">Go to project</b-button>
                          </b-card-footer>
                        </b-card>

                      </b-col>
                    </b-row>
                    <b-row v-else>
                      <b-col class="text-center">
                        <b-btn variant="outline-secondary" :to="{ name: 'discover' }">Find a project</b-btn>
                      </b-col>
                    </b-row>
                    -->


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
                  <div class="col col-large-6 col-xlarge-4">
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



    <!--
    <ProfileHeader class="mt-4"></ProfileHeader>


    <ProfileEditor v-if="isInEditionMode" class="mt-4"></ProfileEditor>
    <ProfileView v-else class="mt-4" v-bind:draftProjects="draftProjects" v-bind:activeProjects="activeProjects"></ProfileView>
    -->
    
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
import ProjectListing from "@/components/Project/ProjectListing";

export default {
  name: 'Profile',
  components: {
    ProjectListing,
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
      draftProjects: [],
      activeProjects: []
    }
  },
  created () {
    this.getUserProjects().then(p => {
      for (let idx in p.body.data) {
        const proj = p.body.data[idx]
        if (proj.active) {
          this.activeProjects.push(proj)
        } else {
          this.draftProjects.push(proj)
        }
      }
    })
  },
  methods: {
    ...mapActions('c3s/user', [
      'logout',
      'getUserProjects',
      'getUserSubmissions'
    ]),
    handleLogout() {
      this.logout().then(() => {
        this.$router.push('/')
      })
    }


  },
  computed: {
    ...mapState('user', {
      contributedProjects: state => state.contributedProjects,
      isInEditionMode: state => state.isInProfileEditionMode
    }),
    ...mapState('c3s/user', {
      currentUser: state => state.currentUser,
      projects: state => state.projects,
      submissions: state => state.submissions
    }),
    ...mapState('c3s/projects', {

    })
  }
}
</script>

<style>

</style>
