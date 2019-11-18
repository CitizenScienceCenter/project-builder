<template>
  <b-row>
    <b-col>
      <b-breadcrumb :items="items"></b-breadcrumb>

      <div class="mt-2 clearfix">
        <h2 class="float-left">Task presenter editor</h2>

        <!-- Buttons -->
        <div class="float-right">
          <b-btn ref="btn-preview" variant="secondary" @click="previewPresenter">Preview task presenter</b-btn>
          <b-btn
            v-b-tooltip.hover title="This editor is reserved for expert users having 'coding' skills. Update the presenter only if you know what you are doing."
            ref="btn-update-presenter"
            variant="success"
            @click="updateTaskPresenter"
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
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

import 'codemirror/mode/vue/vue.js'
import { codemirror } from 'vue-codemirror'

export default {
  name: 'TaskPresenterEditor',
  components: {
    codemirror
  },
  created () {
    this.getproject(this.id).then(() => {
      // if a template is given, the given template will be displayed in priority
      if (this.template) {
        this.code = this.template
      }
      // otherwise the project task presenter template will be displayed
      else {
        // loads the project template if it is already set or get the asked model template
        this.getTaskPresenter({ project: this.project, template: this.usingTemplate }).then(() => {
          this.code = this.taskPresenter
        })
      }
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
    id: {
      required: true
    },
    // template code (optional)
    template: {
      type: String
    }
  },
  methods: {
    ...mapActions('task', [
      'getTaskPresenter',
      'saveTaskPresenter'
    ]),
    ...mapActions('project', [
      'getproject'
    ]),
    ...mapMutations('notification', [
      'showSuccess',
      'showError'
    ]),

    /**
     * Update the project task presenter with the currently edited
     */
    updateTaskPresenter () {
      this.saveTaskPresenter({
        project: this.project,
        template: this.code
      }).then(response => {
        if (!response) {
          this.showError({
            title: 'Error',
            content: 'Impossible to update the task presenter'
          })
        }
      })
    },

    /**
     * Render the currently edited presenter without saving it
     */
    previewPresenter () {
      this.$router.push({ name: 'project.task.presenter', params: { id: this.project.id, template: this.code } })
    }
  },
  computed: {
    ...mapState('task', [
      'taskPresenter',
      'usingTemplate'
    ]),
    ...mapState('project', {
      project: state => state.selectedproject
    }),

    items () {
      return [
        {
          html: '<i class="fas fa-home"></i>&ensp;<span>project</span>',
          to: { name: 'project', params: { id: 'id' in this.project ? this.project.id : 0 } }
        },
        {
          text: 'Task presenter',
          to: { name: 'project.task.presenter.settings', params: { id: 'id' in this.project ? this.project.id : 0 } }
        },
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
