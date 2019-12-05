<template>
  <div>

    <breadcrumb :items="items"></breadcrumb>

    <app-content-section>
      <div class="content-wrapper">
        <div class="row row-centered">
          <div class="col scroll-effect">

            <div class="mt-2 clearfix">
              <h2 class="float-left">Task presenter editor</h2>

              <!-- Buttons -->
              <div class="float-right">
                <b-btn ref="btn-preview" variant="secondary" @click="previewPresenter">Preview task presenter</b-btn>
                <b-btn
                        v-b-tooltip.hover title="This editor is reserved for expert users having 'coding' skills. Update the presenter only if you know what you are doing."
                        ref="btn-update-presenter"
                        variant="success"
                        @click="updatePresenter"
                >
                  Update task presenter
                </b-btn>
              </div>

            </div>

            <div class="mt-2 clearfix">
              <i class="float-left">This editor is reserved for expert users having coding skills. Edit and update at your own risk!</i>
            </div>

            <codemirror class="mt-3 float-none" ref="code-mirror" v-model="code" :options="cmOptions"></codemirror>

          </div>
        </div>
      </div>
    </app-content-section>

    <!--
    <br>
    <br>
    <br>
    <br>
    <b-row>
      <b-col>
        <b-breadcrumb :items="items"></b-breadcrumb>

        <div class="mt-2 clearfix">
          <h2 class="float-left">Task presenter editor</h2>


          <div class="float-right">
            <b-btn ref="btn-preview" variant="secondary" @click="previewPresenter">Preview task presenter</b-btn>
            <b-btn
              v-b-tooltip.hover title="This editor is reserved for expert users having 'coding' skills. Update the presenter only if you know what you are doing."
              ref="btn-update-presenter"
              variant="success"
              @click="updatePresenter"
            >
              Update task presenter
            </b-btn>
          </div>

        </div>

        <div class="mt-2 clearfix">
          <i class="float-left">This editor is reserved for expert users having coding skills. Edit and update at your own risk!</i>
        </div>

        <codemirror class="mt-3 float-none" ref="code-mirror" v-model="code" :options="cmOptions"></codemirror>
      </b-col>
    </b-row>

    -->
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

import api from '@/api/c3s'


import ContentSection from '@/components/shared/ContentSection.vue';
import Footer from '@/components/shared/Footer.vue';

import 'codemirror/mode/vue/vue.js'
import { codemirror } from 'vue-codemirror'
import Breadcrumb from "@/components/Breadcrumb";

export default {
  name: 'TaskPresenterEditor',
  components: {
    Breadcrumb,
    codemirror,
    'app-content-section': ContentSection,
    'app-footer': Footer,
  },
  created () {
    this.getProject(this.pid).then(() => {
      this.code = this.project.info.template
    })
  },
  data: () => {
    return {
      code: '',
      cmOptions: {
        tabSize: 4,
        mode: 'vue',
        theme: 'default',
        lineNumbers: true,
        viewportMargin: Infinity
      }
    }
  },
  props: {
    // project id
    pid: {
      required: false
    },
  },
  methods: {
    ...mapActions('task', [
      'getTaskPresenter',
    ]),
    ...mapActions('c3s/project', [
      'getProject',
      'updateProject'
    ]),
    ...mapMutations('notification', [
      'showSuccess',
      'showError'
    ]),
    /**
     * Render the currently edited presenter without saving it
     */
    previewPresenter () {
      this.$router.push({ name: 'project.task.presenter', params: { pid: this.project.id, template: this.code } })
    },
    updatePresenter () {
      api.updateTaskPresenter(this.project, this.code)
    }
  },
  computed: {
    ...mapState('task', [
      'taskPresenter',
      'usingTemplate'
    ]),
    ...mapState('c3s/project', {
      project: state => state.project
    }),

    items () {
      return [
        {
          //html: '<i class="fas fa-home"></i>&ensp;<span>Project</span>',
          text: 'Template',
          to: { name: 'project.task.presenter', params: { pid: this.project.id, template: this.code } }
        },
              /*
        {
          text: 'Task Presenter',
          to: { name: 'project.task.presenter.settings', params: { pid: this.project.id } }
        },
               */
        {
          text: 'Editor',
          active: false
        }
      ]
    }
  }
}
</script>

<style lang="scss">
  @import '~bootstrap/scss/bootstrap.scss';

  .CodeMirror {
    height: auto !important;
    border: 1px solid $input-disabled-bg;
    margin-bottom: 20px;
    @extend .shadow;
  }
</style>
