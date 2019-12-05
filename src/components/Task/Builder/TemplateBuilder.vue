<template>
  <div>

    <app-content-section>
      <div class="content-subsection">
        <div class="content-wrapper">
          <div class="row row-centered">
            <div class="col col-large-6 col-xlarge-4 scroll-effect">

              <div class="margin-bottom">
                <div class="button-group centered">
                  <button class="button button-secondary button-icon button-secondary-naked" @click="goBack">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M159.69,239l136-136a23.9,23.9,0,0,1,33.9,0l22.6,22.6a23.9,23.9,0,0,1,0,33.9L255.89,256l96.4,96.4a23.9,23.9,0,0,1,0,33.9L329.69,409a23.9,23.9,0,0,1-33.9,0l-136-136a23.93,23.93,0,0,1-.1-34Z"/></svg>
                    Go Back
                  </button>
                </div>
              </div>

              <h2 class="heading centered">{{ task.job | capitalize }}</h2>

              <template v-if="task.job === jobs.classify">
                <p>Formulate simple questions and provide even simpler answer options!</p>
                <ClassifyTemplateEditor></ClassifyTemplateEditor>
              </template>
              <template v-if="task.job === jobs.describe">
                <DescribeTemplateEditor></DescribeTemplateEditor>
              </template>
              <template v-if="task.job === jobs.count">
                <p>Explain briefly what users should be counting. They will then be able to locate the things to be counted on the image.</p>
                <CountTemplateEditor></CountTemplateEditor>
              </template>



            </div>
          </div>
        </div>
      </div>
    </app-content-section>


    <!--

    <b-row class="mt-4 mb-2">
      <b-col>
        <h2 class="text-center">{{ task.job | capitalize }}</h2>
        <b-link @click="goBack">Go back</b-link>
      </b-col>
    </b-row>

    <b-row v-if="task.job === jobs.classify">
      <b-col md="9">
        <ClassifyTemplateEditor></ClassifyTemplateEditor>
      </b-col>
      <b-col md="3">
        <p>Formulate simple questions and provide even simpler answer options!</p>
        <p>If our template doesn't exactly fit your project, you can always try our <b-link :to="{ name: 'project.task.presenter.settings', params: { id: this.selectedProject.id } }">expert path</b-link>. But remember: not for beginners!</p>
      </b-col>
    </b-row>

    <b-row v-if="task.job === jobs.describe">
      <b-col md="9">
        <DescribeTemplateEditor></DescribeTemplateEditor>
      </b-col>
      <b-col md="3">
        <p>If our template doesn't exactly fit your project, you can always try our <b-link :to="{ name: 'project.task.presenter.settings', params: { id: 'id' in this.selectedProject ? this.selectedProject.id : 0 } }">expert path</b-link>. But remember: not for beginners!</p>
      </b-col>
    </b-row>

    <b-row v-if="task.job === jobs.count">
      <b-col md="9">
        <CountTemplateEditor></CountTemplateEditor>
      </b-col>
      <b-col md="3">
        <p>Explain briefly what users should be counting. They will then be able to locate the things to be counted on the image.</p>
        <p>If our template doesn't exactly fit your project, you can always try our <b-link :to="{ name: 'project.task.presenter.settings', params: { id: 'id' in this.selectedProject ? this.selectedProject.id : 0 } }">expert path</b-link>. But remember: not for beginners!</p>
      </b-col>
    </b-row>
    -->

  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import ClassifyTemplateEditor from '@/components/Task/Builder/TemplateEditor/ClassifyTemplateEditor'
import CountTemplateEditor from '@/components/Task/Builder/TemplateEditor/CountTemplateEditor'
import DescribeTemplateEditor from '@/components/Task/Builder/TemplateEditor/DescribeTemplateEditor'

import ContentSection from '@/components/shared/ContentSection.vue';

export default {
  name: 'TemplateBuilder',
  components: {
    ClassifyTemplateEditor,
    CountTemplateEditor,
    DescribeTemplateEditor,

    'app-content-section': ContentSection
  },
  computed: {
    ...mapState('task/builder', [
      'task', 'jobs'
    ]),
    /*
    ...mapState('project', [
      'selectedProject'
    ])
     */
    ...mapState('c3s/project', {
      selectedProject: state => state.project
    })
  },
  methods: {
    ...mapMutations('task/builder', [
      'setTaskJob', 'setStep', 'setCurrentStep'
    ]),

    goBack () {
      // go back to job selection
      this.setCurrentStep('material')
      this.setStep({ step: 'job', value: false })
    }
  },
  filters: {
    capitalize: (value) => {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>

<style lang="scss">

</style>
