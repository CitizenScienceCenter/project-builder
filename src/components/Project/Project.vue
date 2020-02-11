<template>
  <div ref="project">
    <div v-if="!hasMedia || hasMedia && media">

      <project-cover :imageUrl="coverImg">
        <div class="row row-centered">
          <div class="col col-large-8">
            <h2 class="cover-heading scroll-effect" v-html="project.name"></h2>
          </div>
        </div>
        <div class="row row-centered">
          <div class="col col-large-8">
            <p class="cover-subheading scroll-effect scroll-effect-delayed-1">{{ project.info.shortDescription }}</p>
          </div>
        </div>
        <div class="row row-centered">
          <div class="col col-large-8">

            <div class="scroll-effect scroll-effect-delayed-2">

              <template v-if="!taskPresenter || projectTasks.length < 1">

                <div v-if="!taskPresenter" class="form-message form-message-centered form-message-error">
                  <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M322.72,256,422.79,155.93a31.46,31.46,0,0,0,0-44.48L400.55,89.21a31.46,31.46,0,0,0-44.48,0L256,189.28,155.93,89.21a31.46,31.46,0,0,0-44.48,0L89.21,111.45a31.46,31.46,0,0,0,0,44.48L189.28,256,89.21,356.07a31.46,31.46,0,0,0,0,44.48l22.24,22.24a31.46,31.46,0,0,0,44.48,0L256,322.72,356.07,422.79a31.46,31.46,0,0,0,44.48,0l22.24-22.24a31.46,31.46,0,0,0,0-44.48Z"></path>
                    </svg>
                  </div>
                  <span class="text" style="color: white">No task presenter</span>
                </div>

                <div v-if="projectTasks.length < 1" class="form-message form-message-centered form-message-error">
                  <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M322.72,256,422.79,155.93a31.46,31.46,0,0,0,0-44.48L400.55,89.21a31.46,31.46,0,0,0-44.48,0L256,189.28,155.93,89.21a31.46,31.46,0,0,0-44.48,0L89.21,111.45a31.46,31.46,0,0,0,0,44.48L189.28,256,89.21,356.07a31.46,31.46,0,0,0,0,44.48l22.24,22.24a31.46,31.46,0,0,0,44.48,0L256,322.72,356.07,422.79a31.46,31.46,0,0,0,44.48,0l22.24-22.24a31.46,31.46,0,0,0,0-44.48Z"></path>
                    </svg>
                  </div>
                  <span class="text" style="color: white">No tasks</span>
                </div>

              </template>


              <template v-else>
                <!-- show buttons if tasks exists -->

                <template v-if="!project.active">
                  <!-- inactive project -->
                  <div v-if="isAdmin" class="button-group centered">
                    <router-link tag="button" :to="{ name: 'project.task.presenter' }" class="button button-secondary button-secondary-inverted">Preview</router-link>
                    <button @click="publish" class="button button-primary">Publish</button>
                  </div>
                  <template v-else-if="isOwner">
                    <template v-if="!project.info.requestApproval">
                      <div class="button-group centered">
                        <router-link tag="button" :to="{ name: 'project.task.presenter' }" class="button button-secondary button-secondary-inverted">Preview</router-link>
                        <button @click="requestApproval" class="button button-primary">Request Approval</button>
                      </div>
                    </template>

                    <template v-else>
                      <div class="button-group centered">
                        <router-link tag="button" :to="{ name: 'project.task.presenter' }" class="button button-secondary button-secondary-inverted">Preview</router-link>
                        <button @click="cancelApprovalRequest" class="button button-secondary button-secondary-inverted">Cancel Approval Request</button>
                      </div>
                      <br>
                      <p class="centered" style="color: white">
                        You're request be handled shortly.
                      </p>
                    </template>

                  </template>
                </template>

                <template v-else>
                  <!-- active project -->
                  <div v-if="isAdmin" class="button-group centered">
                    <router-link tag="button" :to="{ name: 'project.task.presenter' }" class="button button-primary">Contribute now</router-link>
                    <button @click="unpublish" class="button button-secondary button-secondary-inverted">Unpublish</button>
                  </div>
                  <div v-else-if="isOwner" class="button-group centered">
                    <router-link tag="button" :to="{ name: 'project.task.presenter' }" class="button button-primary">Contribute now</router-link>
                    <button @click="unpublish" class="button button-secondary button-secondary-inverted">Unpublish</button>
                  </div>
                  <div v-else class="button-group centered">
                    <router-link tag="button" :to="{ name: 'project.task.presenter' }" class="button button-primary">Contribute now</router-link>
                  </div>
                </template>

              </template>

            </div>

          </div>
        </div>
      </project-cover>

      <app-content-section color="greyish" class="content-section-condensed stats-section">
        <div class="content-wrapper">
          <sub-section-stats
                  :userCount="3"
                  :submissionCount="343"
                  :taskCount="1234" >
          </sub-section-stats>
        </div>
      </app-content-section>

      <app-content-section>

        <div class="content-subsection scroll-effect">
          <tabbed-content>

            <tab>
              <template slot="title">Info</template>
              <template slot="content">
                <div class="content-wrapper">
                  <projectInfoMenu></projectInfoMenu>
                </div>
              </template>
            </tab>

            <!--
            <tab>
              <template slot="title">Results</template>
              <template slot="content">
                <div class="content-wrapper">
                  <div class="row row-centered">
                    <div class="col col-large-8">
                      <projectResultsMenu></projectResultsMenu>
                    </div>
                  </div>
                </div>
              </template>
            </tab>
            -->

            <tab v-if="isOwner">
              <template slot="title">Tasks & Results</template>
              <template slot="content">
                <div class="content-wrapper">
                  <div class="row row-centered">
                    <div class="col col-large-8">
                      <projectTasksMenu></projectTasksMenu>
                    </div>
                  </div>
                </div>
              </template>
            </tab>

            <!--
            <tab>
              <template slot="title">Statistics</template>
              <template slot="content">
                <div class="content-wrapper">
                  <div class="row row-centered">
                    <div class="col col-large-8">
                      <projectStatisticsMenu></projectStatisticsMenu>
                    </div>
                  </div>
                </div>
              </template>
            </tab>
            -->

            <tab v-if="isOwner">
              <template slot="title">Edit Project</template>
              <template slot="content">
                <div class="content-wrapper">
                  <div class="row row-centered">
                    <div class="col col-large-4">
                      <projectEditor @refreshMedia="loadMedia()"></projectEditor>
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

      <b-row class="mt-4" v-if='project'>


        <b-col md="4">
          <b-img v-if="media && media.length > 0" :src="media[0].path" class="shadow" rounded fluid-grow></b-img>
          <b-img v-else blank-color="#777" :blank="true" class="shadow" rounded fluid-grow></b-img>
        </b-col>


        <b-col md="8" class="mt-4 mt-md-0">
          <h2>{{ project.name }}</h2>
          <p>{{ project.description }}</p>


          <div v-if="isOwner && !project.active">
            <b-btn ref="btn-draft-complete-it" :to="{ name: 'task.builder.material', params: { pid } }" variant="success" size="lg">Draft, complete it!</b-btn><br>
            <b-btn ref="btn-test-it" :to="{ name: 'project.task.presenter' }" variant="outline-secondary" size="sm" class="mt-2">Test it!</b-btn>
            <b-btn ref="btn-publish-it" variant="outline-secondary" size="sm" class="mt-2" v-b-modal.publish-project>Publish it!</b-btn><br>


            <b-modal
                    id="publish-project"
                    title="Publish your project"
                    ok-title="Yes, publish it"
                    cancel-title="No, do not publish it!"
                    @ok="publish"
            >
              <b-alert variant="danger" :show="true">
                You are about to publish your project. This CANNOT be undone! Once your project has been published, people will be able to contribute to it.
                All the task runs (answers) that may have been created during the test phase will be flushed and your project will start fresh.
                That means that your project should be working properly, so please make sure it does. Otherwise you can work on it and publish it once it works fine.
              </b-alert>
            </b-modal>
          </div>

          <div v-else-if="isAnonymousProject">
            <b-btn ref="btn-contribute" :to="{ name: 'project.task.presenter' }" variant="success" size="lg">Contribute!</b-btn>
          </div>

        </b-col>

      </b-row>

      <b-row class="mt-5">
        <b-col cols="12">

          <b-tabs content-class="mt-5 mb-5" active-nav-item-class="font-weight-bold" fill>

            <b-tab title="Info" :active="currentTab === tabs.info" @click="setCurrentTab(tabs.info)">
              <projectInfoMenu></projectInfoMenu>
            </b-tab>



            <b-tab v-if="false" :title="'Results (' + results.n_results + ')'" :active="currentTab === tabs.results" @click="setCurrentTab(tabs.results)">
              <projectResultsMenu></projectResultsMenu>
            </b-tab>

            <b-tab ref="tab-tasks" v-if="isOwner" title="Tasks" :active="currentTab === tabs.tasks" @click="setCurrentTab(tabs.tasks)">
              <projectTasksMenu></projectTasksMenu>
            </b-tab>


            <b-tab v-if="false" title="Statistics" :active="currentTab === tabs.statistics" @click="setCurrentTab(tabs.statistics)">
              <projectStatisticsMenu></projectStatisticsMenu>
            </b-tab>

            <b-tab ref="tab-settings" v-if="isOwner" title="Settings" :active="currentTab === tabs.settings" @click="setCurrentTab(tabs.settings)">


              <projectEditor v-if="currentTab === tabs.settings"></projectEditor>
            </b-tab>

          </b-tabs>

        </b-col>
      </b-row>

      -->


    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

