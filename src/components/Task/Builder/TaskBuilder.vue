<i18n>
    {
    "en": {

    "page-title": "Create Tasks"

    }
    }
</i18n>

<template>
    <div>
        <b-breadcrumb :items="items"></b-breadcrumb>
        <MaterialBuilder v-if="currentStep === 'material'"></MaterialBuilder>
        <JobBuilder v-if="currentStep === 'job'"></JobBuilder>
        <TemplateBuilder v-if="currentStep === 'template'"></TemplateBuilder>
        <SourceBuilder v-if="currentStep === 'source'"></SourceBuilder>
        <SummaryBuilder v-if="currentStep === 'summary'"></SummaryBuilder>

        <app-footer></app-footer>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import MaterialBuilder from '@/components/Task/Builder/MaterialBuilder'
import JobBuilder from '@/components/Task/Builder/JobBuilder'
import SourceBuilder from '@/components/Task/Builder/SourceBuilder'
import SummaryBuilder from '@/components/Task/Builder/SummaryBuilder'
import TemplateBuilder from '@/components/Task/Builder/TemplateBuilder'

import Footer from "@/components/shared/Footer";

export default {
  name: 'TaskBuilder',
    metaInfo: function() {
        return {
            title: this.$t('page-title'),
            meta: [
                {
                    property: 'og:title',
                    content: this.$t('page-title'),
                    template: '%s | '+this.$t('site-title')
                }
            ]
        }
    },
  components: {
      Footer,
    SummaryBuilder,
    SourceBuilder,
    JobBuilder,
    MaterialBuilder,
    TemplateBuilder,
      'app-footer': Footer
  },
  props: {
    pid: {
      required: true
    }
  },
  computed: {
      ...mapState('c3s/project', {
          project: state => state.project
      }),
      /*
    ...mapState('project', {
      project: state => state.selectedProject
    }),
    */
    ...mapState('task/builder', [
      'currentStep',
      'steps'
    ]),
    items () {
      const items = [
        {
          html: '<i class="fas fa-home"></i>&ensp;<span>Project</span>',
          to: { name: 'project', params: { pid: this.pid } }
        },
        {
          text: 'Material',
          to: { name: 'task.builder.material' },
          active: this.currentStep === 'material'
        }
      ]

      if (this.steps.material) {
        items.push({
          text: 'Job',
          to: { name: 'task.builder.job' },
          active: this.currentStep === 'job',
          disabled: this.steps.material === false
        })
      }

      if (this.steps.job) {
        items.push({
          text: 'Template',
          to: { name: 'task.builder.template' },
          active: this.currentStep === 'template',
          disabled: this.steps.job === false
        })
      }

      if (this.steps.template) {
        items.push({
          text: 'Source',
          to: { name: 'task.builder.source' },
          active: this.currentStep === 'source',
          disabled: this.steps.template === false
        })
      }

      if (this.steps.source) {
        items.push({
          text: 'Summary',
          to: { name: 'task.builder.summary' },
          active: this.currentStep === 'summary',
          disabled: this.steps.source === false
        })
      }

      return items
    }
  },
  methods: {
    ...mapMutations('task/builder', [
      'setTaskJob'
    ]),
    ...mapMutations('task/importer', [
      'setDropboxFiles'
    ]),
      /*
    ...mapActions('project', [
      'getProject'
    ])
       */
  },
  watch: {
    steps (steps) {
      if (this.currentStep === 'material' && steps['material'] === true) {

        this.$router.push({ name: 'task.builder.job', params: { pid: 'id' in this.project ? this.project.id : 0 } })

      } else if (this.currentStep === 'job' && steps['job'] === true) {

        this.$router.push({ name: 'task.builder.template', params: { pid: 'id' in this.project ? this.project.id : 0 } })

      } else if (this.currentStep === 'template' && steps['template'] === true) {

        this.$router.push({ name: 'task.builder.source', params: { pid: 'id' in this.project ? this.project.id : 0 } })

      } else if (this.currentStep === 'source' && steps['source'] === true) {

        this.$router.push({ name: 'task.builder.summary', params: { pid: 'id' in this.project ? this.project.id : 0 } })

      } else {

        this.$router.push({ name: 'task.builder.material', params: { pid: 'id' in this.project ? this.project.id : 0 } })

      }
    }
  }
}
</script>

<style lang="scss">




</style>
