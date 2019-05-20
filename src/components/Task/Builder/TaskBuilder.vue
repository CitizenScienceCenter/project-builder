<template>
  <div>
    <b-breadcrumb :items="items"></b-breadcrumb>
    <MaterialBuilder v-if="currentStep === 'material'"></MaterialBuilder>
    <JobBuilder v-if="currentStep === 'job'"></JobBuilder>
    <TemplateBuilder v-if="currentStep === 'template'"></TemplateBuilder>
    <SourceBuilder v-if="currentStep === 'source'"></SourceBuilder>
    <SummaryBuilder v-if="currentStep === 'summary'"></SummaryBuilder>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import MaterialBuilder from '@/components/Task/Builder/MaterialBuilder'
import JobBuilder from '@/components/Task/Builder/JobBuilder'
import SourceBuilder from '@/components/Task/Builder/SourceBuilder'
import SummaryBuilder from '@/components/Task/Builder/SummaryBuilder'
import TemplateBuilder from '@/components/Task/Builder/TemplateBuilder'

export default {
  name: 'TaskBuilder',
  components: {
    SummaryBuilder,
    SourceBuilder,
    JobBuilder,
    MaterialBuilder,
    TemplateBuilder
  },
  computed: {
    ...mapState('task/builder', [
      'currentStep', 'steps'
    ]),
    items () {
      return [
        {
          text: 'Material',
          to: { name: 'task.builder.material' },
          active: this.currentStep === 'material'
        },
        {
          text: 'Job',
          to: { name: 'task.builder.job' },
          active: this.currentStep === 'job',
          disabled: this.currentStep === 'material'
        },
        {
          text: 'Template',
          to: { name: 'task.builder.template' },
          active: this.currentStep === 'template',
          disabled: this.currentStep === 'job' || this.currentStep === 'material'
        },
        {
          text: 'Source',
          to: { name: 'task.builder.source' },
          active: this.currentStep === 'source',
          disabled: this.currentStep === 'job' || this.currentStep === 'material' || this.currentStep === 'template'
        },
        {
          text: 'Summary',
          to: { name: 'task.builder.summary' },
          active: this.currentStep === 'summary',
          disabled: true
        }
      ]
    }
  },
  methods: {
    ...mapMutations('task/builder', [
      'setTaskJob'
    ])
  },
  watch: {
    steps (newValue, oldValue) {
      if (this.currentStep === 'material' && newValue['material'] === true) {

        // this.setTaskJob(null)
        this.$router.push({name: 'task.builder.job'})

      } else if (this.currentStep === 'job' && newValue['job'] === true) {

        this.$router.push({name: 'task.builder.template'})

      } else if (this.currentStep === 'template' && newValue['template'] === true) {

        this.$router.push({name: 'task.builder.source'})

      } else if (this.currentStep === 'source' && newValue['source'] === true) {

        this.$router.push({name: 'task.builder.summary'})

      } else {
        this.$router.push({ name: 'task.builder.material' })
      }
    }
  }
}
</script>

<style scoped>

</style>
