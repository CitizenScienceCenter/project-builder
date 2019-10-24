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
    this.getActivity(this.id).then(() => {
      // if a template is given, the given template will be displayed in priority
      if (this.template) {
        this.code = this.template
      }
      // otherwise the activity task presenter template will be displayed
      else {
        // loads the activity template if it is already set or get the asked model template
        this.getTaskPresenter({ activity: this.activity, template: this.usingTemplate }).then(() => {
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
    // activity id
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
    ...mapActions('activity', [
      'getActivity'
    ]),
    ...mapMutations('notification', [
      'showSuccess',
      'showError'
    ]),

    /**
     * Update the activity task presenter with the currently edited
     */
    updateTaskPresenter () {
      this.saveTaskPresenter({
        activity: this.activity,
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
      this.$router.push({ name: 'activity.task.presenter', params: { id: this.activity.id, template: this.code } })
    }
  },
  computed: {
    ...mapState('task', [
      'taskPresenter',
      'usingTemplate'
    ]),
    ...mapState('activity', {
      activity: state => state.selectedActivity
    }),

    items () {
      return [
        {
          html: '<i class="fas fa-home"></i>&ensp;<span>Activity</span>',
          to: { name: 'activity', params: { id: 'id' in this.activity ? this.activity.id : 0 } }
        },
        {
          text: 'Task presenter',
          to: { name: 'activity.task.presenter.settings', params: { id: 'id' in this.activity ? this.activity.id : 0 } }
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
