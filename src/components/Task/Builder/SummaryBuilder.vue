<template>
  <div>
    <b-row class="mt-4">
      <b-col>
        <h2 class="text-center">Are you ready to rock?!</h2>
      </b-col>
    </b-row>

    <b-row class="mt-4">
      <b-col>
        <ul>
          <li>Material: {{ task.material }}</li>
          <li>Job: {{ task.job }}</li>
          <li>Template: {{ task.template }}</li>
          <li>Source: {{ task.source }}</li>
          <li>
            Files ({{ task.sourceContent.length }})
            <ul>
              <li :key="file" v-for="file in task.sourceContent">
                <b-link v-if="task.source === sources.amazon" :href="getBucketFileLink(file)" target="_blank">{{ file }}</b-link>
                <b-link v-else :href="file" target="_blank">{{ file }}</b-link>
              </li>
            </ul>
          </li>
        </ul>

        <b-btn @click="onSubmit" variant="success" size="lg">Create task</b-btn>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'

import { buildTemplateFromModel } from '@/helper'

import ImageCountTemplate from '@/components/Task/Template/Image/ImageCountTemplate'
import ImageDescribeTemplate from '@/components/Task/Template/Image/ImageDescribeTemplate'
import ImageClassifyTemplate from '@/components/Task/Template/Image/ImageClassifyTemplate'

export default {
  name: 'SummaryBuilder',
  computed: {
    ...mapState('task/builder', [
      'task', 'materials', 'jobs', 'sources', 'bucket'
    ]),
    ...mapState('project', [
      'selectedProject'
    ]),
    ...mapGetters('task/builder', [
      'getBucketFileLink'
    ])
  },
  methods: {
    ...mapActions('task', [
      'saveTaskPresenter',
      'importAmazonS3Tasks'
    ]),
    ...mapMutations('notification', [
      'showSuccess', 'showError'
    ]),

    onSubmit () {
      // the generated template
      let template = null

      /// Template generation depending on what the user has selected

      if (this.task.material === this.materials.image) {

        if (this.task.job === this.jobs.count) {
          template = buildTemplateFromModel(ImageCountTemplate, {
            question: this.task.template
          })
        } else if (this.task.job === this.jobs.describe) {
          template = buildTemplateFromModel(ImageDescribeTemplate, this.task.template)
        } else if (this.task.job === this.jobs.classify) {
          template = buildTemplateFromModel(ImageClassifyTemplate, {
            questions: this.task.template
          })
        }

      }

      if (this.task.material === this.materials.sound) {

        if (this.task.job === this.jobs.classify) {
          console.log('Sound classify template')
        } else if (this.task.job === this.jobs.describe) {
          console.log('Sound describe template')
        }

      }

      if (this.task.material === this.materials.video) {

        if (this.task.job === this.jobs.classify) {
          console.log('Video classify template')
        } else if (this.task.job === this.jobs.describe) {
          console.log('Video describe template')
        }

      }

      if (this.task.material === this.materials.pdf) {

        if (this.task.job === this.jobs.describe) {
          console.log('Pdf describe template')
        }

      }

      if (this.task.material === this.materials.tweet) {

        if (this.task.job === this.jobs.classify) {
          console.log('Tweet classify template')
        } else if (this.task.job === this.jobs.describe) {
          console.log('Tweet describe template')
        }

      }

      // console.log(template)

      // store the generated template for the selected project
      const templatePromise = this.saveTaskPresenter({
        project: this.selectedProject,
        template: template
      })

      /// Tasks importation depending on the selected source
      let sourcePromise = null

      // Amazon S3
      if (this.task.source === this.sources.amazon) {
        sourcePromise = this.importAmazonS3Tasks({
          project: this.selectedProject,
          bucket: this.bucket.name,
          files: this.task.sourceContent
        })
      } else {
        console.log(this.task.source + ' task importer not implemented')
      }

      // test if all calls have been done correctly and redirects to the project detail page
      Promise.all([templatePromise, sourcePromise]).then(results => {
        if (results.filter(el => el !== false).length === 2) {

          this.showSuccess({ title: 'Task created', content: 'Your task has been submited' })
          this.$router.push({ name: 'project', params: { id: this.selectedProject.id } })

        } else {
          this.showError({
            title: 'Error during task creation',
            content: 'We are not able to submit you tasks and your template for the moment'
          })
        }
      })

    }
  }
}
</script>

<style scoped>

</style>
