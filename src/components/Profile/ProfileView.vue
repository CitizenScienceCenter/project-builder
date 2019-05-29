<template>
  <div>

    <!-- Draft projects -->
    <b-row>
      <b-col>
        <h2 class="text-center">Draft projects</h2>

        <b-row align-v="start" class="justify-content-center">
          <b-col class="mt-3" :key="project.id" md="4" v-for="project in draftProjects">

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

              <b-btn variant="primary" :to="{ name: 'project', params: { id: project.id } }">Go to project</b-btn>
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
