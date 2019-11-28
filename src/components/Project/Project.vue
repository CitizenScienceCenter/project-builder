<template>
  <div>

    <project-cover imageUrl="/static/img/cover.jpg">
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
      <!--
      <div class="row row-centered">
        <div class="col col-large-8">
          <div class="button-group centered scroll-effect scroll-effect-delayed-2">
            <router-link tag="button" :to="{ name: 'project.builder.name' }" class="button button-primary">{{ $t('cover-button-primary') }}</router-link>
            <router-link tag="button" to="/discover" class="button button-secondary button-secondary-inverted">{{ $t('cover-button-secondary') }}</router-link>
          </div>
        </div>
      </div>
      -->
    </project-cover>

    <app-content-section>
      <div class="content-subsection">
        <div class="content-wrapper">

          <div class="content-subsection">
            <div class="row row-centered">
              <div class="col col-large-6 col-xlarge-4 scroll-effect">
                <img v-if=" media && media.length > 0" :src="media[0].path" />
                <!--<img v-else src="/static/img/cover.jpg" /> -->

                {{ project.info }}
                <div class="button-group">
                  <router-link tag="button" class="button button-secondary" :to="{ name: 'task.builder.material', params: { pid: pid } }">Reimport Tasks</router-link>
                </div>

              </div>
            </div>
          </div>

          <div class="content-subsection">
            <div class="row row-centered">
              <div class="col col-large-6 col-xlarge-4 scroll-effect">

                <!-- Owner actions -->
                <div v-if="isOwner && !project.active">
                  <b-btn ref="btn-draft-complete-it" :to="{ name: 'task.builder.material', params: { pid } }" variant="success" size="lg">Draft, complete it!</b-btn><br>
                  <b-btn ref="btn-test-it" :to="{ name: 'project.task.presenter' }" variant="outline-secondary" size="sm" class="mt-2">Test it!</b-btn>
                  <b-btn ref="btn-publish-it" variant="outline-secondary" size="sm" class="mt-2" v-b-modal.publish-project>Publish it!</b-btn><br>
                  <!-- Publish project modal -->
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

              </div>
            </div>
          </div>

          <div class="content-subsection">
            <div class="row row-centered">
              <div class="col scroll-effect">

                <b-tabs content-class="mt-5 mb-5" active-nav-item-class="font-weight-bold" fill>

                  <b-tab title="Info" :active="currentTab === tabs.info" @click="setCurrentTab(tabs.info)">
                    <projectInfoMenu></projectInfoMenu>
                  </b-tab>

                  <!-- Temporary removed -->
                  <b-tab v-if="false" :title="'Results (' + results.n_results + ')'" :active="currentTab === tabs.results" @click="setCurrentTab(tabs.results)">
                    <projectResultsMenu></projectResultsMenu>
                  </b-tab>

                  <b-tab ref="tab-tasks" v-if="isOwner" title="Tasks" :active="currentTab === tabs.tasks" @click="setCurrentTab(tabs.tasks)">
                    <projectTasksMenu></projectTasksMenu>
                  </b-tab>

                  <!-- Temporary removed -->
                  <b-tab v-if="false" title="Statistics" :active="currentTab === tabs.statistics" @click="setCurrentTab(tabs.statistics)">
                    <projectStatisticsMenu></projectStatisticsMenu>
                  </b-tab>

                  <b-tab ref="tab-settings" v-if="isOwner" title="Settings" :active="currentTab === tabs.settings" @click="setCurrentTab(tabs.settings)">
                    <!-- v-if used to render the component only if the tab is active -->
                    <projectEditor v-if="currentTab === tabs.settings"></projectEditor>
                  </b-tab>

                </b-tabs>

              </div>
            </div>
          </div>

        </div>
      </div>
    </app-content-section>


    <app-footer></app-footer>


    <b-row class="mt-4" v-if='project'>

      <!-- Avatar -->
      <b-col md="4">
        <b-img v-if="media && media.length > 0" :src="media[0].path" class="shadow" rounded fluid-grow></b-img>
        <b-img v-else blank-color="#777" :blank="true" class="shadow" rounded fluid-grow></b-img>
      </b-col>

      <!-- Header -->
      <b-col md="8" class="mt-4 mt-md-0">
        <h2>{{ project.name }}</h2>
        <p>{{ project.description }}</p>

        <!-- Owner actions -->
        <div v-if="isOwner && !project.active">
          <b-btn ref="btn-draft-complete-it" :to="{ name: 'task.builder.material', params: { pid } }" variant="success" size="lg">Draft, complete it!</b-btn><br>
          <b-btn ref="btn-test-it" :to="{ name: 'project.task.presenter' }" variant="outline-secondary" size="sm" class="mt-2">Test it!</b-btn>
          <b-btn ref="btn-publish-it" variant="outline-secondary" size="sm" class="mt-2" v-b-modal.publish-project>Publish it!</b-btn><br>
          <!-- Publish project modal -->
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

          <!-- Temporary removed -->
          <b-tab v-if="false" :title="'Results (' + results.n_results + ')'" :active="currentTab === tabs.results" @click="setCurrentTab(tabs.results)">
            <projectResultsMenu></projectResultsMenu>
          </b-tab>

          <b-tab ref="tab-tasks" v-if="isOwner" title="Tasks" :active="currentTab === tabs.tasks" @click="setCurrentTab(tabs.tasks)">
            <projectTasksMenu></projectTasksMenu>
          </b-tab>

          <!-- Temporary removed -->
          <b-tab v-if="false" title="Statistics" :active="currentTab === tabs.statistics" @click="setCurrentTab(tabs.statistics)">
            <projectStatisticsMenu></projectStatisticsMenu>
          </b-tab>

          <b-tab ref="tab-settings" v-if="isOwner" title="Settings" :active="currentTab === tabs.settings" @click="setCurrentTab(tabs.settings)">
            <!-- v-if used to render the component only if the tab is active -->
            <projectEditor v-if="currentTab === tabs.settings"></projectEditor>
          </b-tab>

        </b-tabs>

      </b-col>
    </b-row>

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
import ProjectCover from "@/components/shared/ProjectCover";

export default {
  name: 'project',
  metaInfo: function() {
    return {
      title: this.project.name,
      meta: [
        {
          property: 'og:title',
          content: this.project.name,
          template: '%s | '+this.$t('site-title')
        }
      ]
    }
  },
  components: {
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
      this.getStats(this.project.id)
      this.isAnonymousProject = !!this.project.anonymous_allowed
      this.getProjectMedia(this.pid).then(media => {
        this.media = media.body
      });
      if (this.project['info'] && this.project['info']['template']) {
        this.taskPresenter = this.project.info.template
      }

      if (this.currentUser.id === this.project.owner) {
        this.isOwner = true
        this.getProjectTasks(this.project.id).then(t => {
        })
      }
    })

  },
  data: () => {
    return {
      isAnonymousProject: true,
      isOwner: false,
      taskPresenter: undefined,
      media: []
    }
  },
  props: {
    pid: {
      required: false
    }
  },
  methods: {
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
      if (this.taskPresenter && this.taskPresenter.length > 0) {
        if (this.projectTasks.length > 0) {
          this.$store.dispatch('c3s/project/updateProject', [this.project.id, {'active': true}]).then((res) => {
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
    ])
  }
}
</script>

<style>

</style>
