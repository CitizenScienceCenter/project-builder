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
    const getTaskPresenter = (project) => this.getTaskPresenter({ project: project, template: this.usingTemplate }).then(() => {
      this.code = this.taskPresenter
    })

    if (Object.keys(this.selectedProject).length === 0) {
      this.getProject(this.id).then(() => {
        getTaskPresenter(this.selectedProject)
      })
    } else {
      getTaskPresenter(this.selectedProject)
    }
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
          text: this.selectedProject.name + ' project',
          to: { name: 'project', params: { id: 'id' in this.selectedProject ? this.selectedProject.id : 0 } }
        },
        {
          text: 'Task presenter',
          to: { name: 'project.task.presenter.settings', params: { id: 'id' in this.selectedProject ? this.selectedProject.id : 0 } }
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
