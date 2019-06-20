<template>
  <div>
    <!-- Draft projects -->
    <b-row>
      <b-col>
        <h2 class="text-center">Draft projects</h2>

        <b-row align-v="start" class="justify-content-center">
          <b-col class="mt-3" :key="project.id" md="4" v-for="project in draftProjects">

            <b-card no-body tag="article" class="mb-2 h-100">
              <b-card-img v-if="project.info.thumbnail_url" :top="true" :src="project.info.thumbnail_url"></b-card-img>
              <b-img v-else :blank="true" blank-color="grey" class="w-100" height="250"></b-img>

              <b-card-body>
                <b-card-title :title="project.name"></b-card-title>

                <b-card-text>
                  {{ project.description }}
                </b-card-text>

                <b-button :to="{ name: 'project', params: { id: project.id } }" variant="primary">Go to project</b-button>
              </b-card-body>
            </b-card>

          </b-col>
        </b-row>

      </b-col>
    </b-row>

    <!-- Contributed projects -->
    <b-row class="mt-3">
      <b-col>

        <h2 class="text-center">Your Contributions</h2>

        <b-row align-v="start" class="justify-content-center">
          <b-col class="mt-3" :key="project.id" md="4" v-for="project in contributedProjects">

            <b-card no-body tag="article" class="mb-2 h-100">
              <b-card-img v-if="project.info.thumbnail_url" :top="true" :src="project.info.thumbnail_url"></b-card-img>
              <b-img v-else :blank="true" blank-color="grey" class="w-100" height="250"></b-img>

              <b-card-body>
                <b-card-title :title="project.name"></b-card-title>

                <b-card-text>
                  {{ project.description }}
                </b-card-text>

                <b-button :to="{ name: 'project', params: { id: project.id } }" variant="primary">Go to project</b-button>
              </b-card-body>
            </b-card>

          </b-col>
        </b-row>

      </b-col>
    </b-row>

  </div>
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
