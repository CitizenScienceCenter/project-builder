<template>
  <div>
    <b-row class="mt-4">
      <b-col cols="4">
        <b-img v-if="typeof project !== 'undefined'" :src="thumbnail(project)" thumbnail fluid-grow></b-img>
      </b-col>
      <b-col cols="8">
        <h2>{{ project.name }}</h2>
        <p>{{ project.description }}</p>
        <b-btn v-if="project.published" variant="success">Contribute!</b-btn>
        <b-btn v-else variant="success">Draft, complete it!</b-btn>
        <b-btn variant="outline-success">Subscribe</b-btn>
      </b-col>
    </b-row>
    <b-row class="mt-5">
      <b-col cols="12">

        <b-tabs content-class="mt-5 mb-5">
          <b-tab title="Info" active>
            <b-row align-h="between" align-v="center">
              <b-col>
                <b>0</b><br>
                <span class="text-muted">published results</span>
              </b-col>
              <b-col>
                <b>27507</b><br>
                <span class="text-muted">tasks</span>
              </b-col>
              <b-col>
                <b>1526</b><br>
                <span class="text-muted">crafters</span>
              </b-col>
              <b-col>
                <b>1658</b><br>
                <span class="text-muted">tasks done</span>
              </b-col>
              <b-col>
                <b>25849</b><br>
                <span class="text-muted">pending tasks</span>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Updates (1)"></b-tab>
          <b-tab title="Results (0)"></b-tab>
          <b-tab title="Tasks">
            <b-row>
              <b-col>
                <ul>
                  <li :key="task.id" v-for="task in tasks">
                    {{ task.info.question }}
                  </li>
                </ul>
              </b-col>
              <b-col>
                <b-button v-b-modal.task_presenter_modal>Open task presenter</b-button>
                <b-modal id="task_presenter_modal" title="Task presenter" v-if="project.info">
                  <div v-html="project.info.task_presenter"></div>
                </b-modal>
              </b-col>
            </b-row>

          </b-tab>
          <b-tab title="Statistics"></b-tab>
        </b-tabs>

        <b-row>
          <b-col>
            <h4 class="mt-2">WHAT AND WHY</h4>
            <p>{{ project.long_description }}</p>
            <h4 class="mt-2">HOW</h4>
            <p>{{ project.long_description }}</p>
            <h4 class="mt-2">WHO</h4>
            <p>Owner id = {{ project.owner_id }}</p>
            <h4 class="mt-2">KEEP TRACK</h4>
            <p>Owner id = {{ project.owner_id }}</p>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'

export default {
  name: 'Project',
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
