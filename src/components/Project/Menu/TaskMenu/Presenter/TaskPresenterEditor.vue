<template>
  <b-row>
    <b-col>
      <b-breadcrumb :items="items"></b-breadcrumb>
      <!--<b-link :to="{ name: 'project', params: { id: 'id' in this.selectedProject ? this.selectedProject.id : 0 } }">Go back to the project</b-link>-->

      <div class="mt-2 clearfix">
        <h2 class="float-left">Task presenter editor</h2>
        <b-btn ref="btn-update-presenter" variant="success" class="float-right" @click="updateTaskPresenter">Update task presenter</b-btn>
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
    this.getProject(this.id).then(() => {
      // loads the project template if it is already set or get the asked model template
      this.getTaskPresenter({ project: this.project, template: this.usingTemplate }).then(() => {
        this.code = this.taskPresenter
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
    id: {
      required: true
    }
  },
  methods: {
    ...mapActions('task', [
      'getTaskPresenter', 'saveTaskPresenter'
    ]),
    ...mapActions('project', [
      'getProject'
    ]),
    ...mapMutations('notification', [
      'showSuccess', 'showError'
    ]),

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
    }
  },
  computed: {
    ...mapState('task', [
      'taskPresenter', 'usingTemplate'
    ]),
    ...mapState('project', {
      project: state => state.selectedProject
    }),

    items () {
      return [
        {
          html: '<i class="fas fa-home"></i>&ensp;<span>Project</span>',
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
