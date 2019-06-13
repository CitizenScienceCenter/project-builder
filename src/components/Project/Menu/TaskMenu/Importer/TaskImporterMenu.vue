<template>
  <b-row>
    <b-col>
      <b-breadcrumb :items="items"></b-breadcrumb>

      <h2 class="mt-2">Tasks importation</h2>

      <b-row class="mt-4">
        <b-col md="6">
          <AmazonS3BucketImporter></AmazonS3BucketImporter>
        </b-col>
        <b-col md="6" class="mt-md-0 mt-4">
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
import GoogleDocImporter from '@/components/Project/Menu/TaskMenu/Importer/GoogleDocImporter'
import LocalCsvImporter from '@/components/Project/Menu/TaskMenu/Importer/LocalCsvImporter'
import OnlineCsvImporter from '@/components/Project/Menu/TaskMenu/Importer/OnlineCsvImporter'
import AmazonS3BucketImporter from '@/components/Project/Menu/TaskMenu/Importer/AmazonS3BucketImporter'

export default {
  name: 'TaskImportersMenu',
  components: {
    AmazonS3BucketImporter,
    OnlineCsvImporter,
    GoogleDocImporter,
    LocalCsvImporter
  },
  created () {
    if (Object.keys(this.project).length === 0) {
      this.getProject(this.id)
    }
    this.setGoogleDocImporterVisible(false)
    this.setLocalCsvImporterVisible(false)
    this.setOnlineCsvImporterVisible(false)
    this.setAmazonS3ImporterVisible(false)
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
    ...mapActions('project', [
      'getProject'
    ]),
    ...mapMutations('task/importer', [
      'setGoogleDocImporterVisible',
      'setLocalCsvImporterVisible',
      'setOnlineCsvImporterVisible',
      'setAmazonS3ImporterVisible'
    ])
  },
  computed: {
    ...mapState('project', {
      project: state => state.selectedProject
    }),

    items () {
      return [
        {
          text: (this.project ? this.project.name : '') + ' project',
          to: { name: 'project', params: { id: 'id' in this.project ? this.project.id : 0 } }
        },
        {
          text: 'Tasks importation',
          to: { name: 'project.task.importers', params: { id: 'id' in this.project ? this.project.id : 0 } },
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
