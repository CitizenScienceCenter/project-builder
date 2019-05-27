<template>
  <div>
    <b-row class="justify-content-center mt-4">

      <b-col cols="12">
        <b-card no-body>
          <b-tabs pills card>

            <!-- Featured projects -->
            <b-tab :title="'Featured (' + featuredProjects.length + ')'" active>
              <b-row>
                <b-col class="mt-3" :key="project.id" cols="4" v-for="project in featuredProjects">

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
            </b-tab>

            <!-- Other categories -->
            <b-tab :key="category.short_name" :title="category.name + ' (' + getProjectsWithCategory(category).length + ')'" v-for="category in categories">
              <b-row>
                <b-col class="mt-3" :key="project.id" cols="4" v-for="project in getProjectsWithCategory(category)">

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
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
      </b-row>
  </div>

</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'Discover',
  mounted () {
    this.getCategories()
    this.getFeaturedProjects()
    this.getAllProjects()
  },
  methods: {
    ...mapActions('project', [
      'getCategories', 'getFeaturedProjects', 'getAllProjects'
    ])
  },
  computed: {
    ...mapState('project', [
      'categories', 'featuredProjects'
    ]),
    ...mapGetters('project', [
      'getProjectsWithCategory'
    ])
  }
}
</script>

<style scoped>

</style>
