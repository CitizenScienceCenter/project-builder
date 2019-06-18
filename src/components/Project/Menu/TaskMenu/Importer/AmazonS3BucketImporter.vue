<template>
  <div>
    <b-card v-b-toggle.amazon-s3-collapse @click="closeOtherImporters" ref="card-amazon-s3" class="text-center material" :class="{ 'material-selected': isAmazonS3Visible }">
      <i class="fab fa-aws fa-4x"></i>
      <div class="m-2">Amazon S3 bucket</div>
    </b-card>
    <b-collapse id="amazon-s3-collapse" v-model="isAmazonS3Visible" class="mb-3">

      <b-input placeholder="Bucket name" v-model="bucketName" class="mt-4"></b-input>

        <b-button ref="btn-search" @click="search" class="mt-3" variant="primary">Find bucket files</b-button>
        <b-button ref="btn-add-files" @click="addFiles" v-if="selectedFiles.length > 0" class="mt-3 float-right" variant="success">Add the selected files</b-button>

        <LoadingSpinner :id="loaders.GET_BUCKET_FILES"></LoadingSpinner>

        <b-list-group class="mt-3">
          <b-form-checkbox-group v-model="selectedFiles">

            <b-list-group-item :key="file" v-for="file in bucket.files">
              <b-form-checkbox :value="file">
                <b-link :href="getBucketFileLink(file)" target="_blank">{{ file }}</b-link>
              </b-form-checkbox>
            </b-list-group-item>

          </b-form-checkbox-group>
        </b-list-group>

    </b-collapse>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import LoadingSpinner from '@/components/Helper/LoadingSpinner'

export default {
  name: 'AmazonS3BucketImporter',
  components: {
    LoadingSpinner
  },
  data: () => {
    return {
      selectedFiles: []
    }
  },
  methods: {
    ...mapMutations('task/importer', [
      'setAmazonS3ImporterVisible',
      'setGoogleDocImporterVisible',
      'setLocalCsvImporterVisible',
      'setOnlineCsvImporterVisible',
      'setBucketName',
      'setBucketFiles'
    ]),
    ...mapMutations('notification', [
      'showSuccess',
      'showError'
    ]),
    ...mapActions('task/importer', [
      'getBucketFiles',
      'importAmazonS3Tasks'
    ]),

    closeOtherImporters () {
      this.setGoogleDocImporterVisible(false)
      this.setLocalCsvImporterVisible(false)
      this.setOnlineCsvImporterVisible(false)
    },

    search () {
      this.getBucketFiles(this.bucketName).then(files => {
        // select all the bucket files by default
        this.selectedFiles = files
      })
    },

    addFiles () {
      this.importAmazonS3Tasks({
        project: this.project,
        bucket: this.bucket.name,
        files: this.selectedFiles
      }).then(response => {
        if (response) {
          this.selectedFiles = []
          this.setBucketFiles([])
          this.setBucketName('')
          this.setAmazonS3ImporterVisible(false)
        }
      })
    }
  },
  computed: {
    ...mapState('task/importer', [
      'isAmazonS3ImporterVisible',
      'bucket',
      'loaders'
    ]),
    ...mapState('project', {
      project: state => state.selectedProject
    }),
    ...mapGetters('task/importer', [
      'getBucketFileLink'
    ]),

    isAmazonS3Visible: {
      get () {
        return this.isAmazonS3ImporterVisible
      },
      set (value) {
        this.setAmazonS3ImporterVisible(value)
      }
    },

    bucketName: {
      get () {
        return this.bucket.name
      },
      set (value) {
        this.setBucketName(value)
      }
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
