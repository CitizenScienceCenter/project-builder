<template>

  <b-row class="mt-4">

    <b-col md="9">
      <b-form-group>
        <b-input v-model="bucketName" placeholder="Name of the S3 bucket"></b-input>
      </b-form-group>

      <b-btn @click="getBucketLinks(bucket.name)" variant="primary">Search in bucket</b-btn>
      <b-btn @click="onSubmit" variant="success" size="lg" class="float-right" v-if="materialAuthorizedLinks.length > 0">Go!</b-btn>

      <b-list-group class="mt-4">
        <b-list-group-item :key="link" v-for="link in materialAuthorizedLinks">
          <b-img v-if="task.material === materials.image" style="width: 200px" :src="link"></b-img>
          <b-link :href="link">{{ link }}</b-link>
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

export default {
  name: 'AmazonSourceEditor',
  data: () => {
    return {

    }
  },
  mounted () {
    this.setBucketLinks(this.task.sourceContent ? [...this.task.sourceContent] : [])
  },
  computed: {
    ...mapState('task/builder', [
      'bucketLinks', 'materialExtensions', 'task', 'sources', 'materials', 'bucket'
    ]),
    ...mapGetters('task/builder', [
      'getBucketLinksWithExtensions'
    ]),

    materialAuthorizedLinks () {
      return this.getBucketLinksWithExtensions(this.materialExtensions[this.task.material])
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
      'getBucketLinks'
    ]),
    ...mapMutations('task/builder', [
      'setTaskSource', 'setTaskSourceContent', 'setStep', 'setBucketLinks', 'setBucketName'
    ]),

    onSubmit () {
      this.setTaskSource(this.sources.amazon)
      this.setTaskSourceContent([ ...this.materialAuthorizedLinks ])
      this.setStep({ step: 'source', value: true })
    }
  }
}
</script>

<style scoped>

</style>
