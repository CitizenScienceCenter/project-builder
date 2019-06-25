<template>
  <b-row class="justify-content-center mt-4">
    <b-col>

      <b-card no-body>
        <b-tabs pills card align="center">

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
              <b-col :key="project.id" v-for="project in categoryProjects[category.short_name]" md="4" class="mt-3">

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
