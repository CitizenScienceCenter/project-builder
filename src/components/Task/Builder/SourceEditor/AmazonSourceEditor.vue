<template>
  <b-row class="mt-4">

    <b-col md="9">
      <b-form-group>
        <b-input v-model="bucketName" placeholder="Name of the S3 bucket"></b-input>
      </b-form-group>

      <b-btn ref="btn-get-bucket-links" @click="search" variant="primary">Search in bucket</b-btn>
      <b-btn ref="btn-submit" @click="onSubmit" variant="success" size="lg" class="float-right" v-if="allowedFiles.length > 0">Go!</b-btn>

      <LoadingSpinner class="mt-4" :id="loaders.GET_BUCKET_FILES"></LoadingSpinner>

      <b-form-checkbox :key="file" v-model="selectedFiles" v-for="file in allowedFiles" :value="file" class="mb-3">
        <b-img v-if="task.material === materials.image" width="200" height="170" :src="getBucketFileLink(file)"></b-img>
        <b-link :href="getBucketFileLink(file)" target="_blank">{{ file }}</b-link>
      </b-form-checkbox>
    </b-col>

    <b-col md="3">
      <p>You can use any free licensed pics (Creative Commons or alike), your own pictures or those copyright images that you are authorised to use.</p>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex'
import LoadingSpinner from '@/components/Helper/LoadingSpinner'

export default {
  name: 'AmazonSourceEditor',
  components: {
    LoadingSpinner
  },
  data: () => {
    return {
      selectedFiles: []
    }
  },
  created () {
    if (this.bucketName.length > 0) {
      this.selectedFiles = Array.isArray(this.task.sourceContent) ? [...this.task.sourceContent] : []
    }
  },
  computed: {
    ...mapState('task/builder', [
      'materialExtensions', 'task', 'sources', 'materials', 'bucket', 'loaders'
    ]),
    ...mapGetters('task/builder', [
      'getBucketFilesWithExtensions', 'getBucketFileLink'
    ]),

    /**
     * Only returns the files which have a material compatible extension
     * @return {Function}
     */
    allowedFiles () {
      return this.getBucketFilesWithExtensions(this.materialExtensions[this.task.material])
    },

    bucketName: {
      get () {
        return this.bucket.name
      },
      set (value) {
        this.setBucketName(value)
      }
    }
  },
  methods: {
    ...mapActions('task/builder', [
      'getBucketFiles'
    ]),
    ...mapMutations('task/builder', [
      'setTaskSource', 'setTaskSourceContent', 'setStep', 'setBucketFiles', 'setBucketName', 'deleteBucketFile'
    ]),

    search () {
      this.getBucketFiles(this.bucket.name).then(() => {
        this.selectedFiles = this.allowedFiles
      })
    },

    onSubmit () {
      this.setTaskSource(this.sources.amazon)
      this.setTaskSourceContent([ ...this.selectedFiles ])
      this.setStep({ step: 'source', value: true })
    }
  }
}
</script>

<style scoped>

</style>
