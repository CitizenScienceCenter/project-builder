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
            Links ({{ task.sourceContent.length }})
            <ul>
              <li :key="link" v-for="link in task.sourceContent">
                <b-link :href="link" target="_blank">{{ link }}</b-link>
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
import {mapState} from 'vuex'

import ImageCountTemplate from '@/components/Task/Template/Image/ImageCountTemplate'
import ImageDescribeTemplate from '@/components/Task/Template/Image/ImageDescribeTemplate'
import ImageClassifyTemplate from '@/components/Task/Template/Image/ImageClassifyTemplate'

export default {
  name: 'SummaryBuilder',
  computed: {
    ...mapState('task/builder', [
      'task', 'materials', 'jobs'
    ])
  },
  methods: {
    buildTemplateFromModel (templateModel, templateData) {
      // escape template
      const template = JSON.stringify(templateModel.template)
        .replace(/\\n/g, '\n') // replace escaped \n with correctly encoded new lines
        .replace(/(^"|"$)/g, '`') // use ` quotes instead of " quotes for the template string
        .replace(/\\"/g, '"') // replace \" with "

      // generates the component data property with the given template data
      const data = '() => { return ' + JSON.stringify({ ...templateModel.data, ...templateData }) + '}'

      // generates all the template model methods in correctly formatted strings
      let methods = ''
      for (let property in templateModel.methods) {
        if (templateModel.methods.hasOwnProperty(property)) {
          methods += '\t' + property + ': ' + templateModel.methods[property].toString() + ',\n'
        }
      }
      methods = '{\n' + methods + '  }'

      // gets the mounted function in string
      const mounted = templateModel.mounted.toString()

      // transforms props in JSON string
      const props = JSON.stringify(templateModel.props)

      // returns the final template with correct indent
      return `{
  template: ` + template + `,\n
  data: ` + data + `,\n
  methods: ` + methods + `,\n
  mounted: ` + mounted + `,\n
  props: ` + props + `\n
}`
    },

    onSubmit () {
      let template = null

      if (this.task.material === this.materials.image) {

        if (this.task.job === this.jobs.count) {
          template = this.buildTemplateFromModel(ImageCountTemplate, {
            question: this.task.template
          })
        } else if (this.task.job === this.jobs.describe) {
          template = this.buildTemplateFromModel(ImageDescribeTemplate, this.task.template)
        } else if (this.task.job === this.jobs.classify) {
          template = this.buildTemplateFromModel(ImageClassifyTemplate, {
            questions: this.task.template
          })
        }

      }

      if (this.task.material === this.materials.sound) {

        if (this.task.job === this.jobs.classify) {

        } else if (this.task.job === this.jobs.describe) {

        }

      }

      if (this.task.material === this.materials.video) {

        if (this.task.job === this.jobs.classify) {

        } else if (this.task.job === this.jobs.describe) {

        }

      }

      if (this.task.material === this.materials.pdf) {

        if (this.task.job === this.jobs.describe) {

        }

      }

      if (this.task.material === this.materials.tweet) {

        if (this.task.job === this.jobs.classify) {

        } else if (this.task.job === this.jobs.describe) {

        }

      }

      console.log(template)
      // TODO : send generated template to Pybossa server
    }
  }
}
</script>

<style scoped>

</style>
