<template>
  <div>
    <b-breadcrumb :items="items"></b-breadcrumb>

    <b-row class="mt-4 mb-4">
      <b-col md="8" offset-md="2">
        <h2>Delete all tasks and tasks runs</h2>

        <b-alert :show="true" variant="danger">
          <b>Danger Zone!</b>
          If you delete all the tasks and task runs they will be gone forever!
          You cannot undo this action!
        </b-alert>

        <b-list-group>
          <b-list-group-item><b>ID</b>: {{ activity.id }}</b-list-group-item>
          <b-list-group-item><b>Description</b>: {{ activity.description }}</b-list-group-item>
          <b-list-group-item><b>Creation Date</b>: {{ activityCreationDate }}</b-list-group-item>
          <b-list-group-item><b>Last Activity</b>: {{ infos.last_activity }}</b-list-group-item>
          <b-list-group-item><b>Overall progress</b>: {{ infos.overall_progress }}% completed</b-list-group-item>
          <b-list-group-item><b>Tasks</b> ({{ infos.n_tasks }})</b-list-group-item>
        </b-list-group>

        <h4 class="mt-4">Are you sure you want to delete all the activity tasks and associated task runs?</h4>
        <b-btn ref="btn-delete" class="mt-2 mt-md-0" @click="deleteTasks" variant="danger">Yes</b-btn>
        <b-btn ref="btn-go-back" class="mt-2 mt-md-0" @click="goBack">No, do not delete anything!</b-btn>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import moment from 'moment'

export default {
  name: 'DeleteTaskSetting',
  created () {
    this.getActivity(this.id).then(() => {
      this.getTaskDeletionOptions(this.activity)
    })
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
      'getTaskDeletionOptions',
      'deleteAllTasks'
    ]),

    deleteTasks () {
      this.deleteAllTasks(this.activity).then(success => {
        if (success) {
          this.goBack()
        }
      })
    },

    goBack () {
      this.$router.push({ name: 'activity.task.settings', params: { id: this.id } })
    }
  },
  computed: {
    ...mapState('activity', {
      activity: state => state.selectedActivity
    }),
    ...mapState('task/settings', {
      infos: state => state.taskDeletionOptions
    }),

    activityCreationDate () {
      return moment(this.activity.created).format('YYYY-MM-DD')
    },

    items () {
      return [
        {
          html: '<i class="fas fa-home"></i>&ensp;<span>Activity</span>',
          to: { name: 'activity', params: { id: 'id' in this.activity ? this.activity.id : 0 } }
        },
        {
          text: 'Task settings',
          to: { name: 'activity.task.settings', params: { id: 'id' in this.activity ? this.activity.id : 0 } }
        },
        {
          text: 'Delete',
          active: true
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
