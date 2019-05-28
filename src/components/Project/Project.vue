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
          <b-btn :to="{ name: 'project.task.presenter' }" variant="outline-info" size="sm" class="mt-2">Test it!</b-btn>
          <b-btn variant="outline-success" size="sm" class="mt-2" @click="publishProject(project)">Publish it!</b-btn>
<!--          <b-btn class="mt-2" variant="outline-success" size="sm">Subscribe</b-btn>-->
        </div>
      </b-col>

    </b-row>

    <b-row class="mt-5">
      <b-col cols="12">

        <b-tabs content-class="mt-5 mb-5">

          <b-tab title="Info" active>
            <ProjectInfoMenu></ProjectInfoMenu>
          </b-tab>

          <b-tab title="Updates ({nb})">
            <ProjectUpdatesMenu></ProjectUpdatesMenu>
          </b-tab>

          <b-tab title="Results ({nb})">
            <ProjectResultsMenu></ProjectResultsMenu>
          </b-tab>

          <b-tab title="Tasks">
            <b-row v-if="project.published">
              <b-col >
                <ul>
                  <li :key="task.id" v-for="task in tasks">
                    {{ task.info.question }}
                  </li>
                </ul>
              </b-col>
              <b-col md="8">
<!--                <TemplateRenderer></TemplateRenderer>-->
              </b-col>
            </b-row>

            <ProjectTasksMenu v-else :project="project"></ProjectTasksMenu>
          </b-tab>

          <b-tab title="Statistics">
            <ProjectStatisticsMenu></ProjectStatisticsMenu>
          </b-tab>
        </b-tabs>

        <hr>

        <b-row>
          <b-col>
            <ProjectDescription :content="project.long_description"></ProjectDescription>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

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
      'getProject', 'publishProject', 'getPublishProjectOptions'
    ]),
    ...mapActions('task', [
      'getProjectTasks'
    ])
  },
  computed: {
    ...mapState('project', {
      project: state => state.selectedProject
    }),
    ...mapState('task', {
      tasks: state => state.selectedProjectTasks
    })
  }
}
</script>

<style scoped>

</style>
