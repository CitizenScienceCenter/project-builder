<template>
  <b-row class="mb-4">
    <b-col>
      <b-breadcrumb :items="items"></b-breadcrumb>

      <h2 class="mt-2">Tasks importation</h2>

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
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import GoogleDocImporter from '@/components/Activity/Menu/TaskMenu/Importer/GoogleDocImporter'
import LocalCsvImporter from '@/components/Activity/Menu/TaskMenu/Importer/LocalCsvImporter'
import OnlineCsvImporter from '@/components/Activity/Menu/TaskMenu/Importer/OnlineCsvImporter'
import AmazonS3BucketImporter from '@/components/Activity/Menu/TaskMenu/Importer/AmazonS3BucketImporter'
import FlickrImporter from '@/components/Activity/Menu/TaskMenu/Importer/FlickrImporter'
import DropboxImporter from '@/components/Activity/Menu/TaskMenu/Importer/DropboxImporter'
import TwitterImporter from '@/components/Activity/Menu/TaskMenu/Importer/TwitterImporter'

export default {
  name: 'TaskImportersMenu',
  components: {
    TwitterImporter,
    DropboxImporter,
    FlickrImporter,
    AmazonS3BucketImporter,
    OnlineCsvImporter,
    GoogleDocImporter,
    LocalCsvImporter
  },
  created () {
    this.getActivity(this.id)

    this.setGoogleDocImporterVisible(false)
    this.setLocalCsvImporterVisible(false)
    this.setOnlineCsvImporterVisible(false)
    this.setAmazonS3ImporterVisible(false)
    this.setFlickrImporterVisible(false)
    this.setDropboxImporterVisible(false)
    this.setTwitterImporterVisible(false)
  },
  props: {
    id: {
      required: true
    }
  },
  data: () => {
    return {

    }
  },
  methods: {
    ...mapActions('activity', [
      'getActivity'
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
    ...mapState('activity', {
      activity: state => state.selectedActivity
    }),

    items () {
      return [
        {
          html: '<i class="fas fa-home"></i>&ensp;<span>Activity</span>',
          to: { name: 'activity', params: { id: 'id' in this.activity ? this.activity.id : 0 } }
        },
        {
          text: 'Tasks importation',
          to: { name: 'activity.task.importers', params: { id: 'id' in this.activity ? this.activity.id : 0 } },
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
