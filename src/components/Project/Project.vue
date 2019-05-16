<template>
  <div>
    <b-row class="mt-4">

      <b-col cols="4">
        <b-img v-if="typeof project !== 'undefined'" :src="thumbnail(project)" thumbnail fluid-grow></b-img>
      </b-col>

      <b-col cols="8">
        <h2>{{ project.name }}</h2>
        <p>{{ project.description }}</p>

        <b-btn v-if="project.published" variant="success" size="lg">Contribute!</b-btn>
        <b-btn v-else variant="success" size="lg">Draft, complete it!</b-btn><br>
        <b-btn class="mt-2" variant="outline-success" size="sm">Subscribe</b-btn>
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
              <b-col md="4">
                <ul>
                  <li :key="task.id" v-for="task in tasks">
                    {{ task.info.question }}
                  </li>
                </ul>
              </b-col>
              <b-col md="8">
                <div v-if="project.info" v-html="project.info.task_presenter"></div>
              </b-col>
            </b-row>

            <ProjectTasksMenu v-else></ProjectTasksMenu>
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
import { mapState, mapGetters } from 'vuex'

import ProjectInfoMenu from '@/components/Project/Menu/ProjectInfoMenu'
import ProjectTasksMenu from '@/components/Project/Menu/ProjectTasksMenu'
import ProjectStatisticsMenu from '@/components/Project/Menu/ProjectStatisticsMenu'
import ProjectUpdatesMenu from '@/components/Project/Menu/ProjectUpdatesMenu'
import ProjectResultsMenu from '@/components/Project/Menu/ProjectResultsMenu'
import ProjectDescription from '@/components/Project/ProjectDescription'

export default {
  name: 'Project',
  components: {
    ProjectDescription,
    ProjectResultsMenu,
    ProjectUpdatesMenu,
    ProjectInfoMenu,
    ProjectTasksMenu,
    ProjectStatisticsMenu
  },
  created () {
    this.$store.dispatch('project/getProject', this.id)
      .then(project => {
        return this.$store.dispatch('task/getProjectTasks', project)
      })
  },
  data: () => {
    return {}
  },
  props: {
    id: {
      required: true
    }
  },
  computed: {
    ...mapState('project', {
      project: state => state.selectedProject
    }),
    ...mapState('task', {
      tasks: state => state.selectedProjectTasks
    }),
    ...mapGetters('project', [
      'thumbnail'
    ])
  }
}
</script>

<style scoped>

</style>