import ProjectInfoMenu from '@/components/Project/Menu/ProjectInfoMenu'
import ProjectTasksMenu from '@/components/Project/Menu/ProjectTaskMenu'
import ProjectStatisticsMenu from '@/components/Project/Menu/ProjectStatisticMenu'
import ProjectResultsMenu from '@/components/Project/Menu/ProjectResultMenu'
import ProjectDescription from '@/components/Project/ProjectDescription'
import TemplateRenderer from '@/components/Task/TemplateRenderer'
import ProjectEditor from '@/components/Project/ProjectEditor'

import ContentSection from '@/components/shared/ContentSection.vue';
import Footer from '@/components/shared/Footer.vue';
import ProjectCover from "@/components/Project/ProjectCover";
import TabbedContent from "@/components/shared/TabbedContent";
import Tab from "@/components/shared/Tab";
import SubSectionStats from "@/components/shared/SubSectionStats";

export default {
  name: 'project',
  metaInfo: function() {
    return {
      title: this.project.name,
      meta: [
        {
          property: 'og:title',
          content: this.project.name || 'Project Name',
          template: '%s | '+this.$t('site-title')
        }
      ]
    }
  },
  components: {
    SubSectionStats,
    Tab,
    TabbedContent,
    ProjectEditor,
    TemplateRenderer,
    ProjectDescription,
    ProjectResultsMenu,
    ProjectInfoMenu,
    ProjectTasksMenu,
    ProjectStatisticsMenu,
    'app-content-section': ContentSection,
    'app-footer': Footer,
    ProjectCover
  },
  created () {

    // eager loading: load the project and finally get stats and results
    // to have a fresh state for all sub components

    this.getProject(this.$route.params.pid || this.pid).then(project => {

      console.log( 'stats');
      /*
      this.getStats(this.pid).then( stats => {
        console.log( stats );
      });
      */
      this.getStats(this.pid).then( res => {

      });

      this.isAnonymousProject = !!this.project.anonymous_allowed

      this.loadMedia();

      if (this.project['info'] && this.project['info']['template']) {
        this.taskPresenter = this.project.info.template
      }

      if( this.currentUser && this.currentUser.id === this.project.owner) {
        this.isOwner = true;
        /*
        this.getProjectTasks(this.project.id).then(t => {
        })
        */
      }
      if( this.currentUser && this.currentUser.info.isAdmin ) {
        this.isAdmin = true;
      }
    })
    /* ... sorry, hat to comment it out, navigating to projects wasn't working anymore
    .catch((err) => {
      console.error(err)
      this.$router.push({'name': '404', 'props': {'msg': 'Project not found'}})
    })
    */

  },
  data: () => {
    return {
      isAnonymousProject: true,
      isOwner: false,
      isAdmin: false,
      taskPresenter: undefined,
      media: undefined,
      hasMedia: true
    }
  },
  props: {
    pid: {
      required: false
    }
  },
  methods: {
    loadMedia() {
      this.hasMedia = true;
      this.getProjectMedia(this.pid).then(media => {
        if( media.body.length ) {
          media.body.sort( function(a,b){
            let a_time = new Date(a.created_at).getTime();
            let b_time = new Date(b.created_at).getTime();
            return b_time - a_time;
          });
          this.media = media.body[0];
          this.hasMedia = true;
        }
        else {
          this.hasMedia = false;
        }
      });
    },
    ...mapActions('c3s/project', [
      'getProject',
      'createProject',
      'getResults',
      'getStats',
      'getProjectMedia',
      'updateProject'
    ]),
    ...mapActions('c3s/project', [
      'getProjectTasks',
    ]),
    ...mapMutations('project/menu', [
      'setCurrentTab'
    ]),
    ...mapMutations('notification', [
      'showError', 'showSuccess'
    ]),

    publish () {
      let info = JSON.parse( JSON.stringify( this.project.info ) );
      info.requestApproval = false;

      this.$store.dispatch('c3s/project/updateProject', [this.project.id, {'active': true, 'info': info}]).then((res) => {

      });
      /*
      if (this.taskPresenter && this.taskPresenter.length > 0) {
        if (this.projectTasks.length > 0) {

          let info = JSON.parse( JSON.stringify( this.project.info ) );
          info.requestApproval = false;

          this.$store.dispatch('c3s/project/updateProject', [this.project.id, {'active': true, 'info': info}]).then((res) => {
            this.showSuccess({
              title: 'Project Published',
              content: 'Successfully published project'
            })
          })
        } else {
          this.showError({
            title: 'Impossible to publish the project',
            content: 'You must add at least one task to the project'
          })
        }
      } else {
        this.showError({
          title: 'Impossible to publish the project',
          content: 'You must provide a task presenter to publish the project'
        })
      }
       */
    },

    requestApproval() {
      let info = JSON.parse( JSON.stringify( this.project.info ) );
      info.requestApproval = true;
      this.$store.dispatch('c3s/project/updateProject', [this.project.id, {'info':info}]).then((res) => {

      });
    },
    cancelApprovalRequest() {
      let info = JSON.parse( JSON.stringify( this.project.info ) );
      info.requestApproval = false;
      this.$store.dispatch('c3s/project/updateProject', [this.project.id, {'info':info}]).then((res) => {

      });
    },

    unpublish() {
      this.$store.dispatch('c3s/project/updateProject', [this.project.id, {'active': false}]).then((res) => {

      });
    }
  },
  computed: {
    ...mapState('c3s/project', {
      project: state => state.project,
      projectTasks: state => state.tasks
    }, 'project', {
      results: state => state.selectedProjectResults,
      stats: state => state.selectedProjectStats,
    }),
    ...mapState('project/menu', [
      'currentTab', 'tabs'
    ]),
    ...mapState('c3s/user', [
      'currentUser'
    ]),
    coverImg() {
      if( this.hasMedia && this.media ) {
        console.log( this.media.path );
        return this.media.path;
      }
      else {
        return '/static/img/cover.jpg';
      }
    }
  }
}
</script>

<style>

</style>
