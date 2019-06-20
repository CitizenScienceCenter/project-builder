<template>
  <b-row class="justify-content-center mt-4">
    <b-col>

      <b-card no-body>
        <b-tabs pills card>

          <!-- A tab for each category -->
          <b-tab
                  v-for="category in allCategories"
                  :key="category.id"
                  :title="category.name + (category.short_name in categoryPagination ? ' (' + categoryPagination[category.short_name].total + ')' : '')"
          >
            <!-- A paginator at the top -->
            <b-row>
              <b-col>
                <b-pagination
                        v-model="categoryCurrentPage[category.id]"
                        @change="pageChange($event, category)"
                        align="center"
                        :per-page="category.short_name in categoryPagination ? categoryPagination[category.short_name].per_page: 20"
                        :total-rows="category.short_name in categoryPagination ? categoryPagination[category.short_name].total: 0"
                ></b-pagination>
              </b-col>
            </b-row>

            <!-- The list of projects -->
            <b-row>
              <b-col class="mt-3" :key="project.id" md="4" v-for="project in categoryProjects[category.short_name]">

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

            <!-- A paginator at the bottom -->
            <b-row class="mt-3">
              <b-col>
                <b-pagination
                        v-model="categoryCurrentPage[category.id]"
                        @change="pageChange($event, category)"
                        align="center"
                        :per-page="category.short_name in categoryPagination ? categoryPagination[category.short_name].per_page: 20"
                        :total-rows="category.short_name in categoryPagination ? categoryPagination[category.short_name].total: 0"
                ></b-pagination>
              </b-col>
            </b-row>
          </b-tab>

        </b-tabs>
      </b-card>

    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Discover',
  created () {
    // all categories are loaded during the creation to have all the pagination systems
    this.getCategories().then(() => {
      this.allCategories.forEach(category => {
        this.categoryCurrentPage[category.id] = 1
        this.getProjectsWithCategory({
          category
        })
      })
    })
  },
  data: () => {
    return {
      categoryCurrentPage: {}
    }
  },
  methods: {
    ...mapActions('project', [
      'getCategories',
      'getProjectsWithCategory'
    ]),

    /**
     * Loads the projects in the specified page for the given category
     * Method called when the paginator is clicked
     */
    pageChange (page, category) {
      this.getProjectsWithCategory({
        category,
        page
      })
    }
  },
  computed: {
    ...mapState('project', [
      'categories',
      'categoryProjects',
      'categoryPagination'
    ]),

    /**
     * Returns the categories with the featured category
     * @return {*[]}
     */
    allCategories () {
      return [
        { id: 0, short_name: 'featured', name: 'Featured' },
        ...this.categories
      ]
    }
  }
}
</script>

<style scoped>

</style>
