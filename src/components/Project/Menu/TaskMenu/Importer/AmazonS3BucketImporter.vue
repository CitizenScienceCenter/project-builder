<template>
  <div>
    <b-card v-b-toggle.amazon-s3-collapse @click="closeOtherImporters" ref="card-amazon-s3" class="text-center material" :class="{ 'material-selected': isAmazonS3Visible }">
      <i class="fab fa-aws fa-4x"></i>
      <div class="m-2">Amazon S3 bucket</div>
    </b-card>
    <b-collapse id="amazon-s3-collapse" v-model="isAmazonS3Visible">
      <b-form @submit.prevent="onSubmit" class="mt-4">
        <b-form-group>
          <b-input placeholder="Bucket name" v-model="bucketName"></b-input>
        </b-form-group>

        <b-button type="submit" variant="success">Find bucket files</b-button>
      </b-form>
    </b-collapse>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'AmazonS3BucketImporter',
  data: () => {
    return {
      bucketName: ''
    }
  },
  methods: {
    ...mapMutations('task/importer', [
      'setAmazonS3ImporterVisible',
      'setGoogleDocImporterVisible',
      'setLocalCsvImporterVisible',
      'setOnlineCsvImporterVisible'
    ]),

    closeOtherImporters () {
      this.setGoogleDocImporterVisible(false)
      this.setLocalCsvImporterVisible(false)
      this.setOnlineCsvImporterVisible(false)
    }
  },
  computed: {
    ...mapState('task/importer', [
      'isAmazonS3ImporterVisible'
    ]),
    ...mapState('project', {
      project: state => state.selectedProject
    }),

    isAmazonS3Visible: {
      get () {
        return this.isAmazonS3ImporterVisible
      },
      set (value) {
        this.setAmazonS3ImporterVisible(value)
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
