<template>
  <div>
    <b-breadcrumb :items="items"></b-breadcrumb>

    <b-row class="mt-4 mb-4">
      <b-col md="8" offset-md="2">
        <h2>Task priority</h2>

        <p>
          You can change the priority of one or more tasks, providing a list of task IDs separated by commas.
          The lowest priority is <b-badge>0.0</b-badge> and the highest priority is <b-badge>1.0</b-badge>.
        </p>

        <p>
          <b-badge variant="primary">Important:</b-badge> The priority value is only respected if the <b>default scheduler</b> is selected.
        </p>

        <b-form ref="form-task-priority-setting" @submit.prevent="onSubmit">
          <b-form-group
                  label="Task IDs"
                  description="Comma separated Task.IDs i.e.: 3,532,100">
            <b-input v-model="taskIds" placeholder="Comma separated Task.IDs i.e.: 3,532,100"></b-input>
          </b-form-group>

          <b-form-group
                  label="Priority"
                  description="Priority value between 0.0 and 1.0"
          >
            <b-form-input v-model="priority" type="number" step="0.01" min="0" max="1" placeholder="Priority value between 0.0 and 1.0"></b-form-input>
          </b-form-group>

          <b-button type="onSubmit" variant="primary">Change</b-button>
        </b-form>

      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'TaskPrioritySetting',
  created () {
    this.getActivity(this.id)
  },
  data: () => {
    return {
      taskIds: '',
      priority: ''
    }
  },
  props: {
    id: {
      required: true
    }
  },
  methods: {
    ...mapActions('activity', [
      'getActivity'
    ]),
    ...mapActions('task/settings', [
      'setTaskPriority'
    ]),

    onSubmit () {
      this.setTaskPriority({
        activity: this.activity,
        taskIds: this.taskIds,
        priority: this.priority
      }).then(success => {
        if (success) {
          this.$router.push({ name: 'activity.task.settings', params: { id: this.id } })
        }
      })
    }
  },
  computed: {
    ...mapState('activity', {
      activity: state => state.selectedActivity
    }),

    items () {
      return [
        {
          html: '<i class="fas fa-home"></i>&ensp;<span>Activity</span>',
          to: { name: 'activity', params: { id: this.id } }
        },
        {
          text: 'Task settings',
          to: { name: 'activity.task.settings', params: { id: this.id } }
        },
        {
          text: 'Priority',
          active: true
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
