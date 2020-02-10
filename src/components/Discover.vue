<i18n>
  {

  "en": {

  "page-title": "Projects",

  "projects-header": "All Projects"

  }

  }
</i18n>

<template>
  <div>
    <app-content-section>
      <div class="content-wrapper">
        <div class="row row-centered">
          <div class="col col-large-6 scroll-effect">
            <h2 class="heading centered">{{ $t('projects-header') }}</h2>
          </div>
        </div>
        <div class="scroll-effect">

          <template v-if="currentUser && currentUser.info.isAdmin">
            <!-- admin users see tabs -->
            <tabbed-content>
              <tab>
                <template slot="title">Active Projects</template>
                <template slot="content">
                  <ProjectListing :search="{
                    'select': {
                      'fields': [
                        '*'
                      ],
                      'tables': [
                        'projects'
                      ],
                      'orderBy': {
                        'created_at': 'DESC'
                      }
                    },
                    'where': [
                      {
                        'field': 'active',
                        'op': 'e',
                        'val': true
                      },
                      {
                        'field': '(info->\'builder\') :: bool',
                        'op': 'e',
                        'val': true,
                        'join': 'a'
                      }
                    ]
                    }" :limit="20" showMore></ProjectListing>
                </template>
              </tab>
              <tab>
                <template slot="title">Waiting for Approval</template>
                <template slot="content">
                  <ProjectListing :search="{
                    'select': {
                      'fields': [
                        '*'
                      ],
                      'tables': [
                        'projects'
                      ],
                      'orderBy': {
                        'created_at': 'DESC'
                      }
                    },
                    'where': [
                      {
                        'field': 'active',
                        'op': 'e',
                        'val': false
                      },
                      {
                        'field': '(info->\'builder\') :: bool',
                        'op': 'e',
                        'val': true,
                        'join': 'a'
                      },
                      {
                        'field': '(info->\'requestApproval\') :: bool',
                        'op': 'e',
                        'val': true,
                        'join': 'a'
                      },
                    ]
                    }" :limit="20" showMore></ProjectListing>
                </template>
              </tab>
            </tabbed-content>
          </template>

          <template v-else>
            <!-- regular users only see active builder projects -->
            <ProjectListing :search="{
                    'select': {
                      'fields': [
                        '*'
                      ],
                      'tables': [
                        'projects'
                      ],
                      'orderBy': {
                        'created_at': 'DESC'
                      }
                    },
                    'where': [
                      {
                        'field': 'active',
                        'op': 'e',
                        'val': true
                      },
                      {
                        'field': '(info->\'builder\') :: bool',
                        'op': 'e',
                        'val': true,
                        'join': 'a'
                      }
                    ]
                    }" :limit="20" showMore></ProjectListing>

          </template>

        </div>
      </div>
    </app-content-section>

    <app-footer></app-footer>

  </div>

    <!--
    <br>
    <br>
    <br>

    <b-row class="justify-content-center mt-4">
      <b-col v-if="projects">

        <b-card no-body>
          <b-tabs pills card align="center">


            <b-tab :title="'All (' + projects.length + ')'">
              <b-row>
                <b-col>
                  <b-pagination
                          v-model="categoryAll.currentPage"
                          @change="categoryAllPageChange"
                          align="center"
                          :per-page="categoryAll.paginationSize"
                          :total-rows="projects.length"
                  ></b-pagination>
                </b-col>
              </b-row>

              <b-row>
                <b-col :key="project.id" v-for="project in projects" md="4" class="mt-3">

                  <b-card no-body tag="article" class="h-100">
                    <b-card-img-lazy v-if="project.info.thumbnail_url" :src="project.info.thumbnail_url"></b-card-img-lazy>
                    <b-card-img-lazy v-else :src="'https://dummyimage.com/334x250/777777/fff&text=' + project.name"></b-card-img-lazy>

                    <b-card-body>
                      <b-card-title :title="project.name"></b-card-title>
                      <b-card-text>{{ project.description }}</b-card-text>
                    </b-card-body>

                    <b-card-footer class="text-center">
                      <b-button :to="{ name: 'project', params: { pid: project.id } }" variant="primary">Go to project</b-button>
                    </b-card-footer>
                  </b-card>

                </b-col>
              </b-row>

              <b-row class="mt-3">
                <b-col>
                  <b-pagination
                          v-model="categoryAll.currentPage"
                          @change="categoryAllPageChange"
                          align="center"
                          :per-page="categoryAll.paginationSize"
                          :total-rows="projects.length"
                  ></b-pagination>
                </b-col>
              </b-row>
            </b-tab>


            <b-tab
                    v-for="category in allCategories"
                    :key="category.id"
                    :title="category.name + (category.short_name in categoryPagination ? ' (' + categoryPagination[category.short_name].total + ')' : '')"
            >

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


              <b-row>
                <b-col :key="project.id" v-for="project in categoryProjects[category.short_name]" md="4" class="mt-3">

                  <b-card no-body tag="article" class="h-100">
                    <b-card-img-lazy v-if="project.info && project.info.thumbnail_url" :src="project.info.thumbnail_url"></b-card-img-lazy>
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

    -->
</template>

<script>
import { mapState, mapActions } from 'vuex'

import ContentSection from '@/components/shared/ContentSection.vue';
import Footer from '@/components/shared/Footer.vue';
import ProjectListing from "@/components/Project/ProjectListing";
import TabbedContent from "@/components/shared/TabbedContent";
import Tab from "@/components/shared/Tab";

export default {
  name: 'Discover',
  components: {
    Tab,
    TabbedContent,
    ProjectListing,
    'app-content-section': ContentSection,
    'app-footer': Footer,
  },
  metaInfo: function() {
    return {
      title: this.$t('page-title'),
      meta: [
        {
          property: 'og:title',
          content: this.$t('page-title'),
          template: '%s | '+this.$t('site-title')
        }
      ]
    }
  },
  created () {
    // all categories are loaded during the creation to have all the pagination systems
    // this.getCategories().then(() => {
    //   this.allCategories.forEach(category => {
    //     this.categoryCurrentPage[category.id] = 1
    //     this.getProjectsWithCategory({
    //       category
    //     })
    //   })
    // })
  },
  data: () => {
    return {
      categoryCurrentPage: {},
      // category 'all' specific data
      categoryAll: {
        showedProjects: [],
        paginationSize: 20,
        currentPage: 1
      }
    }
  },
  methods: {
    ...mapActions('c3s/project', [
      'getProject',
      'getProjects',
      'getProjectMedia'
      // 'getCategories',
      // 'getProjectsWithCategory'
    ]),

    /**
     * Special pagination system for the category 'all'
     */
    categoryAllPageChange (page) {
      const endIndex = page * this.categoryAll.paginationSize
      const startIndex = endIndex - this.categoryAll.paginationSize
      this.categoryAll.showedProjects = this.projects.slice(startIndex, endIndex)
    },

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
    ...mapState('c3s/project', [
      'projects'
    ]),
    ...mapState({
      currentUser: state => state.c3s.user.currentUser
    }),

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

<style>

</style>
