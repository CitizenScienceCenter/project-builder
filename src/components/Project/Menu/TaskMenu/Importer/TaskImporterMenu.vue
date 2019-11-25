<i18n>
  {
  "en": {

  "page-title": "Task Importer"

  }
  }
</i18n>

<template>
  <div>

    <breadcrumb :items="items"></breadcrumb>

    <app-content-section>
      <div class="content-subsection">
        <div class="content-wrapper">

          <div class="content-subsection">
            <div class="row row-centered">
              <div class="col scroll-effect">

                <h2 class="heading centered">Task Importer</h2>

                <AmazonS3BucketImporter></AmazonS3BucketImporter>
                <FlickrImporter></FlickrImporter>
                <DropboxImporter></DropboxImporter>
                <TwitterImporter></TwitterImporter>
                <GoogleDocImporter></GoogleDocImporter>
                <OnlineCsvImporter></OnlineCsvImporter>
                <LocalCsvImporter></LocalCsvImporter>

              </div>
            </div>
          </div>

        </div>
      </div>
    </app-content-section>

    <app-footer></app-footer>


    <b-row class="mb-4">
      <b-col>
        <b-breadcrumb :items="items"></b-breadcrumb>

        <h2 class="mt-2">Task Importer</h2>

        <b-row class="mt-4">
          <b-col>
            <AmazonS3BucketImporter></AmazonS3BucketImporter>
          </b-col>
        </b-row>

        <b-row class="mt-4">
          <b-col>
            <FlickrImporter></FlickrImporter>
          </b-col>
        </b-row>

        <b-row class="mt-4">
          <b-col>
            <DropboxImporter></DropboxImporter>
          </b-col>
        </b-row>

        <b-row class="mt-4">
          <b-col>
            <TwitterImporter></TwitterImporter>
          </b-col>
        </b-row>

        <b-row class="mt-4">
          <b-col>
            <GoogleDocImporter></GoogleDocImporter>
          </b-col>
        </b-row>

        <b-row class="mt-4">
          <b-col md="6">
            <OnlineCsvImporter></OnlineCsvImporter>
          </b-col>
          <b-col md="6" class="mt-md-0 mt-4">
            <LocalCsvImporter></LocalCsvImporter>
          </b-col>
        </b-row>

      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import GoogleDocImporter from '@/components/Project/Menu/TaskMenu/Importer/GoogleDocImporter'
import LocalCsvImporter from '@/components/Project/Menu/TaskMenu/Importer/LocalCsvImporter'
import OnlineCsvImporter from '@/components/Project/Menu/TaskMenu/Importer/OnlineCsvImporter'
import AmazonS3BucketImporter from '@/components/Project/Menu/TaskMenu/Importer/AmazonS3BucketImporter'
import FlickrImporter from '@/components/Project/Menu/TaskMenu/Importer/FlickrImporter'
import DropboxImporter from '@/components/Project/Menu/TaskMenu/Importer/DropboxImporter'
import TwitterImporter from '@/components/Project/Menu/TaskMenu/Importer/TwitterImporter'


import ContentSection from '@/components/shared/ContentSection.vue';
import Footer from '@/components/shared/Footer.vue';
import Breadcrumb from "@/components/Breadcrumb";

export default {
  name: 'TaskImportersMenu',
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
  components: {
    Breadcrumb,
    TwitterImporter,
    DropboxImporter,
    FlickrImporter,
    AmazonS3BucketImporter,
    OnlineCsvImporter,
    GoogleDocImporter,
    LocalCsvImporter,
    'app-content-section': ContentSection,
    'app-footer': Footer
  },
  created () {
    this.getProject(this.pid)

    this.setGoogleDocImporterVisible(false)
    this.setLocalCsvImporterVisible(false)
    this.setOnlineCsvImporterVisible(false)
    this.setAmazonS3ImporterVisible(false)
    this.setFlickrImporterVisible(false)
    this.setDropboxImporterVisible(false)
    this.setTwitterImporterVisible(false)
  },
  props: {
    pid: {
      required: true
    }
  },
  data: () => {
    return {

    }
  },
  methods: {
    ...mapActions('c3s/project', [
      'getProject'
    ]),
    ...mapMutations('task/importer', [
      'setGoogleDocImporterVisible',
      'setLocalCsvImporterVisible',
      'setOnlineCsvImporterVisible',
      'setAmazonS3ImporterVisible',
      'setFlickrImporterVisible',
      'setDropboxImporterVisible',
      'setTwitterImporterVisible'
    ])
  },
  computed: {
    ...mapState('c3s/project', {
      project: state => state.project
    }),

    items () {
      return [
        {
          //html: '<i class="fas fa-home"></i>&ensp;<span>Project</span>',
          text: 'Project',
          to: { name: 'project', params: { pid: 'id' in this.project ? this.project.id : 0 } }
        },
        {
          text: 'Task Importer',
          to: { name: 'project.task.importers', params: { pid: 'id' in this.project ? this.project.id : 0 } },
          active: true
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~bootstrap/scss/bootstrap.scss';

  .material {
    &:hover {
     cursor: pointer;
     transition: all 0.3s;
     background-color: $primary;
     color: $white;
   }
  }

  .material-selected {
    background-color: $primary;
    color: $white;
  }
</style>
