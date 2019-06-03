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
          <b-btn :to="{ name: 'task.builder.material' }" variant="success" size="lg">Draft, complete it!</b-btn><br>
          <b-btn :to="{ name: 'project.task.presenter' }" variant="outline-secondary" size="sm" class="mt-2">Test it!</b-btn>
          <b-btn variant="outline-secondary" size="sm" class="mt-2" @click="publishProject(project)">Publish it!</b-btn><br>
          <!--<b-btn class="mt-2" variant="outline-secondary" size="sm">Subscribe</b-btn>-->
        </div>
      </b-col>

    </b-row>

    <b-row class="mt-5">
      <b-col cols="12">

        <b-tabs content-class="mt-5 mb-5" >

          <b-tab title="Info" :active="currentTab === tabs.info" @click="setCurrentTab(tabs.info)">
            <ProjectInfoMenu></ProjectInfoMenu>
          </b-tab>

          <!--<b-tab title="Updates ({nb})">
            <ProjectUpdatesMenu></ProjectUpdatesMenu>
          </b-tab>-->

          <b-tab title="Results ({nb})" :active="currentTab === tabs.results" @click="setCurrentTab(tabs.results)">
            <ProjectResultsMenu></ProjectResultsMenu>
          </b-tab>

          <b-tab title="Tasks" :active="currentTab === tabs.tasks" @click="setCurrentTab(tabs.tasks)">

            <!-- TODO: find what to display when project published -->
            <b-row v-if="project.published">
              <b-col>
                <ul>
                  <li :key="task.id" v-for="task in tasks">
                    {{ task.info.question }}
                  </li>
                </ul>
              </b-col>
            </b-row>

            <ProjectTasksMenu v-else></ProjectTasksMenu>
          </b-tab>

          <b-tab title="Statistics" :active="currentTab === tabs.statistics" @click="setCurrentTab(tabs.statistics)">
            <ProjectStatisticsMenu></ProjectStatisticsMenu>
          </b-tab>

        </b-tabs>

        <hr>

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
import ProjectUpdatesMenu from '@/components/Project/Menu/ProjectUpdatesMenu'
import ProjectResultsMenu from '@/components/Project/Menu/ProjectResultsMenu'
import ProjectDescription from '@/components/Project/ProjectDescription'
import TemplateRenderer from '@/components/Task/TemplateRenderer'

export default {
  name: 'Project',
  components: {
    TemplateRenderer,
    ProjectDescription,
    ProjectResultsMenu,
    ProjectUpdatesMenu,
    ProjectInfoMenu,
    ProjectTasksMenu,
    ProjectStatisticsMenu
  },
  created () {
    this.getProject(this.id).then(project => {
      return this.getProjectTasks(project)
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
      'getProject', 'publishProject'
    ]),
    ...mapActions('task', [
      'getProjectTasks'
    ]),
    ...mapMutations('project/menu', [
      'setCurrentTab'
    ])
  },
  computed: {
    ...mapState('project', {
      project: state => state.selectedProject
    }),
    ...mapState('task', {
      tasks: state => state.selectedProjectTasks
    }),
    ...mapState('project/menu', [
      'currentTab', 'tabs'
    ])
  }
}
</script>

<style scoped>

</style>
