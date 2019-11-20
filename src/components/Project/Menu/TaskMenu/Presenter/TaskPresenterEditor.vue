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
    this.getProject(this.pid).then(() => {
        this.getTaskPresenter({project: this.project, template: this.template}).then((temp) => {
          this.code = temp
        })
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
    // template code (optional)
    template: {
      type: String
    }
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
     * Update the project task presenter with the currently edited
     */
    updateTaskPresenter () {
      // TODO remove validation for fields when updating models
      const proj = {}
      proj['info'] = Object.assign({}, this.project.info)
      proj['name'] = this.project.name
      proj['description'] = this.project.description
      proj['platform'] = this.project.platform
      console.dir(proj)
      this.updateProject([this.project.id, proj]).then(response => {
        if (!response) {
          this.showError({
            title: 'Error',
            content: 'Error applying update'
          })
        }
      })
    },

    /**
     * Render the currently edited presenter without saving it
     */
    previewPresenter () {
      this.$router.push({ name: 'project.task.presenter', params: { pid: this.project.id, template: this.code } })
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
          html: '<i class="fas fa-home"></i>&ensp;<span>project</span>',
          to: { name: 'project', params: { pid: this.project.id } }
        },
        {
          text: 'Task presenter',
          to: { name: 'project.task.presenter.settings', params: { pid: this.project.id } }
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
