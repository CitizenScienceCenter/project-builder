<template>
  <div>
    <b-breadcrumb :items="items"></b-breadcrumb>

    <b-row class="mt-4 mb-4">
      <b-col md="8" offset-md="2">
        <h2>Task redundancy</h2>

        <b-form ref="form-task-redundancy-setting" @submit.prevent="onSubmit">
          <b-form-group
                  label="Redundancy"
                  description="The number of answers per task that you want for the activity"
          >
            <b-form-input type="number" min="1" max="1000" v-model="redundancy" placeholder="The number of answers per task that you want for the activity"></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Set</b-button>
          <b-btn @click="goBack">Cancel</b-btn>
        </b-form>

      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'TaskRedundancySetting',
  created () {
    this.getActivity(this.id).then(() => {
      this.getTaskRedundancyOptions(this.activity).then(() => {
        this.redundancy = this.currentRedundancy
      })
    })
  },
  data: () => {
    return {
      redundancy: 0
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
      'getTaskRedundancyOptions',
      'setTaskRedundancy'
    ]),

    onSubmit () {
      this.setTaskRedundancy({
        activity: this.activity,
        redundancy: this.redundancy
      }).then(success => {
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
      currentRedundancy: state => state.taskRedundancyOptions.form.n_answers
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
          text: 'Redundancy',
          active: true
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
