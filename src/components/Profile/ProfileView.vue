<template>
  <b-card no-body>
    <b-tabs card pills fill>

      <!-- Draft project -->
      <b-tab title="Draft projects">

        <!-- The list of projects -->
        <b-row v-if="draftProjects.length > 0">
          <b-col :key="project.id" v-for="project in draftProjects" md="4" class="mt-3">

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
        <b-row v-else>
          <b-col class="text-center">
            <b-btn variant="outline-secondary" :to="{ name: 'project.builder.name' }">Create a project</b-btn>
          </b-col>
        </b-row>

      </b-tab>

      <b-tab title="Your contributions">

        <!-- The list of projects -->
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
                <b-button :to="{ name: 'project', params: { id: project.id } }" variant="primary">Go to project</b-button>
              </b-card-footer>
            </b-card>

          </b-col>
        </b-row>
        <b-row v-else>
          <b-col class="text-center">
            <b-btn variant="outline-secondary" :to="{ name: 'discover' }">Find a project</b-btn>
          </b-col>
        </b-row>
      </b-tab>

      <b-tab title="Published projects">

        <!-- The list of projects -->
        <b-row v-if="publishedProjects.length > 0">
          <b-col :key="project.id" v-for="project in publishedProjects" md="4" class="mt-3">

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
        <b-row v-else>
          <b-col class="text-center">
            <b-btn variant="outline-secondary" :to="{ name: 'project.builder.name' }">Create a project</b-btn>
          </b-col>
        </b-row>
      </b-tab>

    </b-tabs>
  </b-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ProfileView',
  computed: {
    ...mapState('user', {
      draftProjects: state => state.draftProjects,
      contributedProjects: state => state.contributedProjects,
      publishedProjects: state => state.publishedProjects
    })
  }
}
</script>

<style scoped>

</style>
