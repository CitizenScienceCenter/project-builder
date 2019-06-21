<template>
  <div>

    <b-row class="mt-4">

      <b-col cols="12" md="6">
        <b-card bg-variant="light" text-variant="dark">
          <b-card-text>
            Find a project that fascinate you, and help researchers analyse their data
          </b-card-text>
          <b-button :to="{ name: 'discover' }" variant="outline-primary">Find a project</b-button>
        </b-card>
      </b-col>

      <b-col cols="12" md="6" class="mt-4 mt-sm-0">
        <b-card bg-variant="light" text-variant="dark">
          <b-card-text>
            Create a Project and get other volunteers to help you analyse your data.
          </b-card-text>
          <b-button :to="{ name: 'project.builder.name' }" variant="outline-primary">Create a project</b-button>
        </b-card>
      </b-col>

    </b-row>

    <b-row class="mt-4">
      <b-col>
        <h2 class="p-2 text-center">Featured projects</h2>

        <b-row align-v="center" align-h="center">
          <b-col :key="project.id" v-for="project in projects" md="4" class="mt-3">

            <b-card no-body tag="article" class="h-100">
              <b-card-img-lazy v-if="project.info.thumbnail_url" :src="project.info.thumbnail_url"></b-card-img-lazy>
              <b-card-img-lazy v-else :src="'https://dummyimage.com/334x250/777777/fff&text=' + project.name"></b-card-img-lazy>

              <b-card-body>
                <b-card-title :title="project.name"></b-card-title>
                <b-card-text>{{ project.description }}</b-card-text>
              </b-card-body>

              <b-card-footer class="text-center">
                <b-button :to="{ name: 'project', params: { id: project.id } }" variant="primary">Go to project</b-button>
              </b-card-footer>
            </b-card>

          </b-col>
        </b-row>

      </b-col>
    </b-row>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',
  created () {
    this.getProjectsWithCategory({
      category: { short_name: 'featured' }
    })
  },
  methods: {
    ...mapActions('project', [
      'getProjectsWithCategory'
    ])
  },
  computed: {
    ...mapState('project', {
      projects: state => 'featured' in state.categoryProjects ? state.categoryProjects.featured : []
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
