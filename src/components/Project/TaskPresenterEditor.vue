<template>
  <b-row>
    <b-col>
      <b-breadcrumb :items="items"></b-breadcrumb>
      <div class="mt-4 clearfix">
        <h2 class="float-left">Task presenter editor</h2>
        <b-btn variant="success" class="float-right" @click="updateTaskPresenter">Update task presenter</b-btn>
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
    // selected project get from router
    this.getTaskPresenter({ project: this.selectedProject, template: this.usingTemplate }).then(() => {
      this.code = this.taskPresenter
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
  methods: {
    ...mapActions('task', [
      'getTaskPresenter', 'saveTaskPresenter'
    ]),
    ...mapMutations('notification', [
      'showSuccess', 'showError'
    ]),

    updateTaskPresenter () {
      this.saveTaskPresenter({
        project: this.selectedProject,
        template: this.code
      }).then(response => {
        if (response) {
          this.showSuccess({
            title: 'Success',
            content: 'Task presenter updated'
          })
        } else {
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
    ...mapState('project', [
      'selectedProject'
    ]),

    items () {
      return [
        {
          text: 'Tasks',
          to: { name: 'project', params: { id: this.selectedProject.id } }
        },
        {
          text: 'Presenter',
          to: { name: 'project.task.presenter.settings', params: { id: this.selectedProject.id } }
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

<style>
  .CodeMirror {
    height: auto !important;
  }
</style>
