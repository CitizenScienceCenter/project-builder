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

    <b-row class="justify-content-center mt-4">
      <h2 class="p-2">Featured projects</h2>
      <b-col cols="12">
        <b-row align-v="center" class="justify-content-center">
          <b-col class="mt-3" :key="project.id" md="4" v-for="project in projects">
            <b-card
              :title="project.name"
              :img-src="project.info.thumbnail_url"
              img-alt="Image"
              img-top
              tag="article"
              style="max-width: 20rem;"
              class="mb-2">

              <b-card-text>
                {{ project.description }}
              </b-card-text>

              <b-button :to="{ name: 'project', params: { id: project.id } }" variant="primary">Go to project</b-button>
            </b-card>
          </b-col>
        </b-row>

      </b-col>
    </b-row>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TemplateRenderer from '@/components/Task/TemplateRenderer'

export default {
  name: 'Home',
  components: {
    TemplateRenderer
  },
  created () {
    this.getFeaturedProjects()
  },
  methods: {
    ...mapActions('project', [
      'getFeaturedProjects'
    ])
  },
  computed: {
    ...mapState('project', {
      projects: state => state.featuredProjects
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
