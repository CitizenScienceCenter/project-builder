<template>
  <div>
    <b-row class="mt-4">

      <b-col cols="4">
        <b-img v-if="project.info && project.info.thumbnail" :src="project.info.thumbnail_url" thumbnail fluid-grow></b-img>
        <b-img v-else blank-color="#777" :blank="true" thumbnail fluid-grow></b-img>
      </b-col>

      <b-col cols="8">
        <h2>{{ project.name }}</h2>
        <p>{{ project.description }}</p>

        <div v-if="project.published">
          <b-btn :to="{ name: 'project.task.presenter' }" variant="success" size="lg">Contribute!</b-btn>
        </div>
        <div v-else>
          <b-btn :to="{ name: 'task.builder.material', params: { id: 'id' in project ? project.id : 0 } }" variant="success" size="lg">Draft, complete it!</b-btn><br>
          <b-btn :to="{ name: 'project.task.presenter' }" variant="outline-secondary" size="sm" class="mt-2">Test it!</b-btn>
          <b-btn variant="outline-secondary" size="sm" class="mt-2" v-b-modal.publish-project>Publish it!</b-btn><br>
          <!-- Publish project modal -->
          <b-modal
                  id="publish-project"
                  title="Publish your project"
                  ok-title="Yes, publish it"
                  cancel-title="No, do not publish it!"
                  @ok="publishProject(project)">

            <b-alert variant="danger" :show="true">
              You are about to publish your project. This CANNOT be undone! Once your project has been published, people will be able to contribute to it.
              All the taskruns (answers) that may have been created during the test phase will be flushed and your project will start fresh.
              That means that your project should be working properly, so please make sure it does. Otherwise you can work on it and publish it once it works fine.
            </b-alert>

          </b-modal>
        </div>
      </b-col>

    </b-row>

    <b-row class="mt-5">
      <b-col cols="12">

        <b-tabs content-class="mt-5 mb-5" >

          <b-tab title="Info" :active="currentTab === tabs.info" @click="setCurrentTab(tabs.info)">
            <ProjectInfoMenu></ProjectInfoMenu>
          </b-tab>

          <b-tab :title="'Results (' + results.n_results + ')'" :active="currentTab === tabs.results" @click="setCurrentTab(tabs.results)">
            <ProjectResultsMenu></ProjectResultsMenu>
          </b-tab>

          <b-tab title="Tasks" :active="currentTab === tabs.tasks" @click="setCurrentTab(tabs.tasks)">
            <ProjectTasksMenu></ProjectTasksMenu>
          </b-tab>

          <b-tab title="Statistics" :active="currentTab === tabs.statistics" @click="setCurrentTab(tabs.statistics)">
            <ProjectStatisticsMenu></ProjectStatisticsMenu>
          </b-tab>

        </b-tabs>

        <hr>

        <!-- Project long description (story) -->
        <b-row>
          <b-col>
            <ProjectDescription></ProjectDescription>
          </b-col>
        </b-row>

      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

import ProjectInfoMenu from '@/components/Project/Menu/ProjectInfoMenu'
import ProjectTasksMenu from '@/components/Project/Menu/ProjectTasksMenu'
import ProjectStatisticsMenu from '@/components/Project/Menu/ProjectStatisticsMenu'
import ProjectResultsMenu from '@/components/Project/Menu/ProjectResultsMenu'
import ProjectDescription from '@/components/Project/ProjectDescription'
import TemplateRenderer from '@/components/Task/TemplateRenderer'

export default {
  name: 'Project',
  components: {
    TemplateRenderer,
    ProjectDescription,
    ProjectResultsMenu,
    ProjectInfoMenu,
    ProjectTasksMenu,
    ProjectStatisticsMenu
  },
  created () {
    // eager loading: load the project and finally get stats, results and the task presenter
    // to have a fresh state for all sub components
    this.getProject(this.id).then(project => {
      this.getStatistics(project)
      this.getResults(project)
      this.getTaskPresenter({ project: project, template: null })
    })
  },
  data: () => {
    return {

    }
  },
  props: {
    id: {
      required: true
    }
  },
  methods: {
    ...mapActions('project', [
      'getProject', 'publishProject', 'getResults', 'getStatistics'
    ]),
    ...mapActions('task', [
      'getTaskPresenter'
    ]),
    ...mapMutations('project/menu', [
      'setCurrentTab'
    ])
  },
  computed: {
    ...mapState('project', {
      project: state => state.selectedProject,
      results: state => state.selectedProjectResults,
      stats: state => state.selectedProjectStats
    }),
    ...mapState('project/menu', [
      'currentTab', 'tabs'
    ])
  }
}
</script>

<style scoped>

</style>
