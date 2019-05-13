<template>
  <div>
    <b-row class="justify-content-center mt-4">

      <b-col cols="12">
        <b-card no-body>
          <b-tabs pills card>
            <b-tab title="Featured" active>
              <b-row>
                <b-col class="mt-3" :key="project.id" cols="4" v-for="project in getFeaturedProjects">

                  <b-card
                          :title="project.name"
                          :img-src="project.thumbnail ? project.thumbnail : '/static/img/placeholder.project.png'"
                          img-alt="Image"
                          img-top
                          tag="article"
                          style="max-width: 20rem;"
                          class="mb-2">

                    <b-card-text>
                      {{ project.description }}
                    </b-card-text>

                    <b-button href="#" variant="primary">Go to project</b-button>
                  </b-card>

                </b-col>
              </b-row>

            </b-tab>
            <b-tab :key="category.short_name" :title="category.name" v-for="category in categories">
              <b-row>
                <b-col class="mt-3" :key="project.id" cols="4" v-for="project in getProjectsFor(category)">

                  <b-card
                          :title="project.name"
                          :img-src="thumbnail(project, )"
                          img-alt="Image"
                          img-top
                          tag="article"
                          style="max-width: 20rem;"
                          class="mb-2">

                    <b-card-text>
                      {{ project.description }}
                    </b-card-text>

                    <b-button href="#" variant="primary">Go to project</b-button>
                  </b-card>

                </b-col>
              </b-row>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
      </b-row>
  </div>

</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Discover',
  created () {
    this.$store.dispatch('project/getAllPublishedProjects')
  },
  computed: {
    ...mapState('project', {
      categories: state => state.categories
    }),
    ...mapGetters('project', [
      'getProjectsFor',
      'getFeaturedProjects',
      'thumbnail'
    ])
  }
}
</script>

<style scoped>

</style>
