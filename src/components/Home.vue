<i18n>
{

"en": {

"cover-heading": "Citizen Science Lab",
"cover-subheading": "Start Building Your Projects",
"cover-button-primary": "Create a Project",
"cover-button-secondary": "Browse Projects",

"projects-header": "Latest Projects"

}

}
</i18n>


<template>
  <div>

    <app-cover imageUrl="/static/img/cover.jpg">
      <div class="row row-centered">
        <div class="col col-large-8">
          <h2 class="cover-heading scroll-effect" v-html="$t('cover-heading')"></h2>
        </div>
      </div>
      <div class="row row-centered">
        <div class="col col-large-8">
          <p class="cover-subheading scroll-effect scroll-effect-delayed-1">{{ $t('cover-subheading') }}</p>
        </div>
      </div>
      <div class="row row-centered">
        <div class="col col-large-8">
          <div class="button-group centered scroll-effect scroll-effect-delayed-2">
            <router-link tag="button" :to="{ name: 'project.builder.name' }" class="button button-primary">{{ $t('cover-button-primary') }}</router-link>
            <router-link tag="button" to="/discover" class="button button-secondary button-secondary-inverted">{{ $t('cover-button-secondary') }}</router-link>
          </div>
        </div>
      </div>
    </app-cover>

    <app-content-section v-if="loadedProjects.length > 0">
      <div class="content-wrapper">
        <div class="row row-centered">
          <div class="col col-large-6 scroll-effect">
            <h2 class="heading centered">{{ $t('projects-header') }}</h2>
          </div>
        </div>
        <div class="margin-bottom scroll-effect">
          <ProjectListing :limit="6"></ProjectListing>
        </div>
        <div class="row">
          <div class="col">
            <div class="button-group centered">
              <router-link tag="button" to="/discover" class="button button-secondary">All Projects</router-link>
            </div>
          </div>
        </div>
      </div>
    </app-content-section>

    <section-newsletter-signup></section-newsletter-signup>

    <app-footer></app-footer>



    <!--
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
            Create a Project and get other volunteers to help you collect and/or analyse data.
          </b-card-text>
          <b-button :to="{ name: 'project.builder.name' }" variant="outline-primary">Create a project</b-button>
        </b-card>
      </b-col>

    </b-row>

    <b-row class="mt-4" v-if="projects.length > 0">
      <b-col>
        <h2 class="p-2 text-center">Featured projects</h2>

        <b-row align-v="center" align-h="center">
          <b-col :key="project.id" v-for="project in projects" md="4" class="mt-3">

            <b-card no-body tag="article" class="h-100">
              <b-card-img-lazy v-if="project.info && project.info.thumbnail_url" :src="project.info.thumbnail_url"></b-card-img-lazy>
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

      </b-col>
    </b-row>
    -->

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import Cover from '@/components/shared/Cover.vue';
import ContentSection from '@/components/shared/ContentSection.vue';
import Footer from '@/components/shared/Footer.vue';
import SectionNewsletterSignup from "@/components/shared/SectionNewsletterSignup";
import ProjectTeaser from "@/components/Project/ProjectTeaser";
import ProjectListing from "@/components/Project/ProjectListing";

export default {
  name: 'Home',
  components: {
    ProjectListing,
    ProjectTeaser,
    SectionNewsletterSignup,
      'app-cover': Cover,
      'app-content-section': ContentSection,
      'app-footer': Footer
  },
  data: function() {
    return {
      lang: 'en',

      projectsToLoad: 0,
      loadedProjects: []
    }
  },
  metaInfo: function() {
    return {
      title: this.$t('site-title'),
      titleTemplate: null,
      meta: [
        {
          property: 'og:title',
          content: this.$t('site-title')
        }
      ]
    }
  },
  created () {
    this.$store.dispatch('c3s/project/getProjects', [,6,]).then(res => {
      this.projectsToLoad += res.body.data.length;
      this.loadMediaForProject(0);
    });
  },
  methods: {
    ...mapActions('c3s/project', [
      'getProjects',
      'getProjectMedia'
    ]),
    loadMediaForProject(index) {
      if( index < this.projectsToLoad ) {

        this.getProjectMedia( this.projects[index].id ).then(media => {

          let projectMedia;
          if( media.body.length ) {
            projectMedia = media.body[0];
          }

          this.loadedProjects.push( [ this.projects[index], projectMedia ] );

          // load next
          if( this.loadedProjects.length < this.projects.length ) {
            this.loadMediaForProject(index+1);
          }
        });
      }
    }
  },
  computed: {
    ...mapState({
      projects: state => state.c3s.project.projects,
      user: state => state.c3s.user.currentUser,
      projectId: state => state.consts.projectId
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
