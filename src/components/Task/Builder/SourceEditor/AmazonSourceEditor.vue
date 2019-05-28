<template>
  <b-row class="mt-4">

    <b-col md="9">
      <b-form-group>
        <b-input v-model="bucketName" placeholder="Name of the S3 bucket"></b-input>
      </b-form-group>

      <b-btn ref="btn-get-bucket-links" @click="getBucketFiles(bucket.name)" variant="primary">Search in bucket</b-btn>
      <b-btn ref="btn-submit" @click="onSubmit" variant="success" size="lg" class="float-right" v-if="allowedFiles.length > 0">Go!</b-btn>

      <LoadingSpinner class="mt-4" :id="loaders.GET_BUCKET_FILES"></LoadingSpinner>

      <b-list-group class="mt-4">
        <b-list-group-item :key="file" v-for="file in allowedFiles">
          <div>
            <b-img v-if="task.material === materials.image" thumbnail style="width: 200px" :src="getBucketFileLink(file)"></b-img>
            <b-link :href="getBucketFileLink(file)" target="_blank">{{ file }}</b-link>
          </div>
         <div class="text-right">
           <b-btn @click="deleteBucketFile(file)" variant="danger">Delete</b-btn>
         </div>
        </b-list-group-item>
      </b-list-group>
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

    }
  },
  mounted () {
    this.setBucketFiles(Array.isArray(this.task.sourceContent) ? [...this.task.sourceContent] : [])
  },
  computed: {
    ...mapState('task/builder', [
      'bucketFiles', 'materialExtensions', 'task', 'sources', 'materials', 'bucket', 'loaders'
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

    onSubmit () {
      this.setTaskSource(this.sources.amazon)
      this.setTaskSourceContent([ ...this.allowedFiles ])
      this.setStep({ step: 'source', value: true })
    }
  }
}
</script>

<style scoped>

</style>
